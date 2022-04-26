pub mod memory;
pub mod simulator {
    pub mod planet;
}

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use memory::MemManager;

#[wasm_bindgen]
struct SimulatorFactory;

#[wasm_bindgen]
impl SimulatorFactory { }
