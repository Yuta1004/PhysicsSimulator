import React from "react";
import { Group, Label } from "react-konva";
import { Html } from "react-konva-utils";
import { IoPlaySharp, IoPlayForwardSharp, IoPlayBackSharp, IoStopSharp } from "react-icons/io5";

import SimulatorAccessor from "../../../../../memory";
import init, { InitOutput, SimulatorFactory } from "@kepler-core/kepler-core";
import ObjectAdder from "./object_adder";

export default class Controller extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            intervalID: -1,
            playIcon: <IoPlaySharp size={20}/>,
            dt: 0.2,
            speed: 1.0,
            started: false,
            panelVisibility: "visible",
            addUIVisibility: "hidden"
        };

        this.resumeOrStopSimulate = this.resumeOrStopSimulate.bind(this);
        this.addSimulator = this.addSimulator.bind(this);
        this.loadingStart = this.loadingStart.bind(this);
        this.loadingFinish = this.loadingFinish.bind(this);
    }

    render() {
        return (
            <Group>
                <Html transform={false}>
                    <div style={{
                        background: "#ccc5",
                        border: "1px solid black",
                        borderRadius: "15px",
                        width: "fit-content",
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        transform: "translateX(-50%) translateY(-50%)",
                        bottom: "-5%",
                        padding: "15px",
                        visibility: this.state.panelVisibility
                    }}>
                        <div style={{
                            display: "flex",
                            width: "100%",
                            margin: "0 auto",
                            visibility: this.state.panelVisibility
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
                                value={this.state.dt}
                                onChange={(e: any) => { this.setState({ dt: e.target.value }); }}
                                disabled={this.state.started}
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
                                max={10.0}
                                step={0.1}
                                value={this.state.speed}
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
                            <button
                                style={{ width: "100%", margin: "0 10px" }}
                                onClick={() => {
                                    this.setState({ addUIVisibility: "visible"});
                                }}
                            >
                                追加
                            </button>
                        </div>
                        <div style={{
                            display: "flex",
                            width: "90%",
                            margin: "10px auto"
                        }}>
                            <button
                                style={{ width: "100%", margin: "0 10px" }}
                                onClick={() => {
                                    this.props.resetCallback();
                                    if (this.state.intervalID !== -1) {
                                        this.resumeOrStopSimulate();
                                    }
                                    this.setState({ started: false });
                                }}
                            >
                                初期化
                            </button>
                            <button
                                style={{ width: "100%", margin: "0 10px" }}
                                onClick={() => {}}
                            >
                                リセット
                            </button>
                        </div>
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
                        <label htmlFor="changeVisibility">
                            <input
                                type="checkbox"
                                id="changeVisibility"
                                checked={this.state.panelVisibility === "visible"}
                                onChange={(e: any) => {
                                    this.setState({
                                        panelVisibility: e.target.checked ? "visible" : "hidden"  
                                    });
                                }}
                            />
                            コントロールパネルを表示する
                        </label>
                    </div>
                </Html>
                <ObjectAdder
                    visibility={this.state.addUIVisibility}
                    addCallback={this.addSimulator}
                    cancelCallback={() => { this.setState({ addUIVisibility: "hidden" }); }}
                />
            </Group>
        );
    }

    private addSimulator(type: string, x: number, y: number, vx: number, vy: number, M: number, tag: string, color: string) {
        const blocks_num = 10;
        const steps_num = 600;
        const load_blocks = 3;

        var simulator;
        if (type === "planet") {
            simulator = SimulatorFactory.new_planet(blocks_num, steps_num, x, y, vy, M, this.state.dt);
        } else if (type === "satelite") {
            simulator = SimulatorFactory.new_satelite(blocks_num, steps_num, x, y, vx, vy, M, this.state.dt);
        } else {
            simulator = SimulatorFactory.new_comet(blocks_num, steps_num, x, y, vy, M, this.state.dt);
        }

        this.props.addSimulatorCallback(
            new SimulatorAccessor(
                simulator,
                this.props.memory,
                load_blocks,
                this.loadingStart,
                this.loadingFinish
            ),
            tag,
            color
        );
        this.setState({ started: true });
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

    private loadingStart() {
        if (this.state.intervalID !== -1) {
            clearInterval(this.state.intervalID);
            this.setState({ intervalID: -1 });
        }
    }

    private loadingFinish() {
        if (this.state.intervalID === -1) {
            const intervalID = setInterval(() => {
                this.props.nextCallback();
            }, 100/this.state.speed);
            this.setState({ intervalID: intervalID });
        }
    }
}
