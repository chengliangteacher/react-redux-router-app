import React from 'react';
import GUploadImg from '../../../components/g-upload-img';
interface uploadTypes {
  action: string;
  showUploadList: boolean;
  disabled: boolean;
  multiple: boolean;
  withCredentials: boolean;
  defaultFileList: Array<any> | Array<never>;
  listType: 'picture' | 'text' | 'picture-card' | undefined;
  fileList: Array<any>;
  singleFile: File | null;
  size: number;
  maxNum: number;
}
interface stateTypes {
  uploadParams: uploadTypes;
}
export default class TestUpload extends React.Component<any, stateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadParams: {
        action: '/api/upload',
        showUploadList: true,
        disabled: false,
        multiple: true,
        withCredentials: false,
        defaultFileList: [],
        listType: 'picture-card',
        fileList: [],
        singleFile: null,
        size: 102400,
        maxNum: 3,
      },
    };
  }
  //=====================================监听图片上传返回值====================================//
  public handleListenUploadImg = (data: any) => {
    console.log(data);
  };
  render() {
    return (
      <div>
        <GUploadImg
          {...this.state.uploadParams}
          handleListenUploadImg={this.handleListenUploadImg}
        />
      </div>
    );
  }
}
