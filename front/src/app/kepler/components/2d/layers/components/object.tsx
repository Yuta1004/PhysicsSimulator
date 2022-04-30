import React from "react";
import { Group, Text, Circle } from "react-konva";

export default class Object extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: props.name,
            color: props.color,
            x: props.x,
            y: props.y,
            history: []
        };

        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
    }

    render() {
        return (
            <Group>
                {this.state.history.map((pos: [number, number], idx: number) =>
                    <Circle
                        key={idx}
                        x={pos[0]*30}
                        y={-pos[1]*30}
                        radius={5}
                        fill={this.state.color+"44"}
                    />
                )}
                <Circle
                    x={this.state.x*30}
                    y={-this.state.y*30}
                    radius={20}
                    stroke={this.state.color}
                    fill={this.state.color+"aa"}
                />
                <Text
                    text={this.state.name}
                    x={this.state.x*30}
                    y={-this.state.y*30-30}
                    fontSize={30}
                />
            </Group>
        );
    }

    public reset(x: number, y: number) {
        this.setState({
            x: x,
            y: y,
            history: [[x, y]]
        });
    }

    public update(x: number, y: number) {
        const history = this.state.history;
        history.push([this.state.x, this.state.y]);
        if (history.length > 50) {
            history.shift();
        }
        this.setState({
            x: x,
            y: y,
            history: history,
        });
    }
}
