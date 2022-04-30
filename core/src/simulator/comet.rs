use super::Calculator;

#[derive(Clone)]
pub struct Comet {
    x: f64,
    y: f64,
    vx: f64,
    vy: f64,

    m: f64,
    dt: f64
}

impl Comet {
    pub fn new(x: f64, y: f64, vx: f64, vy: f64, m: f64, dt: f64) -> Comet {
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        let vx = (1.0/radius).sqrt() * 0.5 * vx;
        let vy = (1.0/radius).sqrt() * 0.5 * vy;
        let m = 1.0/m;

        Comet { x, y, vx, vy, m, dt }
    }
}

impl Calculator for Comet {
    fn get_step_size(&self) -> i32{
        4
    }

    fn update(&mut self) {
        let radius = (self.x.powi(2)+self.y.powi(2)).sqrt();
        self.vx -= (self.dt*self.m*self.x) / radius.powi(3);
        self.vy -= (self.dt*self.m*self.y) / radius.powi(3);
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
