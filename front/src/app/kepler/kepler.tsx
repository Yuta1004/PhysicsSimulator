import React from "react";

import Viewer2D from "./components/2d/2dviewer";

export default class Kepler extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Viewer2D
                memory={this.props.memory}
                blocksNum={10}
                stepsNum={600}
                loadBlocksNum={300}
                viewHistoriesNum={-1}
            />
        );
    }
}
