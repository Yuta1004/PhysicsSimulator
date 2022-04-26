import React from "react";
import { Text, Circle } from "react-konva";

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

export default Object;
