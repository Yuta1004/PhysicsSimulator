use super::Calculator;

#[derive(Clone)]
pub struct Satelite {
    x: f64,
    y: f64,
    vx: f64,
    vy: f64,

    m: f64,
    dt: f64
}

impl Satelite {
    pub fn new(x: f64, y: f64, vx: f64, vy: f64, m: f64, dt: f64) -> Satelite {
        let m = 1.0/m;
        Satelite { x, y, vx, vy, m, dt }
    }
}

impl Calculator for Satelite {
    fn get_step_size(&self) -> i32{
        4
    }

    fn update(&mut self) {
        let (mut x, mut y) = (self.x, self.y);
        let mut kx: [f64; 4] = [0.0, 0.0, 0.0, 0.0];
        let mut ky: [f64; 4] = [0.0, 0.0, 0.0, 0.0];
        let mut hx: [f64; 4] = [0.0, 0.0, 0.0, 0.0];
        let mut hy: [f64; 4] = [0.0, 0.0, 0.0, 0.0];
        let fnf = |r: f64| -> f64 { -self.m / r.powi(3) };

        // ルンゲ・クッタ法 (1)
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        kx[0] = fnf(radius)*x*self.dt;
        ky[0] = fnf(radius)*y*self.dt;
        hx[0] = self.vx*self.dt;
        hy[0] = self.vy*self.dt;
        x = self.x + hx[0]/2.0;
        y = self.y + hy[0]/2.0;

        // ルンゲ・クッタ法 (2)
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        kx[1] = fnf(radius)*x*self.dt;
        ky[1] = fnf(radius)*y*self.dt;
        hx[1] = (self.vx+kx[0]/2.0)*self.dt;
        hy[1] = (self.vy+ky[0]/2.0)*self.dt;
        x = self.x + hx[1]/2.0;
        y = self.y + hy[1]/2.0;

        // ルンゲ・クッタ法 (3)
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        kx[2] = fnf(radius)*x*self.dt;
        ky[2] = fnf(radius)*y*self.dt;
        hx[2] = (self.vx+kx[1]/2.0)*self.dt;
        hy[2] = (self.vy+ky[1]/2.0)*self.dt;
        x = self.x + hx[2]/2.0;
        y = self.y + hy[2]/2.0;

        // ルンゲ・クッタ法 (4)
        let radius = (x.powi(2)+y.powi(2)).sqrt();
        kx[3] = fnf(radius)*x*self.dt;
        ky[3] = fnf(radius)*y*self.dt;
        hx[3] = (self.vx+kx[2])*self.dt;
        hy[3] = (self.vy+ky[2])*self.dt;

        self.x += (hx[0] + 2.0*hx[1] + 2.0*hx[2] + hx[3]) / 6.0;
        self.y += (hy[0] + 2.0*hy[1] + 2.0*hy[2] + hy[3]) / 6.0;
        self.vx += (kx[0] + 2.0*kx[1] + 2.0*kx[2] + kx[3]) / 6.0;
        self.vy += (ky[0] + 2.0*ky[1] + 2.0*ky[2] + ky[3]) / 6.0;
    }

    fn write(&self, mem: &mut [f64]) {
        mem[0] = self.x;
        mem[1] = self.y;
        mem[2] = self.vx;
        mem[3] = self.vy;
    }
}
