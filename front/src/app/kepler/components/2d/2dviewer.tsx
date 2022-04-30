import React from "react";
import { Stage } from "react-konva";

import Background from "./layers/background";
import Environment from "./layers/environment";

export default class Viewer2D extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            stageScale: 0.6,
            stageX: window.innerWidth/2,
            stageY: window.innerHeight/2,
            lastTouchedCenter: null,
            lastTouchedDist: 0,
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

        type Pos = { x: number, y: number };
        const calcDist = (pos1: Pos, pos2: Pos) => Math.pow(pos1.x-pos2.x, 2) + Math.pow(pos1.y-pos2.y, 2);
        const calcCenter = (pos1: Pos, pos2: Pos) => {
            return {
                x: (pos1.x+pos2.x)/2,
                y: (pos1.y+pos2.y)/2
            };
        };

        const stage = e.target.getStage();
        if (stage.isDragging()) {
            stage.stopDrag();
        }

        const pos1 = { x: touch1.clientX, y: touch1.clientY };
        const pos2 = { x: touch2.clientX, y: touch2.clientY };

        const center = calcCenter(pos1, pos2);
        if (!this.state.lastTouchedCenter) {
            this.setState({ lastTouchedCenter: center });
            return;
        }

        const dist = calcDist(pos1, pos2);
        if (!this.state.lastTouchedDist) {
            this.setState({ lastTouchedDist: dist });
        }

        const pointTo = {
            x: (center.x-stage.x()) / this.state.stageScale,
            y: (center.y-stage.y()) / this.state.stageScale,
        };
        const scale = stage.scaleX() * (dist/this.state.lastTouchedDist);
        const dx = center.x - this.state.lastTouchedCenter.x;
        const dy = center.y - this.state.lastTouchedCenter.y;

        console.log("test");
        this.setState({
            stageScale: scale,
            stageX: center.x - pointTo.x*scale + dx,
            stageY: center.y - pointTo.y*scale + dy
        });
    }

    private onTouchEnd () {
        this.setState({ lastTouchedDist: 0, lastTouchedCenter: null });
    }
}
