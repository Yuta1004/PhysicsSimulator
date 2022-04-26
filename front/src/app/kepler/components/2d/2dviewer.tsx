import React from "react";
import { Stage } from "react-konva";

import Background from "./layers/background";
import Objects from "./layers/objects";

class Viewer2D extends React.Component {
    state = {
        stageScale: 0.6,
        stageX: window.innerWidth/2,
        stageY: window.innerHeight/2
    };
    
    constructor(props: any) {
        super(props);
        this.onWheel = this.onWheel.bind(this);
    }

    render() {
        return (
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={this.state.stageScale}
                scaleY={this.state.stageScale}
                onWheel={this.onWheel}
                x={this.state.stageX}
                y={this.state.stageY}
                draggable
            >
                <Background/>
                <Objects/>
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
}

export default Viewer2D;
