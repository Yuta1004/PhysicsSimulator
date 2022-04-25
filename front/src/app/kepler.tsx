import init from "@kepler-core/kepler-core";
import { SimulatorFactory, InitOutput } from "@kepler-core/kepler-core";

import SimulatorAccessor from "./memory";

const Kepler = () => {
    init().then(async (instance: InitOutput) => {
        const simulator = new SimulatorAccessor(
            SimulatorFactory.new_countup_simulator(10, 100),
            instance.memory,
            3,
            () => { console.log("Now Loading..."); },
            () => { console.log("Loading Completed!"); }
        );
        for(var idx = 0; idx < 6000; ++ idx) {
            console.log(simulator.getValue());
            simulator.updateCursor(1);
        }
    });

    return (
        <div>
        <p>Hello React App!</p>
        </div>
    );
}

export default Kepler;
