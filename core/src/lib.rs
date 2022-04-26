pub mod memory;
pub mod simulator {
    pub mod countup;
}

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use memory::MemManager;
use simulator::countup::CountUpSimulator;

#[wasm_bindgen]
struct SimulatorFactory;

#[wasm_bindgen]
impl SimulatorFactory {
    pub fn new_countup_simulator(blocks_num: i32, steps_num: i32) -> MemManager {
        let countup_simulator = Box::new(CountUpSimulator::new());
        MemManager::new(blocks_num, steps_num, countup_simulator)
    }
}
