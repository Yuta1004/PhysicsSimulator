import React from "react";
import { Layer, Group, Rect, Circle, Line, Text } from "react-konva";

export default class Background extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const lines = 66;
        return (
            <Layer>
                <Rect x={-5000} y={-5000} width={10000} height={10000} fill="#f2f2f2"/>
                {[...Array(lines)].map((_, val) => {
                    if (val !== lines/2-1) {
                        return <Group key={val}>
                            <Line points={[(val-lines/2+1)*150, -5000, (val-lines/2+1)*150, 5000]} stroke="#c0c0c0" strokeWidth={1}/>
                            <Line points={[5000, (val-lines/2+1)*150, -5000, (val-lines/2+1)*150]} stroke="#c0c0c0" strokeWidth={1}/>
                            <Text text={(val-lines/2+1)*5+""} x={(val-lines/2+1)*150+10} y={-20} fontSize={20}/>
                            <Text text={(val-lines/2+1)*5+""} x={10} y={-(val-lines/2+1)*150+10} fontSize={20}/>
                        </Group>;
                    }
                }
                )}
                <Line points={[-5000, 0, 5000, 0]} stroke="#525252" strokeWidth={2}/>
                <Line points={[0, -5000, 0, 5000]} stroke="#525252" strokeWidth={2}/>
                <Text text="x" x={70} y={-20} stroke="#525252"/>
                <Text text="y" x={-20} y={-90} stroke="#525252"/>
                <Text text="ORIGIN" x={-35} y={-40} stroke="black" fontSize={20}/>
                <Circle x={0} y={0} radius={10} fill="#525252"/>
            </Layer>
        );
    }
}
