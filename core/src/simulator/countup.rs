use super::Calculator;

#[derive(Clone)]
#[allow(non_snake_case)]
pub struct CountUp {
    count: i32
}

#[allow(non_snake_case)]
impl CountUp {
    pub fn new(start: i32) -> CountUp {
        CountUp { count: start }
    }
}

impl Calculator for CountUp {
    fn get_step_size(&self) -> i32{
        3
    }

    fn update(&mut self) {
        self.count += 1;
    }

    fn write(&self, mem: &mut [f64]) {
        mem[0] = (self.count+0) as f64;
        mem[1] = (self.count+1) as f64;
        mem[2] = (self.count+2) as f64;
    }
}
