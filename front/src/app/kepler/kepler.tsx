import React from "react";

import Viewer2D from "./components/2d/2dviewer";
import Settings from "./components/2d/settings";

export default class Kepler extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Viewer2D
                    memory={this.props.memory}
                    blocksNum={10}
                    stepsNum={600}
                    loadBlocksNum={300}
                    viewHistoriesNum={-1}
                />
                <Settings
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "20px 40px",
                        width: "30%"
                    }} 
                />
            </div>
        );
    }
}
