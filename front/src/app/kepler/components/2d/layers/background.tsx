import React from "react";
import { Layer, Group, Rect, Circle, Line, Text } from "react-konva";

export default class Background extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Layer>
                <Rect x={-5000} y={-5000} width={10000} height={10000} fill="#f2f2f2"/>
                {[...Array(100)].map((_, val) => {
                    if (val !== 50) {
                        return <Group key={val}>
                            <Line points={[(val-50)*150, -5000, (val-50)*150, 5000]} stroke="#c0c0c0" strokeWidth={1}/>
                            <Line points={[5000, (val-50)*150, -5000, (val-50)*150]} stroke="#c0c0c0" strokeWidth={1}/>
                            <Text text={(val-50)*5+""} x={(val-50)*150+10} y={-20} fontSize={20}/>
                            <Text text={(val-50)*5+""} x={10} y={-(val-50)*150+10} fontSize={20}/>
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
