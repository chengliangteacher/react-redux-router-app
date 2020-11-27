import { Row } from 'antd';
import React from 'react';
import GgridCol from '../../../components/g-grid-col';

//=====================================state数据类型====================================//
interface stateTypes {
  count: number;
}

export default class TsetComponent extends React.Component<any, stateTypes> {
  public timer: any = null;
  public refs: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      count: 1,
    };
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
      </div>
    );
  }
}
