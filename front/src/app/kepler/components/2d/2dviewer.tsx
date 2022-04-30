import React from "react";
import { Stage } from "react-konva";

import Background from "./layers/background";
import Environment from "./layers/environment";

type Pos = { x: number, y: number };
const calcDist = (pos1: Pos, pos2: Pos) => Math.pow(pos1.x-pos2.x, 2) + Math.pow(pos1.y-pos2.y, 2);
const calcCenter = (pos1: Pos, pos2: Pos) => {
    return {
        x: (pos1.x+pos2.x)/2,
        y: (pos1.y+pos2.y)/2
    };
};

export default class Viewer2D extends React.Component<any, any> {
    lastTouchedCenter: Pos|null = null;
    lastTouchedDist: number = 0;

    constructor(props: any) {
        super(props);

        this.state = {
            stageScale: 0.6,
            stageX: window.innerWidth/2,
            stageY: window.innerHeight/2,
            _dummy: 0
        };

        this.onWheel = this.onWheel.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    render() {
        return (
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={this.state.stageScale}
                scaleY={this.state.stageScale}
                onWheel={this.onWheel}
                onDragMove={this.onDragMove}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                x={this.state.stageX}
                y={this.state.stageY}
                draggable
            >
                <Background/>
                <Environment memory={this.props.memory}/>
            </Stage>
        );
    }

    private onDragMove() {
        this.setState({ _dummy: this.state._dummy-1 });
    }

    private onWheel(e: any) {
        e.evt.preventDefault();

        const stage = e.target.getStage();
        const nowScale = stage.scaleX();
        const newScale = Math.max(e.evt.deltaY > 0 ? nowScale*1.05 : nowScale/1.05, 0.25);
        const mousePos = {
            x: stage.getPointerPosition().x/nowScale - stage.x()/nowScale,
            y: stage.getPointerPosition().y/nowScale - stage.y()/nowScale
        };
        
        this.setState({
            stageScale: newScale,
            stageX: -(mousePos.x - stage.getPointerPosition().x/newScale) * newScale,
            stageY: -(mousePos.y - stage.getPointerPosition().y/newScale) * newScale,
        });
    }

    private onTouchMove (e: any) {
        e.evt.preventDefault();

        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];
        if (!touch1 || !touch2) {
            return;
        }
        e.target.getStage().stopDrag();

        const pos1 = { x: touch1.clientX, y: touch1.clientY };
        const pos2 = { x: touch2.clientX, y: touch2.clientY };

        const center = calcCenter(pos1, pos2);
        if (!this.lastTouchedCenter) {
            this.lastTouchedCenter = center;
            return;
        }

        const dist = calcDist(pos1, pos2);
        if (!this.lastTouchedDist) {
            this.lastTouchedDist = dist;
        }

        var scale = this.state.stageScale;
        if (dist < this.lastTouchedDist) {
            scale /= 1.1;
        } else if (dist > this.lastTouchedDist) {
            scale *= 1.1;
        }

        this.setState({ stageScale: scale });
    }

    private onTouchEnd () {
        this.lastTouchedCenter = null;
        this.lastTouchedDist = 0;
    }
}
