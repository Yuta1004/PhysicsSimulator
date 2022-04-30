import React from "react";

export default class Galaxy extends React.Component<any, any> {
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
                    padding: "15px",
                    background: "#ccc"
                }}>
                    <h3>天体画像サイトの表示</h3>
                    <button
                        style={{ width: "100%" }}
                        onClick={this.props.cancelCallback}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        );
    }
}
