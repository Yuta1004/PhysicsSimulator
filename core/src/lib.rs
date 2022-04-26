pub mod memory;
pub mod simulator {
    pub mod planet;
}

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use memory::MemManager;
use simulator::planet::PlanetSimulator;

#[wasm_bindgen]
struct SimulatorFactory;

#[wasm_bindgen]
impl SimulatorFactory {
    pub fn new_planet_simulator(blocks_num: i32, steps_num:i32, x: f64, y: f64, v: f64, M: f64, dt: f64) -> MemManager {
        let planet = Box::new(PlanetSimulator::new(x, y, v, M, dt));
        MemManager::new(blocks_num, steps_num, planet)
    }
}
