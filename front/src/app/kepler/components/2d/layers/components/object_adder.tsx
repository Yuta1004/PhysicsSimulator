import React from "react";
import { Html } from "react-konva-utils";

export default class ObjectAdder extends React.Component<any, any> {
    private defaultValues = {
        planet: {
            x: 5.0,
            y: 0.0,
            vx: 0.0,
            vy: 1.3,
            M: 1.0,
            tag: "Planet",
            color: "#ff0000"
        },
        satelite: {
            x: 20.0,
            y: 0.0,
            vx: 0.0,
            vy: 1.7,
            M: 100.0,
            tag: "Satelite",
            color: "#00ff00"
        },
        comet: {
            x: -5.0,
            y: 2.0,
            vx: 0.0,
            vy: 1.2,
            M: 1.0,
            tag: "Comet",
            color: "#0000ff"
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            type: "planet",
            x: this.defaultValues.planet.x,
            y: this.defaultValues.planet.y,
            vx: this.defaultValues.planet.vx,
            vy: this.defaultValues.planet.vy,
            M: this.defaultValues.planet.M,
            tag: this.defaultValues.planet.tag,
            color: this.defaultValues.planet.color
        };

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    render() {
        return (
            <Html transform={false}>
                <div
                    style={{
                    background: "#cccb",
                    border: "1px solid black",
                    borderRadius: "15px",
                    width: "fit-content",
                    position: "absolute",
                    left: "50%",
                    right: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    top: "40%",
                    padding: "15px",
                    textAlign: "center",
                    visibility: this.props.visibility
                }}>
                    <h3>オブジェクト設定</h3>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        種類:
                        <select
                            style={{ width: "60%", position: "absolute", left: "30%" }}
                            onChange={this.onTypeChange}
                            value={this.state.type}
                        >
                            <option value="planet">惑星</option>
                            <option value="satelite">人工衛星</option>
                            <option value="comet">彗星</option>
                        </select>
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        X:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="value"
                            name="x"
                            value={this.state.x}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        Y:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="value"
                            name="y"
                            value={this.state.y}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        Vx:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="value"
                            name="vx"
                            value={this.state.vx}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        Vy:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="value"
                            name="vy"
                            value={this.state.vy}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        M:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="value"
                            name="M"
                            value={this.state.M}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "10px auto",
                    }}>
                        タグ:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="text"
                            name="tag"
                            value={this.state.tag}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "90%",
                        margin: "15px auto",
                    }}>
                        表示色:
                        <input
                            style={{ width: "45%", position: "absolute", left: "40%" }}
                            type="color"
                            name="color"
                            value={this.state.color}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <hr style={{ border: "1px dashed #222b", margin: "20px 0 10px 0" }}/>
                    <button
                        style={{ width: "100%", margin: "5px 0" }}
                        onClick={() => {
                            this.props.addCallback(
                                this.state.type,
                                this.state.x,
                                this.state.y,
                                this.state.vx,
                                this.state.vy,
                                this.state.M,
                                this.state.tag,
                                this.state.color
                            );
                        }}
                    >
                        追加
                    </button>
                    <button
                        style={{ width: "100%", margin: "5px 0" }}
                        onClick={() => {
                            this.props.addCallback(
                                this.state.type,
                                this.state.x,
                                this.state.y,
                                this.state.vx,
                                this.state.vy,
                                this.state.M,
                                this.state.tag,
                                this.state.color
                            );
                            this.props.cancelCallback();
                        }}
                    >
                        追加して閉じる
                    </button>
                    <button
                        style={{ width: "100%", margin: "5px 0"}}
                        onClick={this.props.cancelCallback}
                    >
                        閉じる
                    </button>
                </div>
            </Html>
        );
    }

    private onTypeChange(e: any) {
        const type: string = e.target.value;
        var defaultValue = this.defaultValues.planet;
        if (type === "satelite") {
            defaultValue = this.defaultValues.satelite;
        } else if (type === "comet") {
            defaultValue = this.defaultValues.comet;
        }
        this.setState({
            type: type,
            x: defaultValue.x,
            y: defaultValue.y,
            vx: defaultValue.vx,
            vy: defaultValue.vy,
            M: defaultValue.M,
            tag: defaultValue.tag,
            color: defaultValue.color
        });
    }

    private onValueChange(e: any) {
        const key = e.target.name;
        const value = e.target.value === "" ? 0.0 : e.target.value;
        this.setState({ [key]: value });
    }
}
