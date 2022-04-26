import React from "react";
import { Layer, Rect, Circle, Line, Text } from "react-konva";

class Background extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Layer>
                <Rect x={-5000} y={-5000} width={10000} height={10000} fill="#e2e2e2"/>
                <Circle x={0} y={0} radius={3} fill="#525252"/>
                <Line points={[-5000, 0, 5000, 0]} stroke="#525252" strokeWidth={1}/>
                <Line points={[0, -5000, 0, 5000]} stroke="#525252" strokeWidth={1}/>
                <Text text="x" x={30} y={-20} stroke="#525252"/>
                <Text text="y" x={-20} y={-50} stroke="#525252"/>
            </Layer>
        );
    }
}

export default Background;
