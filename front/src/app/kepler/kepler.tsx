import init from "@kepler-core/kepler-core";
import { SimulatorFactory, InitOutput } from "@kepler-core/kepler-core";

import SimulatorAccessor from "./../memory";

const Kepler = () => {
    init().then(async (instance: InitOutput) => {
        const simulator = new SimulatorAccessor(
            SimulatorFactory.new_planet(10, 500, 0.5, 0.0, 1.0, 1.0, 0.01),
            instance.memory,
            3,
            () => { console.log("Now Loading..."); },
            () => { console.log("Loading Completed!"); }
        );
        for(var idx = 0; idx < 6000; ++ idx) {
            let value = simulator.getValue();
            console.log(idx + ": " + value[0] + ", " + value[1]);
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
