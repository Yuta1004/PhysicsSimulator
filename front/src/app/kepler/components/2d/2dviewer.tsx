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
            _dummy: 0
        };

        this.onWheel = this.onWheel.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
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
                x={this.state.stageX}
                y={this.state.stageY}
                draggable
            >
                <Background/>
                <Environment memory={this.props.memory}/>
            </Stage>
        );
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

    private onDragMove() {
        this.setState({ _dummy: this.state._dummy-1 });
    }
}
