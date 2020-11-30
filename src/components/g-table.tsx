/* 
    @description  全局table组件
    @autor        cheng liang
    @create       2020-11-30 15:30"
    @params       
    @return       
*/
import React, { ReactNode } from 'react';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import axios from '../api';
import { GetRowKey, TableRowSelection } from 'antd/lib/table/interface';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
//=====================================props类型声明====================================//
interface propTypes {
    bordered?: boolean;
    loading?: boolean;
    pagination?: TablePaginationConfig | false;
    size?: SizeType;
    expandedRowRender?: (record: any) => ReactNode;
    title?: string;
    showHeader?: boolean;
    footer?: (pageData: any) => string;
    rowSelection?: TableRowSelection<any>;
    top?: string;
    bottom?: string;
    columns?: ColumnsType;
    children?: ReactNode;
    tableLayout?: "auto" | "fixed";
    requestUrl: string;
    rowClassName?: (record: any, index: number) => string;
    rowKey: string | GetRowKey<any>;
}
//=====================================state类型声明====================================//
interface stateTypes {
    tableData: any[];
    loading: boolean;
    pagination: TablePaginationConfig;
}
export default class GTable extends React.Component<propTypes, stateTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            tableData: [], // 表格数据
            loading: false, // 加载小圈圈
            //=====================================默认分页处理====================================//
            pagination: {
                current: 1,
                pageSize: 10,
                defaultCurrent: 1,
                defaultPageSize: 10,
                total: 0,
                showSizeChanger: true,
                showTitle: true,
                showQuickJumper: true,
                onChange: (page: number, pageSize?: number | undefined) => {
                    this.getTableData(page, pageSize);
                },
                onShowSizeChange: (page: number, pageSize: number) => {
                    this.getTableData(page, pageSize);
                },
                showTotal: (total: string | number) => `共${total}条`
            },
        };
    }
    //=====================================列表数据====================================//
    public getTableData = (pageNum: number = this.props.pagination && this.props.pagination.defaultCurrent ? this.props.pagination.defaultCurrent : 1, pageSize = this.props.pagination && this.props.pagination.defaultPageSize ? this.props.pagination.defaultPageSize : 10): void => {
        this.setState({
            loading: true,
        });
        axios
            .get(this.props.requestUrl, { params: { pageNum, pageSize } })
            .then((res: any) => {
                this.setState((state) => {
                    state.pagination.total = res.total;
                    state.pagination.current = pageNum;
                    state.pagination.pageSize = pageSize;
                    return {
                        tableData: res.data.map((item: any, index: any) =>
                            Object.assign(item, { index: index + 1 })
                        ),
                        pagination: state.pagination,
                    };
                });
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };
    //=====================================将父级分页参数写入到组件内部====================================//
    public handleSetPaginationState = () => {
        return new Promise((reslove, reject) => {
            if (this.props.pagination) {
                this.setState({
                    pagination: this.props.pagination
                }, () => {
                    reslove()
                })
            } else {
                reslove()
            }
        })
    }
    async componentDidMount() {
        await this.handleSetPaginationState(); //将父级自定也分页写入到本组件state
        this.getTableData();
    }
    render() {
        return (
            <Table
                loading={this.state.loading || this.props.loading}
                dataSource={this.state.tableData}
                pagination={this.props.pagination === false ? false : this.state.pagination}
                rowClassName={this.props.rowClassName}
                bordered={this.props.bordered ? this.props.bordered : false}
                columns={this.props.columns}
                footer={this.props.footer}
                rowKey={this.props.rowKey}
                rowSelection={this.props.rowSelection}
                showHeader={this.props.showHeader}
                size={this.props.size ? this.props.size : "middle"}
                tableLayout={this.props.tableLayout}
            >
                {this.props.children ? this.props.children : ""}
            </Table>
        );
    }
}
