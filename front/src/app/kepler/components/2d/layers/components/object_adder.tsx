import React from "react";
import { Html } from "react-konva-utils";

export default class ObjectAdder extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Html
                transform={false}
                divProps={{ style: {
                    background: "#cccf",
                    border: "1px solid black",
                    ["border-radius"]: "15px",
                    width: "fit-content",
                    position: "absolute",
                    left: "50%",
                    right: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    top: "40%",
                    padding: "15px",
                    ["text-align"]: "center",
                    visibility: this.props.visibility
            }}}>
                <h3>追加オブジェクト設定</h3>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    種類:
                    <select style={{ width: "60%", position: "absolute", left: "30%" }}>
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
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="value"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    Y:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="value"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    Vx:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="value"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    Vy:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="value"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    M:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="value"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    タグ:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="text"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "15px auto",
                }}>
                    表示色:
                    <input style={{ width: "45%", position: "absolute", left: "40%" }} type="color"/>
                </div>
                <div style={{
                    display: "flex",
                    width: "90%",
                    margin: "10px auto",
                }}>
                    <button
                        style={{ width: "fit-content", margin: "10px 10px" }}
                        onClick={this.props.addCallback}
                    >
                        追加
                    </button>
                    <button
                        style={{ width: "fit-content", margin: "10px 10px" }}
                        onClick={this.props.cancelCallback}
                    >
                        キャンセル
                    </button>
                </div>
            </Html>
        );
    }
}
