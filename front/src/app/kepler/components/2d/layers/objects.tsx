import React from "react";
import { Layer } from "react-konva";

import SimulatorAccessor from "../../../../memory";
import Object from "./components/object";

class Objects extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            objects: [],
            _dummy: 0
        };
    }

    render() {
        return (
            <Layer>
                { this.state.objects.map((_: SimulatorAccessor, object: Object) => object )}
            </Layer>
        );
    }

    public addSimulator(simulator: SimulatorAccessor, name: string, color: string) {
        const value = simulator.getValue();
        const object = <Object
            name={name}
            color={color}
            x={value[0]}
            y={value[1]}
        />;
        const objects = this.state.objects;
        objects.push([simulator, object]);
        this.setState({ objects: objects });
    }

    public prev() {
        this.state.objects.map((simulator: SimulatorAccessor, object: Object) => {
            simulator.updateCursor(-1);
            const value = simulator.getValue();
            object.update(value[0], value[1]);
        });
        this.setState({ _dummy: this.state._dummy-1 })
    }

    public next() {
        this.state.objects.map((simulator: SimulatorAccessor, object: Object) => {
            simulator.updateCursor(1);
            const value = simulator.getValue();
            object.update(value[0], value[1]);
        });
        this.setState({ _dummy: this.state._dummy+1 })
    }
}

export default Objects;
