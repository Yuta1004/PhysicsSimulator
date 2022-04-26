import React from "react";

import Viewer2D from "./components/2d/2dviewer";

/*
import init from "@kepler-core/kepler-core";
import { SimulatorFactory, InitOutput } from "@kepler-core/kepler-core";
import SimulatorAccessor from "./../memory";

const _Kepler = () => {
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
*/

class Kepler extends React.Component {
    construcor() { }

    render() {
        return (
            <Viewer2D />
        );
    }
}

export default Kepler;
