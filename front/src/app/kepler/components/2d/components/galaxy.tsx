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
                    padding: "5px 15px",
                    background: "#ccc"
                }}>
                    <h3>天体画像ギャラリー</h3>
                    <p>新しいタブを開きます</p>
                    <div style={{
                            display: "flex",
                            width: "90%",
                            margin: "15px auto"
                    }}>
                        <button
                            style={{ width: "100%", margin: "0 10px" }}
                            onClick={() => {
                                window.open(window.location.href+"kepler/galaxy", '_blank', 'noopener,noreferrer');
                            }}
                        >
                            開く
                        </button>
                        <button
                            style={{ width: "100%", margin: "0 10px" }}
                            onClick={this.props.cancelCallback}
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
