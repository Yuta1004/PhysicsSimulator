pub mod memory;
pub mod simulator;

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use memory::MemManager;
use simulator::Simulator;
use simulator::countup::CountUp;
use simulator::comet::Comet;
use simulator::planet::Planet;
use simulator::satelite::Satelite;

#[wasm_bindgen]
struct SimulatorFactory;

#[wasm_bindgen]
#[allow(non_snake_case, dead_code)]
impl SimulatorFactory {
    pub fn new_countup(blocks_num: i32, steps_num: i32, start: i32) -> MemManager {
        MemManager::new(
            blocks_num,
            steps_num,
            Box::new(Simulator::from(CountUp::new(start)))
        )
    }

    pub fn new_comet(blocks_num: i32, steps_num:i32, x: f64, y: f64, vx: f64, vy: f64, m: f64, dt: f64) -> MemManager {
        MemManager::new(
            blocks_num,
            steps_num,
            Box::new(Simulator::from(Comet::new(x, y, vx, vy, m, dt)))
        )
    }

    pub fn new_planet(blocks_num: i32, steps_num:i32, x: f64, y: f64, vx: f64, vy: f64, m: f64, dt: f64) -> MemManager {
        MemManager::new(
            blocks_num,
            steps_num,
            Box::new(Simulator::from(Planet::new(x, y, vx, vy, m, dt)))
        )
    }

    pub fn new_satelite(blocks_num: i32, steps_num:i32, x: f64, y: f64, vx: f64, vy: f64, m: f64, dt: f64) -> MemManager {
        MemManager::new(
            blocks_num,
            steps_num,
            Box::new(Simulator::from(Satelite::new(x, y, vx, vy, m, dt)))
        )
    }
}
