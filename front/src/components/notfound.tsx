import React from "react";

export default class NotFound extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                textAlign: "center"
            }}>
                <h1>このページは存在しません</h1>
                <p>URLを確認の上再度アクセスしてみてください</p>
            </div>
        );
    }
}
