use super::Calculator;

#[derive(Clone)]
#[allow(non_snake_case)]
pub struct Comet {
    x: f64,
    y: f64,
    vx: f64,
    vy: f64,

    M: f64,
    dt: f64
}

#[allow(non_snake_case)]
impl Comet {
    pub fn new(x: f64, y: f64, v: f64, M: f64, dt: f64) -> Comet {
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        let vy = (1.0/radius).sqrt() * 0.5 * v;

        Comet { x, y, vx: 0.0, vy, M, dt }
    }
}

impl Calculator for Comet {
    fn get_step_size(&self) -> i32{
        4
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
