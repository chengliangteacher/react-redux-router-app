import React from 'react';
import { Button, Row, Table } from 'antd';
import GgridCol from '../../../components/g-grid-col';
import GTable from '../../../components/g-table';
const { Column } = Table
//=====================================state数据类型====================================//
interface stateTypes {
    count: number;
}

export default class TsetComponent extends React.Component<any, stateTypes> {
    public timer: any = null;
    public refs: any = null;
    public refstable: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            count: 1,
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
        document.cookie='name=chengliang';
        window.open("http://localhost:8080/portal/testA")
    }
    render() {
        return (
            <div ref={(ref) => (this.refs = ref)}>
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
                <GTable ref={ref => this.refstable=ref} requestUrl="/role" rowKey="id" bordered rowSelection={{onChange: this.handleOnSelectChange}}>
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
            </div>
        );
    }
}
