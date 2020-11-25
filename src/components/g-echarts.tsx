import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

interface props {
  option: any;
  width: string;
  height: string;
}

export default class GEcharts extends React.Component<props> {
  public echartsRef: any;
  public echartsInstance: any;
  componentDidMount() {
    this.echartsInstance = echarts.init(this.echartsRef);
    this.echartsInstance.setOption(this.props.option);
    this.handleChangeSize();
  }
  //=====================================监听页面宽高缩放改变实例大小====================================//
  handleChangeSize() {
    window.addEventListener('resize', () => {
      this.echartsInstance.resize();
    });
  }
  render() {
    const { width, height } = this.props;
    return (
      <div ref={(ref) => (this.echartsRef = ref)} style={{ width, height }}>
        g-echarts
      </div>
    );
  }
}
