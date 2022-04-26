extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use crate::memory::ValueGenerator;

#[wasm_bindgen]
pub struct PlanetSimulator;

impl PlanetSimulator {
    pub fn new() -> PlanetSimulator {
        PlanetSimulator {}
    }
}

impl ValueGenerator for PlanetSimulator {
    fn get_step_size(&self) -> i32 {
        1
    }

    fn update(&self, mem: &mut [f64], base_step: i32, steps: i32) {
        for idx in 0..steps {
            mem[idx as usize] = (base_step+idx) as f64;
        }
    }
}
