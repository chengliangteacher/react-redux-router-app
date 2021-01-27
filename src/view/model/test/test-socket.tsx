import { Input, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { Fragment } from "react";
import { io } from 'socket.io-client';
import { developNodeImgUrl } from "../../../api/ApiIp";
const { TextArea } = Input;
interface messageItem {
    type: number;
    content: string;
    time: string;
    avatar: string;
    id: string;
}
interface stateTypes {
    messageData: Array<messageItem>;
    message: string;
}

export default class TestSocket extends React.Component<any, stateTypes> {
    public socket: any;
    constructor(props: any) {
        super(props);
        this.state = {
            messageData: [],
            message: "",
        }
    }
    componentDidMount() {
        this.handleConnectSocket();
    }
    //=====================================注销节点时注销socket.io连接====================================//
    componentWillUnmount() {
        this.socket.close();
    }
    //=====================================更新后====================================//
    componentDidUpdate() {
        this.handleShowMessageBoxScrollBottom();
    }
    //=====================================连接接socket====================================//
    public handleConnectSocket = () => {
        this.socket = io({
            path: "/test",
        });
        this.socket.on("connect", () => {
            //=====================================向服务器提交用户连接成功事件====================================//
            this.socket.emit('user_login', this.socket.id);
            this.socket.on('news', (data: any) => {
            if (data) {
                    try {
                        const messagedata = JSON.parse(data);
                        if (!this.state.messageData.some(item => item.id === messagedata.id)) {
                            messagedata.type = 2;
                            this.setState(state => {
                                state.messageData.push(messagedata);
                                return {
                                    messageData: state.messageData
                                }
                            })
                        }
                    } catch (error) {
                        console.error(error);
                        return;
                    }
                }
            });
        });
    }
    //=====================================input回车====================================//
    public handleOnPressEnter(e: any) {
        e.preventDefault();
        if (!e.target.value) return;
        this.setState(state => {
            const messagedata = {
                content: e.target.value,
                type: 1,
                time: (new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()).replace(/\//g, "-"),
                avatar: sessionStorage.userData ? JSON.parse(sessionStorage.userData).avatar : "",
                id: new Date().getTime() + ""
            }
            state.messageData.push(messagedata);
            this.socket.emit('news', this.socket.id ,JSON.stringify(messagedata));
            return {
                messageData: state.messageData,
                message: ""
            }
        })
    }
    //=====================================遍历展示消息信息====================================//
    public showMessage = () => {
        return (
            this.state.messageData.map((item: messageItem, index: number) => {
                return (
                    <Fragment key={index}>
                        <div className="text-center" style={{ color: "#eee" }}>{item.time}</div>
                        <div className={`d-flex ${item.type === 2 ? "start" : "end"} mb-1`}>
                            <div className="d-flex center">
                                { item.type === 2 ?  <Avatar src={developNodeImgUrl + item.avatar} className="mr-1" /> : ""}
                                <Tag color="green">{item.content}</Tag>
                                { item.type === 1 ?  <Avatar src={developNodeImgUrl + item.avatar} className="ml-1" /> : ""}
                            </div>
                        </div>
                    </Fragment>
                )
            })
        )
    }
    //=====================================聊天内容显示中滚动条默认到最底部====================================//
    public handleShowMessageBoxScrollBottom = () => {
        const element = document.getElementById("show-message-block");
        if (element) {
            element.scrollTop = element?.scrollHeight;
        }
    }
    render() {
        return (
            <div className="w-100">
                <div id="show-message-block" className="w-100;" style={{ height: "400px", overflow: "auto", border: "1px solid #eee" }}>
                    {
                        this.showMessage()
                    }
                </div>
                <div className="w-100;" style={{ height: "200px", }}>
                    <TextArea value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} rows={8} onPressEnter={(e) => { this.handleOnPressEnter(e) }}></TextArea>
                </div>
            </div>
        )
    }
}