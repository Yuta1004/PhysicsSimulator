import React from "react";
import { Html } from "react-konva-utils";

import SimulatorAccessor from "../../../../../memory";
import init, { InitOutput, SimulatorFactory } from "@kepler-core/kepler-core";

export default class Controller extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            intervalID: -1,
        };

        this.resumeOrStopSimulate = this.resumeOrStopSimulate.bind(this);
        this.addSimulator = this.addSimulator.bind(this);
    }

    render() {
        return (
            <Html>
                <button onClick={this.props.prevCallback}>PREV</button>
                <button onClick={this.resumeOrStopSimulate}>RESUME/STOP</button>
                <button onClick={this.props.nextCallback}>NEXT</button>
                <button onClick={this.addSimulator}>ADD</button>
            </Html>
        );
    }

    private resumeOrStopSimulate() {
        if (this.state.intervalID === -1) {
            const intervalID = setInterval(() => {
                this.props.nextCallback();
            }, 500);
            this.setState({ intervalID: intervalID });
        } else {
            clearInterval(this.state.intervalID);
            this.setState({ intervalID: -1 });
        }
    }

    private addSimulator() {
        init().then((instance: InitOutput) => {
            const simulator = new SimulatorAccessor(
                SimulatorFactory.new_planet(10, 500, 0.5, 0.0, 1.2, 1.0, 0.01),
                instance.memory,
                3,
                () => { console.log("Now Loading..."); },
                () => { console.log("Loading Completed!"); }
            );
            this.props.addSimulatorCallback(simulator, "TEST", "#ff0000");
        });
    }
}
