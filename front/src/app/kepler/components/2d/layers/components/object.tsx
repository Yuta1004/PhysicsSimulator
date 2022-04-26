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
                        fill={this.state.color}
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
