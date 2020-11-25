import { Upload } from 'antd';
import React from 'react';

export default class GUpload extends React.Component {
  public handleOnchange = (info: any) => {
    console.log(1111, info);
  };
  render() {
    const uploadButton = (
      <div>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="file"
        headers={{ Authorization: sessionStorage.token }}
        listType="picture-card"
        showUploadList
        action="/api/upload"
        onChange={(info: any) => {
          this.handleOnchange(info);
        }}
      >
        {uploadButton}
      </Upload>
    );
  }
}
