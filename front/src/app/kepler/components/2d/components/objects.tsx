import React from "react";
import { Layer, Text, Circle } from "react-konva";

import SimulatorAccessor from "../../../../memory";

class Objects extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            objects: [],
            _dummy: 0
        };
    }

    render() {
        return (
            <Layer>
                { this.state.objects.map((_: SimulatorAccessor, object: Object) => object )}
            </Layer>
        );
    }

    public addSimulator(simulator: SimulatorAccessor, name: string, color: string) {
        const value = simulator.getValue();
        const object = <Object
            name={name}
            color={color}
            x={value[0]}
            y={value[1]}
        />;
        const objects = this.state.objects;
        objects.push([simulator, object]);
        this.setState({ objects: objects });
    }

    public prev() {
        this.state.objects.map((simulator: SimulatorAccessor, object: Object) => {
            simulator.updateCursor(-1);
            const value = simulator.getValue();
            object.update(value[0], value[1]);
        });
        this.setState({ _dummy: this.state._dummy-1 })
    }

    public next() {
        this.state.objects.map((simulator: SimulatorAccessor, object: Object) => {
            simulator.updateCursor(1);
            const value = simulator.getValue();
            object.update(value[0], value[1]);
        });
        this.setState({ _dummy: this.state._dummy+1 })
    }
}

class Object extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: props.name,
            color: props.color,
            x: props.x,
            y: props.y,
            history: [[10, 10], [20, 20], [30, 30]]
        };
    }

    render() {
        return (
            <div>
                <Circle
                    x={this.state.x}
                    y={this.state.y}
                    radius={20}
                    stroke={this.state.color}
                    fill={this.state.color+"aa"}
                />
                <Text
                    text={this.state.name}
                    x={this.state.x}
                    y={this.state.y}
                />
                {this.state.history.map((pos: [number, number]) => 
                    <Circle
                        x={pos[0]}
                        y={pos[1]}
                        radius={5}
                        fill={this.state.color}
                    />
                )}
            </div>
        );
    }

    public update(x: number, y: number) {
        const history = this.state.history;
        history.push([this.state.x, this.state.y]);
        this.setState({
            x: x,
            y: y,
            history: history,
        });
    }
}

export default Objects;
