import React from "react";

export default class Settings extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.style}>
                <div style={{
                    border: "1px solid black",
                    borderRadius: "30px",
                    width: "100%",
                    padding: "5px 15px",
                    background: "#cccb"
                }}>
                    <h3>設定</h3>
                    <h4>描画設定</h4>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        履歴描画数(50)
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onChange={() => {}}
                        />
                    </div>
                    <hr/>
                    <h4>メモリ設定<u>(上級者向け設定)</u></h4>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        ブロック数(10)
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onChange={() => {}}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        ステップ数(600)
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onChange={() => {}}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        更新ブロック数(3)
                        <input
                        style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onChange={() => {}}
                        />
                    </div>
                </div> 
            </div>
        );
    }
}
