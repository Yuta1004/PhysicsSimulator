extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello {}!!", name));
}

pub struct MemManager {
    /* Memory */
    mem: Vec<f64>,      // mem_size = blocks_num * steps_num * step_size * 8 (byte)
    blocks_num: i32,
    steps_num: i32,
    step_size: i32,

    /* Write Support */
    block_l: i32,
    block_u: i32,
    boundary_idx: usize,

    /* Value Generator */
    generator: Box<dyn ValueGenerator>,
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
            boundary_idx: 0,

            generator
        };
        for block in 0..blocks_num {
            let _ = mem_manager.update(block);
        }

        mem_manager
    }

    pub fn as_mem_ptr(&self) -> *const f64 {
        self.mem.as_ptr()
    }

    pub fn get_mem_info(&self) -> (i32, i32, i32) {
        (self.blocks_num, self.steps_num, self.step_size)
    }

    pub fn get_block_info(&self) -> (i32, i32) {
        (self.block_l, self.block_u)
    }

    pub fn update(&mut self, block: i32) -> Result<(), BlockLoadError> {
        if block < 0 {
            return Err(BlockLoadError::IllegalBlockId);
        }
        if self.block_l <= block && block <= self.block_u {
            return Err(BlockLoadError::AlreadyLoadedBlockId)
        }
        if block+1 != self.block_l && block-1 != self.block_u {
            return Err(BlockLoadError::IllegalBlockId)
        }

        if block-1 == self.block_u {
            self.block_l += 1;
            self.block_u = block;
            self.update_boundary_idx(self.steps_num*self.step_size);
            self.generator.update_forward(&mut self.mem[self.boundary_idx..], self.steps_num);
        }
        if block+1 == self.block_l {
            self.block_l = block;
            self.block_u -= 1;
            self.update_boundary_idx(-self.steps_num*self.step_size);
            self.generator.update_backward(&mut self.mem[self.boundary_idx..], self.steps_num);
        }

        Ok(())
    }

    fn update_boundary_idx(&mut self, diff: i32) {
        let mut boundary_idx_i32 = self.boundary_idx as i32 + diff;
        if boundary_idx_i32 < 0 {
            boundary_idx_i32 += self.mem.len() as i32;
        }
        boundary_idx_i32 %= self.mem.len() as i32;
        self.boundary_idx = boundary_idx_i32 as usize;
    }
}

#[wasm_bindgen]
#[derive(PartialEq, Debug)]
pub enum BlockLoadError {
    IllegalBlockId,         // 不正なブロックが指定された
    AlreadyLoadedBlockId,   // 計算済みブロックが指定された
}

trait ValueGenerator {
    fn get_step_size(&self) -> i32;
    fn update_forward(&self, mem: &mut [f64], steps: i32);
    fn update_backward(&self, mem: &mut [f64], steps: i32);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mem_manager() {
        let value_generator = Box::new(TempValueGenerator{});
        let mut mem_manager = MemManager::new(6, 10, value_generator);

        // Test 1
        assert_eq!(mem_manager.boundary_idx, 0*4);
        assert_eq!(mem_manager.get_block_info(), (0, 5));

        // Test 2
        assert!(mem_manager.update(6).is_ok());
        assert_eq!(mem_manager.boundary_idx, 10*4);
        assert_eq!(mem_manager.get_block_info(), (1, 6));
        assert!(mem_manager.update(7).is_ok());
        assert_eq!(mem_manager.boundary_idx, 20*4);
        assert_eq!(mem_manager.get_block_info(), (2, 7));

        // Test 3
        assert!(mem_manager.update(1).is_ok());
        assert_eq!(mem_manager.boundary_idx, 10*4);
        assert_eq!(mem_manager.get_block_info(), (1, 6));
        assert!(mem_manager.update(0).is_ok());
        assert_eq!(mem_manager.boundary_idx, 0*4);
        assert_eq!(mem_manager.get_block_info(), (0, 5));

        // Test 4
        match mem_manager.update(7) {
            Ok(_) => assert!(false),
            Err(err) => assert_eq!(err, BlockLoadError::IllegalBlockId)
        }

        // Test 5
        match mem_manager.update(-1) {
            Ok(_) => assert!(false),
            Err(err) => assert_eq!(err, BlockLoadError::IllegalBlockId)
        }

        // Test 6
        match mem_manager.update(4) {
            Ok(_) => assert!(false),
            Err(err) => assert_eq!(err, BlockLoadError::AlreadyLoadedBlockId)
        }
    }

    struct TempValueGenerator;

    impl ValueGenerator for TempValueGenerator {
        fn get_step_size(&self) -> i32 {
            4
        }

        fn update_forward(&self, mem: &mut [f64], steps: i32) {
            for step_idx in 0..steps {
                for elem_idx in 0..4 {
                    mem[(step_idx*4+elem_idx) as usize] = step_idx as f64;
                }
            }
        }

        fn update_backward(&self, mem: &mut [f64], steps: i32) {
            for step_idx in 0..steps {
                for elem_idx in 0..4 {
                    mem[(step_idx*4+elem_idx) as usize] = step_idx as f64;
                }
            }
        } 
    }
}
