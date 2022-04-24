extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use crate::memory::memory::ValueGenerator;

#[wasm_bindgen]
pub struct CountUpSimulator;

impl CountUpSimulator {
    pub fn new() -> CountUpSimulator {
        CountUpSimulator {}
    }
}

impl ValueGenerator for CountUpSimulator {
    fn get_step_size(&self) -> i32 {
        1
    }

    fn update(&self, mem: &mut [f64], base_step: i32, steps: i32) {
        for idx in 0..steps {
            mem[idx as usize] = (base_step+idx) as f64;
        }
    }
}
