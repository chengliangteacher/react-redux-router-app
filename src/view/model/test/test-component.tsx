import React from 'react';
import { Button, Row, Table } from 'antd';
import GgridCol from '../../../components/g-grid-col';
import GTable from '../../../components/g-table';
const { Column } = Table
//=====================================state数据类型====================================//
interface stateTypes {
    count: number;
    imgurl: string;
}

export default class TsetComponent extends React.Component<any, stateTypes> {
    public timer: any = null;
    public refs: any = null;
    public refstable: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            count: 1,
            imgurl: ""
        };
    }
    public handleOnSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log(selectedRows)
    }
    /* 
            @description  生命周期 --- 更新dom前调用 是否更新
            @autor        cheng liang
            @create       2020-11-23 19:42"
            @params       
            @return       bool值
        */
    shouldComponentUpdate(nextProps: any, nextState: stateTypes): boolean {
        console.log('shouldComponentUpdate');
        return nextState.count !== 4;
    }
    /* 
            @description  生命周期 --- 元素加载完后执
            @autor        cheng liang
            @create       2020-11-23 19:42"
            @params       
            @return       
        */
    componentDidMount() {
        console.log(1111, this.refstable)
        // this.timer = setInterval(() => {
        //     this.setState((state: stateTypes) => {
        //         return {
        //             count: state.count + 1,
        //         };
        //     });
        // }, 1000);
        console.log('componentDidMount', process.env.REACT_APP_VERSION);
    }
    /* 
            @description  更新后被调用
            @autor        cheng liang
            @create       2020-11-23 19:45"
            @params       
            @return       
        */
    componentDidUpdate(prevProps: any, prevState: stateTypes) {
        console.log('componentDidUpdate');
        if (prevState.count === 5) {
            this.setState({
                count: 10,
            });
        }
    }
    /* 
            @description  组件销毁前调用
            @autor        cheng liang
            @create       2020-11-23 19:42"
            @params       
            @return       
        */
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleOpen = () => {
        document.cookie = 'name=chengliang';
        window.open("http://localhost:8080/portal/testA")
    }
    //=====================================监听input====================================//
    public handleInputileChange = async (e: any) => {
        // console.log(e.target.files)
        this.setState({
            imgurl: window.URL.createObjectURL(e.target.files[0])
        })
        console.log(window.URL.createObjectURL(e.target.files[0]))
        const imgUrl = window.URL.createObjectURL(e.target.files[0]);
        // 1.图片路径转成canvas
        const tempCanvas = await this.imgToCanvas(imgUrl);
        // 2.canvas添加水印
        const canvas = this.addWatermark(tempCanvas, "zpfei.ink11111111111");
        // 3.canvas转成img
        const img = this.convasToImg(canvas);
        // 查看效果
        document.getElementById("test-component")!.appendChild(img);
    }
    imgToCanvas = async (url: string) => {
        // 创建img元素
        const img = document.createElement("img");
        img.src = url;
        img.setAttribute("crossOrigin", "anonymous"); // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
        await new Promise((resolve) => (img.onload = resolve));
        // 创建canvas DOM元素，并设置其宽高和图片一样
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        return canvas;
    }
    public addWatermark = (canvas: any, text: string) => {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 20, 20);
        return canvas;
    }
    public convasToImg = (canvas: any) => {
        // 新建Image对象，可以理解为DOM
        var image = new Image();
        // canvas.toDataURL 返回的是一串Base64编码的URL
        // 指定格式 PNG
        image.src = canvas.toDataURL("image/png");
        return image;
    }
    render() {
        return (
            <div id="test-component" ref={(ref) => (this.refs = ref)}>
                <Row gutter={10} justify="space-between">
                    <GgridCol>
                        <div style={{ backgroundColor: 'green', height: '20px' }}></div>
                    </GgridCol>
                    <GgridCol>
                        <div style={{ backgroundColor: 'green', height: '20px' }}></div>
                    </GgridCol>
                    <GgridCol>
                        <div style={{ backgroundColor: 'green', height: '20px' }}></div>
                    </GgridCol>
                    <GgridCol>
                        <div style={{ backgroundColor: 'green', height: '20px' }}></div>
                    </GgridCol>
                </Row>
                <GTable ref={ref => this.refstable = ref} requestUrl="/role" rowKey="id" bordered rowSelection={{ onChange: this.handleOnSelectChange }}>
                    <Column
                        ellipsis={{ showTitle: true }}
                        title="序号"
                        dataIndex="index"
                        key="index"
                        align="center"
                        width={80}
                    />
                    <Column
                        ellipsis={{ showTitle: true }}
                        title="角色名称"
                        dataIndex="title"
                        key="title"
                        align="center"
                    />
                    <Column
                        ellipsis={{ showTitle: true }}
                        title="角色说明"
                        dataIndex="note"
                        key="note"
                        align="center"
                    />
                    <Column
                        ellipsis={{ showTitle: true }}
                        title="创建时间"
                        dataIndex="create_time"
                        key="create_time"
                        align="center"
                    />
                    <Column
                        ellipsis={{ showTitle: true }}
                        title="更新时间"
                        dataIndex="update_time"
                        key="update_time"
                        align="center"
                    />
                </GTable>
                <Button onClick={() => this.handleOpen()}>click</Button>
                <input type="file" onChange={(e) => { this.handleInputileChange(e) }} />
            </div>
        );
    }
}
