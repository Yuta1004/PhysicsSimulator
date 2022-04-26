extern crate wasm_bindgen;

use std::collections::HashMap;

use wasm_bindgen::prelude::*;

use crate::memory::ValueGenerator;

#[wasm_bindgen]
pub struct PlanetSimulator {
    checkpoint: HashMap<i32, StepData>
}

impl PlanetSimulator {
    pub fn new(x: f64, y: f64, v: f64, M: f64, dt: f64) -> PlanetSimulator {
        let mut checkpoint = HashMap::new();
        checkpoint.insert(0, StepData::new(x, y, v, M, dt));
        PlanetSimulator { checkpoint }
    }
}

impl ValueGenerator for PlanetSimulator {
    fn get_step_size(&self) -> i32 {
        4
    }

    fn update(&mut self, mem: &mut [f64], base_step: i32, steps: i32) {
        for idx in 0..steps {
            mem[idx as usize] = (base_step+idx) as f64;
        }
    }
}

struct StepData {
    x: f64,
    y: f64,
    vx: f64,
    vy: f64,

    M: f64,
    dt: f64
}

impl StepData {
    fn new(x: f64, y: f64, v: f64, M: f64, dt: f64) -> StepData {
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        let vy = (1.0/radius).sqrt() * v;
        StepData { x, y, vx: 0.0, vy, M, dt }
    }

    fn update(&mut self) {
        let radius = (self.x.powi(2)+self.y.powi(2)).sqrt();
        self.vx -= (self.dt*self.M*self.x) / radius.powi(3);
        self.vy -= (self.dt*self.M*self.y) / radius.powi(3);
        self.x += self.dt*self.vx;
        self.y += self.dt*self.vy;
    }

    fn write(&self, mem: &mut [f64]) {
        mem[0] = self.x;
        mem[1] = self.y;
        mem[2] = self.vx;
        mem[3] = self.vy;
    }
}
