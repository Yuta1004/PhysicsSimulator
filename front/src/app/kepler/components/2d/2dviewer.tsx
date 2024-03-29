import React from "react";
import { Stage } from "react-konva";
import { FiSettings } from "react-icons/fi";
import { BsImages } from "react-icons/bs";

import Background from "./layers/background";
import Environment from "./layers/environment";
import Settings from "./components/settings";
import Galaxy from "./components/galaxy";

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
            blocksNum: 10,
            stepsNum: 600,
            loadBlocksNum: 3,
            viewHistoriesNum: 50,
            settingsUIVisibility: "hidden",
            openGalaxyUIVisibility: "hidden",
            _dummy: 0
        };

        this.updateSettings = this.updateSettings.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    render() {
        return (
            <div>
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
                    <Environment
                        memory={this.props.memory}
                        blocksNum={this.state.blocksNum}
                        stepsNum={this.state.stepsNum}
                        loadBlocksNum={this.state.loadBlocksNum}
                        viewHistoriesNum={this.state.viewHistoriesNum}
                    />
                </Stage>
                <h1
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "15px"
                }}>
                    KEPLER☆
                </h1>
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "20px"
                }}>
                    <button style={{ margin: "0 10px", borderRadius: "50px" }}>
                        <BsImages
                            color="#000a"
                            size={50}
                            onClick={() => {
                                this.setState({
                                    openGalaxyUIVisibility: this.state.openGalaxyUIVisibility === "visible" ? "hidden" : "visible"
                                })
                            }}
                        />
                    </button>
                    <button style={{ margin: "0 10px", borderRadius: "50px" }}>
                        <FiSettings
                            color="#000a"
                            size={50}
                            onClick={() => {
                                this.setState({
                                    settingsUIVisibility: this.state.settingsUIVisibility === "visible" ? "hidden" : "visible"
                                })
                            }}
                        />
                    </button>
                </div>
                <Settings
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "20px 40px",
                        width: "30%",
                        visibility: this.state.settingsUIVisibility
                    }}
                    blocksNum={this.state.blocksNum}
                    stepsNum={this.state.stepsNum}
                    loadBlocksNum={this.state.loadBlocksNum}
                    viewHistoriesNum={this.state.viewHistoriesNum}
                    updateCallback={this.updateSettings}
                    cancelCallback={() => { this.setState({ settingsUIVisibility: "hidden" }); }}
                />
                <Galaxy
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "20px 40px",
                        width: "30%",
                        visibility: this.state.openGalaxyUIVisibility
                    }}
                    cancelCallback={() => { this.setState({ openGalaxyUIVisibility: "hidden" }); }}
                />
            </div>
        );
    }

    private updateSettings(blocksNum: number, stepsNum: number, loadBlocksNum: number, viewHistoriesNum: number) {
        this.setState({
            blocksNum: blocksNum,
            stepsNum: stepsNum,
            loadBlocksNum: loadBlocksNum,
            viewHistoriesNum: viewHistoriesNum
        });
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
