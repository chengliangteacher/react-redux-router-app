import React from 'react';
import GUpload from '../../../components/g-upload';
export default class TestUpload extends React.Component {
  render() {
    return (
      <div>
        <GUpload />
        <img
          src="http://localhost:3009/uploads/kkkkk.png"
          alt="logo"
          style={{ width: '200px' }}
        />
      </div>
    );
  }
}
