import React from "react";

import Viewer2D from "./components/2d/2dviewer";

export default class Kepler extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Viewer2D memory={this.props.memory}/>;
    }
}
