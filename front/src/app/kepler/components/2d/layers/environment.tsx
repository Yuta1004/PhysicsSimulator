import React from "react";
import { Layer } from "react-konva";

import SimulatorAccessor from "../../../../memory";
import Object from "./components/object";
import Controller from "./components/controller";

export default class Environment extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            objects: [],
            _dummy: 0
        };

        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.addSimulator = this.addSimulator.bind(this);
    }

    render() {
        return (
            <Layer>
                { this.state.objects.map((object: [SimulatorAccessor, JSX.Element ,React.RefObject<Object>]) =>
                    object[1]
                )}
                <Controller
                    memory={this.props.memory}
                    initCallback={this.init}
                    resetCallback={this.reset}
                    prevCallback={this.prev}
                    nextCallback={this.next}
                    addSimulatorCallback={this.addSimulator}
                    blocksNum={this.props.blocksNum}
                    stepsNum={this.props.stepsNum}
                    loadBlocksNum={this.props.loadBlocksNum}
                />
            </Layer>
        );
    }

    public addSimulator(simulator: SimulatorAccessor, name: string, color: string) {
        const objects = this.state.objects;
        const value = simulator.getValue();
        const objectRef = React.createRef<Object>();
        const object = <Object
            key={name+Math.random()}
            name={name}
            color={color}
            x={value[0]}
            y={value[1]}
            ref={objectRef}
        />;
        objects.push([simulator, object, objectRef]);
        this.setState({ objects: objects });
    }

    public init() {
        this.setState({ objects: [] })
    }

    public reset() {
        this.state.objects.map((object: [SimulatorAccessor, JSX.Element, React.RefObject<Object>]) => {
            if (object[2].current !== null) {
                object[0].reset();
                const value = object[0].getValue();
                object[2].current.reset(value[0], value[1]);
            }
        });
        this.setState({ _dummy: this.state.dummy-1 });
    }

    public prev() {
        this.state.objects.map((object: [SimulatorAccessor, JSX.Element, React.RefObject<Object>]) => {
            if (object[2].current !== null) {
                object[0].updateCursor(-1);
                const value = object[0].getValue();
                object[2].current.update(value[0], value[1]);
            }
        });
        this.setState({ _dummy: this.state._dummy-1 })
    }

    public next() {
        this.state.objects.map((object: [SimulatorAccessor, JSX.Element, React.RefObject<Object>]) => {
            if (object[2].current !== null) {
                object[0].updateCursor(1);
                const value = object[0].getValue();
                object[2].current.update(value[0], value[1]);
            }
        });
        this.setState({ _dummy: this.state._dummy-1 })
    }
}
