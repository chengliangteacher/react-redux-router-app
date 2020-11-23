import React from 'react';
export default class Bone extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  componentDidCatch() {
    console.log('componentDidCatch');
  }
  shouldComponentUpdate(props: any, nextprops: any) {
    console.log('shouldComponentUpdate', props);
    return false;
  }
  render() {
    return <div>page-Bone</div>;
  }
}
