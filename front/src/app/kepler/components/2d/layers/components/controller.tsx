import React from "react";
import { Group } from "react-konva";
import { Html } from "react-konva-utils";
import { IoPlaySharp, IoPlayForwardSharp, IoPlayBackSharp, IoStopSharp } from "react-icons/io5";

import SimulatorAccessor from "../../../../../memory";
import init, { InitOutput, SimulatorFactory } from "@kepler-core/kepler-core";

export default class Controller extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            intervalID: -1,
            playIcon: <IoPlaySharp size={20}/>,
            dt: 1.0,
            speed: 1.0,
            panelVisible: "visible"
        };

        this.resumeOrStopSimulate = this.resumeOrStopSimulate.bind(this);
        this.addSimulator = this.addSimulator.bind(this);
    }

    render() {
        return (
            <Group>
                <Html
                    transform={false}
                    divProps={{ style: {
                        background: "#ccc7",
                        border: "1px solid black",
                        ["border-radius"]: "15px",
                        width: "fit-content",
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        transform: "translateX(-50%) translateY(-50%)",
                        bottom: "-5%",
                        padding: "15px",
                        visibility: this.state.panelVisible
                }}}>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "0 auto",
                    }}>
                        <button style={{ margin: "0 10px", padding: "10px 20px" }} onClick={this.props.prevCallback}>
                            <IoPlayBackSharp size={20}/>
                        </button>
                        <button style={{ margin: "0 10px", padding: "10px 20px" }} onClick={this.resumeOrStopSimulate}>
                            {this.state.playIcon}
                        </button>
                        <button style={{ margin: "0 10px", padding: "10px 20px" }} onClick={this.props.nextCallback}>
                            <IoPlayForwardSharp size={20}/>
                        </button>
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto"
                    }}>
                        dt({this.state.dt})
                        <input
                            style={{ width: "50%", position: "absolute", left: "40%" }}
                            type="range"
                            min={0.01}
                            max={2.0}
                            step={0.01}
                            onChange={(e: any) => { this.setState({ dt: e.target.value }); }}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto"
                    }}>
                        speed({this.state.speed})
                        <input
                            style={{ width: "50%", position: "absolute", left: "40%" }}
                            type="range"
                            min={0.1}
                            max={2.0}
                            step={0.1}
                            onChange={(e:any) => {
                                this.setState({ speed: e.target.value });
                                if (this.state.intervalID !== -1) {
                                    this.resumeOrStopSimulate();
                                    this.resumeOrStopSimulate();
                                }
                            }}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto"
                    }}>
                        <button style={{ width: "100%", margin: "0 10px" }} onClick={this.addSimulator}>ADD</button>
                        <button
                            style={{ width: "100%", margin: "0 10px" }}
                            onClick={() => {
                                this.props.resetCallback();
                                if (this.state.intervalID !== -1) {
                                    this.resumeOrStopSimulate();
                                }
                            }}
                        >
                            リセット
                        </button>
                    </div>
                </Html>
                <Html
                    transform={false}
                    divProps={{ style: {
                        width: "fit-content",
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        transform: "translateX(-50%) translateY(-50%)",
                        bottom: "-3%",
                        padding: "15px"
                }}}>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "0auto"
                    }}>
                        <input
                            type="checkbox"
                            checked={this.state.panelVisible === "visible"}
                            onChange={(e: any) => {
                                this.setState({
                                    panelVisible: e.target.checked ? "visible" : "hidden"  
                                });
                            }}
                        />
                        コントロールパネルを表示する
                    </div>
                </Html>
            </Group>
        );
    }

    private resumeOrStopSimulate() {
        if (this.state.intervalID === -1) {
            const intervalID = setInterval(() => {
                this.props.nextCallback();
            }, 100/this.state.speed);
            this.setState({
                intervalID: intervalID,
                playIcon: <IoStopSharp size={20}/>
            });
        } else {
            clearInterval(this.state.intervalID);
            this.setState({
                intervalID: -1,
                playIcon: <IoPlaySharp size={20}/>
            });
        }
    }

    private addSimulator() {
        init().then((instance: InitOutput) => {
            const simulator = new SimulatorAccessor(
                SimulatorFactory.new_planet(10, 500, 0.5, 0.0, 1.2, 1.0, this.state.dt),
                instance.memory,
                3,
                () => { console.log("Now Loading..."); },
                () => { console.log("Loading Completed!"); }
            );
            this.props.addSimulatorCallback(simulator, "TEST", "#ff0000");
        });
    }
}
