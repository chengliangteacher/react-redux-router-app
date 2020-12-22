import React, { useEffect, useState } from 'react';
import {
    UsergroupDeleteOutlined,
    MessageOutlined,
    MoneyCollectOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Card, Col, Progress, Row, Statistic, Table } from 'antd';
import GEcharts from '../../components/g-echarts';
export default function Home() {
    const [titleLoading, userTitleLoading] = useState(true);
    const [echartsLineOption] = useState({
        title: {
            show: false,
            text: 'ECharts 入门示例',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            },
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#3e8dfa',
                },
            },
            axisLabel: {
                show: true,
                color: '#3e8dfa',
            },
            axisTick: {
                show: false,
                interval: 1,
            },
            boundaryGap: false,
        },
        grid: {
            show: true,
            left: 40,
            right: 10,
            top: 30,
        },
        yAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#3e8dfa',
                },
            },
            axisLabel: {
                show: true,
                color: '#3e8dfa',
            },
            axisTick: {
                show: false,
            },
        },
        legend: {
            type: 'plain',
            show: true,
            left: 'center',
            top: 'top',
        },
        series: [
            {
                name: 'actual',
                type: 'line',
                data: [0, 20, 36, 10, 10, 20, 8],
                itemStyle: {
                    color: '#f53a7b',
                },
            },
            {
                name: 'expected',
                type: 'line',
                data: [0, 40, 90, 100, 40, 90, 110],
                itemStyle: {
                    color: '#3e8dfa',
                },
                areaStyle: {},
            },
        ],
    });
    const [echartsRadarOption] = useState({
        // tooltip: {},
        legend: {
            show: true,
            type: 'plain',
            data: ['预算分配', '实际开销'],
            bottom: 0,
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    borderRadius: 3,
                    padding: [3, 5],
                },
            },
            nameGap: 5,
            indicator: [
                { name: 'sale', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Techology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 },
            ],
            splitArea: {
                show: true,
                areaStyle: {
                    color: '#cdc5ce',
                },
            },
        },
        series: [
            {
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                areaStyle: { normal: {} },
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配',
                        itemStyle: {
                            color: '#b6a2de',
                        },
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销',
                        itemStyle: {
                            color: '#40c0c1',
                        },
                    },
                ],
            },
        ],
    });
    const [echartsPieOption] = useState({
        tooltip: {
            trigger: 'item',
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['industries', 'Technology', 'Forex', 'Gold', 'Forecasts'],
        },
        color: ['#43c7c9', '#b6a2de', '#5ab1ef', '#f8b980', '#d87a80'],
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 110],
                roseType: 'area',
                data: [
                    { value: 10, name: 'industries' },
                    { value: 5, name: 'Technology' },
                    { value: 15, name: 'Forex' },
                    { value: 25, name: 'Gold' },
                    { value: 20, name: 'Forecasts' },
                ],
            },
        ],
    });
    const [echartsBarOption] = useState({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        color: ['#5ab1ef', '#b6a2de', '#43c7c9'],
        grid: {
            left: '0',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                data: [320, 302, 301, 334, 390, 330, 320],
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310],
            },
        ],
    });
    const dataSource = [
        {
            key: 1,
            order_no: 'dea259f4-90a2-18C4-ddD3-cde6c1',
            price: '¥5,501.69',
            status: 'pending',
        },
        {
            key: 2,
            order_no: 'cDB0ECEd-4f40-BFcb-9bA4-de0aEE',
            price: '¥14,207.05',
            status: 'pending',
        },
        {
            key: 3,
            order_no: '3eED1Eb6-6fA2-C50C-Bb46-dA1C3f',
            price: '¥4,500',
            status: 'success',
        },
        {
            key: 4,
            order_no: 'aD712C6C-08c9-cbAe-94b8-3ACDf8',
            price: '¥12,094.18',
            status: 'pending',
        },
        {
            key: 5,
            order_no: '6cb6bdf7-Bbac-DD04-2BC5-35436F',
            price: '¥11,768',
            status: 'success',
        },
        {
            key: 6,
            order_no: 'ef2Dc645-EbEc-f18C-8CC9-FFF566',
            price: '¥13,059',
            status: 'pending',
        },
        {
            key: 7,
            order_no: 'c81aDE18-73Af-cceB-2cb0-A94ad3',
            price: '¥9,114.3',
            status: 'success',
        },
        {
            key: 8,
            order_no: '5C1EE17f-Eeb6-079E-5B8A-3eD3F8',
            price: '¥3,559.68',
            status: 'success',
        },
    ];
    const columns = [
        {
            title: 'Order_No',
            dataIndex: 'order_no',
            key: 'order_no',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    useEffect(() => {
        userTitleLoading(false);
    }, []);
    return (
        <div>
            <div>
                <Row gutter={50}>
                    <Col className="mb-1" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                        <Card hoverable className="cursor-pointer">
                            <div className="d-flex align-center between">
                                <UsergroupDeleteOutlined style={{ fontSize: '40px' }} />
                                <div>
                                    <Statistic
                                        title="New Visits"
                                        value={102400}
                                        loading={titleLoading}
                                        groupSeparator=","
                                    ></Statistic>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                        <Card hoverable className="cursor-pointer">
                            <div className="d-flex align-center between">
                                <MessageOutlined style={{ fontSize: '40px' }} />
                                <div>
                                    <Statistic
                                        title="Messages"
                                        value={81212}
                                        loading={titleLoading}
                                        groupSeparator=","
                                    ></Statistic>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                        <Card hoverable className="cursor-pointer">
                            <div className="d-flex align-center between">
                                <MoneyCollectOutlined style={{ fontSize: '40px' }} />
                                <div>
                                    <Statistic
                                        title="Purchases"
                                        value={9280}
                                        loading={titleLoading}
                                        groupSeparator=","
                                    ></Statistic>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                        <Card hoverable className="cursor-pointer">
                            <div className="d-flex align-center between">
                                <ShoppingCartOutlined style={{ fontSize: '40px' }} />
                                <div>
                                    <Statistic
                                        title="Shoppings"
                                        value={13600}
                                        loading={titleLoading}
                                        groupSeparator=","
                                    ></Statistic>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Card hoverable className="mb-1">
                    <Row>
                        <Col span={24}>
                            <GEcharts
                                option={echartsLineOption}
                                width="100%"
                                height="350px"
                            ></GEcharts>
                        </Col>
                    </Row>
                </Card>
                <Row gutter={10}>
                    <Col className="mb-1" xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card hoverable>
                            <GEcharts
                                option={echartsRadarOption}
                                width="100%"
                                height="350px"
                            ></GEcharts>
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card hoverable>
                            <GEcharts
                                option={echartsPieOption}
                                width="100%"
                                height="350px"
                            ></GEcharts>
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card hoverable>
                            <GEcharts
                                option={echartsBarOption}
                                width="100%"
                                height="350px"
                            ></GEcharts>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col
                        className="mb-1"
                        xxl={20}
                        xl={20}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                    >
                        <Card hoverable>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                    <Col className="mb-1" xxl={4} xl={4} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                        >
                            <span>react</span>
                            <Progress percent={70} />
                            <span>typescript</span>
                            <Progress percent={18} />
                            <span>scss</span>
                            <Progress percent={12} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
