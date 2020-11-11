/* 
    @description  右键菜单
    @autor        cheng liang
    @create       2020-10-27 15:44"
    @params       
    @return       
*/
import React, { Component } from 'react';
import { routerItemTypes } from '../index.d';

interface props {
  handleCloseTag: (router: routerItemTypes) => void;
  handleCloseOtherTag: (router: routerItemTypes) => void;
  handleCloseAllTag: () => void;
}
interface statetype {
  visible: boolean;
  currentRouter: routerItemTypes;
}
class RightClickContextMenu extends Component<props, statetype> {
  public root: any;
  constructor(props: props) {
    super(props);
    this.state = {
      visible: false, // 控制右键菜单显示
      currentRouter: {
        pathname: '',
        id: 0,
      }, // 当前点击tag路由信息
    };
  }

  componentDidMount() {
    //=====================================添加右键点击、点击事件监听====================================//
    const element = document.getElementById('tag-view') as HTMLElement;
    element.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    //=====================================移除事件监听====================================//
    const element = document.getElementById('tag-view') as HTMLElement;
    element.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('click', this.handleClick);
  }

  //=====================================右键菜单事件====================================//
  handleContextMenu = (event: any) => {
    if (event.target.tagName !== 'A') return;
    event.preventDefault();
    if (event.target.getAttribute('data-item')) {
      var currentRouter = JSON.parse(event.target.getAttribute('data-item'));
    }
    this.setState({
      visible: true,
      currentRouter,
    });
    //=====================================clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离====================================//
    const clickX = event.clientX;
    const clickY = event.clientY;
    //=====================================window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度====================================//
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    //=====================================获取自定义菜单的宽度/高度====================================//
    const rootW = this.root.offsetWidth ? this.root.offsetWidth : 0;
    const rootH = this.root.offsetHeight ? this.root.offsetHeight : 0;

    //=====================================right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。====================================//
    //=====================================bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。====================================//
    const right = screenW - clickX > rootW;
    const left = !right;
    const bottom = screenH - clickY > rootH;
    const top = !bottom;

    if (right) {
      this.root.style.left = `${clickX}px`;
    }

    if (left) {
      this.root.style.left = `${clickX - rootW}px`;
    }

    if (bottom) {
      this.root.style.top = `${clickY}px`;
    }
    if (top) {
      this.root.style.top = `${clickY - rootH}px`;
    }
  };

  //=====================================鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示====================================//
  handleClick = () => {
    const { visible } = this.state;
    if (visible) {
      this.setState({ visible: false });
    }
  };

  render() {
    const { visible } = this.state;

    return (
      visible && (
        <div ref={(ref) => (this.root = ref)} className="contextMenu-wrap">
          <div
            className="contextMenu-option"
            onClick={() => this.props.handleCloseTag(this.state.currentRouter)}
          >
            关闭当前
          </div>
          <div
            className="contextMenu-option"
            onClick={() =>
              this.props.handleCloseOtherTag(this.state.currentRouter)
            }
          >
            关闭其它
          </div>
          <div
            className="contextMenu-option"
            onClick={() => this.props.handleCloseAllTag()}
          >
            关闭所有
          </div>
        </div>
      )
    );
  }
}

export default RightClickContextMenu;
