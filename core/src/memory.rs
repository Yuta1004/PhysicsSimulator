extern crate wasm_bindgen;

pub mod memory {
    use std::cmp;

    use wasm_bindgen::prelude::*;

    /* ##### NOT WebAssembly Publish Target ##### */

    pub trait ValueGenerator {
        fn get_step_size(&self) -> i32;
        fn update(&self, mem: &mut [f64], base_step: i32, steps: i32);
    }

    impl MemManager {
        pub fn new(blocks_num:i32, steps_num: i32, generator: Box<dyn ValueGenerator>) -> MemManager {
            let step_size = generator.get_step_size();
            let mut mem_manager = MemManager {
                mem: (0..(blocks_num*steps_num*step_size)).map(|_| {0.0}).collect(),
                blocks_num,
                steps_num,
                step_size,

                block_l: -blocks_num,
                block_u: -1,
                boundary_idx: -steps_num*step_size,

                generator
            };
            mem_manager.load_next(blocks_num);

            mem_manager
        }
    }

    /* ########################################## */

    /* ##### WebAssembly Publish Target ##### */

    #[wasm_bindgen]
    #[derive(PartialEq, Debug)]
    pub enum BlockLoadMessage {
        Success,                // 読み込み成功
        IllegalBlockId,         // 不正なブロックが指定された
        AlreadyLoadedBlockId,   // 計算済みブロックが指定された
    }

    #[wasm_bindgen]
    pub struct MemManager {
        /* Memory */
        mem: Vec<f64>,      // mem_size = blocks_num * steps_num * step_size * 8 (byte)
        blocks_num: i32,
        steps_num: i32,
        step_size: i32,

        /* Write Support */
        block_l: i32,
        block_u: i32,
        boundary_idx: i32,

        /* Value Generator */
        generator: Box<dyn ValueGenerator>,
    }

    #[wasm_bindgen]
    impl MemManager {
        pub fn as_mem_ptr(&self) -> *const f64 {
            self.mem.as_ptr()
        }

        pub fn get_mem_capacity(&self) -> usize {
            self.mem.len()
        }

        pub fn get_blocks_2_boundary_bef(&self, v_idx: i32) -> i32 {
            let a_idx = self.calc_actual_idx(v_idx);
            println!("{}", a_idx);
            let capacity = self.mem.len() as i32;
            if self.boundary_idx <= a_idx {
                (a_idx-self.boundary_idx) / self.steps_num / self.step_size
            } else {
                (a_idx + capacity-self.boundary_idx) / self.steps_num / self.step_size
            }
        }

        pub fn get_blocks_2_boundary_af(&self, v_idx: i32) -> i32 {
            self.blocks_num-self.get_blocks_2_boundary_bef(v_idx)-1
        }

        pub fn load_prev(&mut self, load_blocks_num: i32) {
            let mut load_blocks_num = load_blocks_num;
            if self.block_l < load_blocks_num {
                load_blocks_num = self.block_l;
            }
            for _ in 0..load_blocks_num {
                match self.load(self.block_l-1) {
                    BlockLoadMessage::Success => {},
                    msg => panic!("{:?}", msg)
                }
            }
        }

        pub fn load_next(&mut self, load_blocks_num: i32) {
            for _ in 0..load_blocks_num {
                match self.load(self.block_u+1) {
                    BlockLoadMessage::Success => {},
                    msg => panic!("{:?}", msg)
                }
            }
        }
        
        fn load(&mut self, block: i32) -> BlockLoadMessage {
            if block < 0 {
                return BlockLoadMessage::IllegalBlockId;
            }
            if self.block_l <= block && block <= self.block_u {
                return BlockLoadMessage::AlreadyLoadedBlockId;
            }
            if block+1 != self.block_l && block-1 != self.block_u {
                return BlockLoadMessage::IllegalBlockId
            }

            if block-1 == self.block_u {
                self.block_l += 1;
                self.block_u = block;
                self.update_boundary_idx(self.steps_num*self.step_size);
                self.generator.update(&mut self.mem[self.boundary_idx as usize..], block*self.steps_num*self.step_size, self.steps_num);
            }
            if block+1 == self.block_l {
                self.block_l = block;
                self.block_u -= 1;
                self.update_boundary_idx(-self.steps_num*self.step_size);
                self.generator.update(&mut self.mem[self.boundary_idx as usize..], block*self.steps_num*self.step_size, self.steps_num);
            }

            BlockLoadMessage::Success
        }

        fn update_boundary_idx(&mut self, diff: i32) {
            self.boundary_idx += diff;
            if self.boundary_idx < 0 {
                self.boundary_idx += self.mem.len() as i32;
            }
            self.boundary_idx %= self.mem.len() as i32;
        }

        fn calc_actual_idx(&self, v_idx: i32) -> i32 {
            if self.boundary_idx <= v_idx {
                v_idx + self.boundary_idx - self.block_l*self.steps_num*self.step_size
            } else {
                v_idx + self.boundary_idx - (self.block_u+1)*self.steps_num*self.step_size
            }
        }
    }

    /* ###################################### */

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_mem_manager() {
            let value_generator = Box::new(TempValueGenerator{});
            let mut mem_manager = MemManager::new(6, 10, value_generator);

            // Test 1
            assert_eq!(mem_manager.boundary_idx, 0*4);
            assert_eq!((mem_manager.block_l, mem_manager.block_u), (0, 5));
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4-1), 0);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4+0), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4+1), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4-1), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+0), 2);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+1), 2);

            // Test 2
            mem_manager.load_next(2);
            assert_eq!(mem_manager.boundary_idx, 20*4);
            assert_eq!((mem_manager.block_l, mem_manager.block_u), (2, 7));
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(70*4-1), 4);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(70*4+0), 5);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(70*4+1), 5);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+0), 0);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+1), 0);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(30*4-1), 0);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(30*4+0), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(30*4+1), 1);

            // Test 3
            mem_manager.load_prev(2);
            assert_eq!(mem_manager.boundary_idx, 0*4);
            assert_eq!((mem_manager.block_l, mem_manager.block_u), (0, 5));
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4-1), 0);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4+0), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(10*4+1), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4-1), 1);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+0), 2);
            assert_eq!(mem_manager.get_blocks_2_boundary_bef(20*4+1), 2);

            // Test 4
            match mem_manager.load(7) {
                BlockLoadMessage::IllegalBlockId => assert!(true),
                _ => assert!(false)
            }

            // Test 5
            match mem_manager.load(-1) {
                BlockLoadMessage::IllegalBlockId => assert!(true),
                _ => assert!(false)
            }

            // Test 6
            match mem_manager.load(4) {
                BlockLoadMessage::AlreadyLoadedBlockId => assert!(true),
                _ => assert!(false)
            }
        }

        struct TempValueGenerator;

        impl ValueGenerator for TempValueGenerator {
            fn get_step_size(&self) -> i32 {
                4
            }

            fn update(&self, mem: &mut [f64], base_step: i32, steps: i32) {
                for step_idx in 0..steps {
                    for elem_idx in 0..4 {
                        mem[(step_idx*4+elem_idx) as usize] = (base_step+step_idx) as f64;
                    }
                }
            }
        }
    }
}
