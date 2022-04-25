import init from "@kepler-core/kepler-core";
import { SimulatorFactory, InitOutput } from "@kepler-core/kepler-core";

const Kepler = () => {
    init().then((instance: InitOutput) => {
      const countup_simulator = SimulatorFactory.new_countup_simulator(6, 10);
      const shared_memory = new Float64Array(instance.memory.buffer, countup_simulator.as_mem_ptr(), 60);
      for(var idx = 0; idx < 60; ++ idx) {
        console.log(shared_memory[idx]);
      }
    });

    return (
        <div>
        <p>Hello React App!</p>
        </div>
    );
}

export default Kepler;
