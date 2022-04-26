pub mod countup;
pub mod planet;

use std::cmp::max;
use std::collections::HashMap;

use crate::memory::ValueGenerator;

pub trait Calculator {
    fn get_step_size(&self) -> i32;
    fn update(&mut self);
    fn write(&self, mem: &mut [f64]);
}

pub struct Simulator<T: Calculator+Clone> {
    checkpoints: HashMap<i32, Box<T>>,
    step_size: i32
}

impl<T: Calculator+Clone> Simulator<T> {
    pub fn from(initial_checkpoint: T) -> Simulator<T> {
        let step_size = initial_checkpoint.get_step_size();
        let mut checkpoints = HashMap::new();
        checkpoints.insert(0, Box::new(initial_checkpoint));

        Simulator::<T> { checkpoints, step_size }
    }
}

impl<T: Calculator+Clone> ValueGenerator for Simulator<T> {
    fn get_step_size(&self) -> i32 {
        self.step_size
    }

    fn update(&mut self, mem: &mut [f64], base_step: i32, steps: i32) {
        let base_step = max(base_step-1, 0);
        let mut checkpoint = match self.checkpoints.contains_key(&base_step) {
            true => self.checkpoints.get(&base_step).unwrap().clone(),
            false => {
                let latest_step = *self.checkpoints.keys().filter(|x| x < &&base_step).max().unwrap();
                let mut checkpoint = self.checkpoints.get(&latest_step).unwrap().clone();
                for _ in latest_step..base_step+1 {
                    checkpoint.update();
                }
                checkpoint
            }
        };
        for idx in 0..steps {
            let idx_l = (idx*self.step_size) as usize;
            let idx_u = idx_l+self.step_size as usize;
            checkpoint.write(&mut mem[idx_l..idx_u]);
            checkpoint.update();
        }
        if !self.checkpoints.contains_key(&(base_step+steps-1)) {
            self.checkpoints.insert(base_step+steps, checkpoint);
        }
    }
}
