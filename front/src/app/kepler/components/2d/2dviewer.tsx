import React from "react";
import { Stage } from "react-konva";

import Background from "./components/background";

class Viewer2D extends React.Component {
    state = {
        stageScale: 1,
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
            </Stage>
        );
    }

    private onWheel(e: any) {
        e.evt.preventDefault();

        const stage = e.target.getStage();
        const nowScale = stage.scaleX();
        const newScale = e.evt.deltaY > 0 ? nowScale*1.05 : nowScale/1.05;
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
