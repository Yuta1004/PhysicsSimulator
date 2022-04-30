import React from "react";

export default class Settings extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            viewHistoriesNum: this.props.viewHistoriesNum,
            blocksNum: this.props.blocksNum,
            stepsNum: this.props.stepsNum,
            loadBlocksNum: this.props.loadBlocksNum
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.applySettings = this.applySettings.bind(this);
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
                    <h3>設定</h3>
                    <h4>描画設定</h4>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        履歴描画数({
                            this.state.viewHistoriesNum == 301 ? "無限" : this.state.viewHistoriesNum 
                        })
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            name="viewHistoriesNum"
                            type="range"
                            min={0}
                            max={301}
                            step={1}
                            value={this.state.viewHistoriesNum}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <hr/>
                    <h4>メモリ設定<u>(上級者向け設定)</u></h4>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        ブロック数({this.state.blocksNum})
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            name="blocksNum"
                            min={2}
                            max={30}
                            step={1}
                            value={this.state.blocksNum}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        ステップ数({this.state.stepsNum})
                        <input
                            style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            name="stepsNum"
                            min={1}
                            max={1200}
                            step={1}
                            value={this.state.stepsNum}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto"
                    }}>
                        更新ブロック数({this.state.loadBlocksNum})
                        <input
                        style={{ width: "50%", position: "absolute", right: "0" }}
                            type="range"
                            name="loadBlocksNum"
                            min={1}
                            max={this.state.blocksNum-1}
                            step={1}
                            value={this.state.loadBlocksNum}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{
                            display: "flex",
                            width: "90%",
                            margin: "15px auto"
                    }}>
                        <button
                            style={{ width: "100%", margin: "0 10px" }}
                            onClick={this.applySettings}
                        >
                            適用(※以降の追加より)
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

    private onValueChange(e: any) {
        const key = e.target.name;
        const value = e.target.value === "" ? 0.0 : e.target.value;
        this.setState({ [key]: value });

    }

    private applySettings() {
        this.props.updateCallback(
            this.state.blocksNum,
            this.state.stepsNum,
            this.state.loadBlocksNum,
            this.state.viewHistoriesNum == 301 ? -1 : this.state.viewHistoriesNum
        );
    }
}
