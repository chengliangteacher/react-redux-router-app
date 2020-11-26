/* 
    @description  图片上传组件
    @autor        cheng liang
    @create       2020-11-26 10:52"
*/
import { Upload, message } from 'antd';
import React from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { developNodeImgUrl } from '../api/ApiIp';

interface propTypes {
  action?: string; //--------上传的地址
  showUploadList?: boolean; //--------是否展示文件列表
  disabled?: boolean; //--------是否禁用按钮
  multiple?: boolean; //--------是否多选
  withCredentials?: boolean; //--------是否携带cookies
  defaultFileList?: Array<any>; //--------默认上传列表
  listType?: 'picture' | 'text' | 'picture-card' | undefined; //--------上传列表的内建样式
  fileList?: Array<any>; //--------上传列表
  handleListenUploadImg: (data: any) => void; //--------监听上传成功文件方法并返回值
  singleFile?: any; //--------单文件上传成功的文件对象
  size?: number; //--------图片大小最大值
  maxNum?: number; //--------上传图片数量
}
interface stateTypes {
  loading: boolean;
  singleFile: any;
  fileList: Array<any>; //--------上传列表
}

export default class GUploadImg extends React.Component<propTypes, stateTypes> {
  constructor(props: propTypes) {
    super(props);
    this.state = {
      loading: false, //-------上传图片加载圈圈
      singleFile: null, //-------单图上传的文件
      fileList: [], //-------上传列表
    };
  }
  /* 
        @description  监听上传图片变化监听
        @autor        cheng liang
        @create       2020-11-26 10:36"
        @params       info = { file, filelist }
        @return       
    */
  public handleOnchange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
      });
    }
    if (info.file.status === 'done') {
      this.setState(
        {
          loading: false,
          singleFile: info.file,
          fileList: info.fileList,
        },
        () => {
          this.props.handleListenUploadImg({
            data: this.props.showUploadList
              ? this.state.fileList
              : this.state.singleFile,
          });
        }
      );
    }
  };
  /* 
        @description  上传文件之前的钩子
        @autor        cheng liang
        @create       2020-11-26 10:35"
        @params       file: 当前上传的图片对象 fileList: 上传成功的文件列表
        @return       
    */
  public beforeUpload = (file: File, fileList: Array<File>): boolean => {
    if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg'
    ) {
      message.error('请选择<.png, .jpeg, .jpg>类型的图片');
      return false;
    }
    if (this.props.size) {
      if (file.size > this.props.size) {
        message.error('文件大小不能超过100kb');
        return false;
      }
    }
    if (this.props.maxNum) {
      if (this.state.fileList.length >= this.props.maxNum) {
        message.error(`上传文件数量不能超过${this.props.maxNum}张`);
        return false;
      }
    }
    return true;
  };
  /* 
        @description  自定义预览
        @autor        cheng liang
        @create       2020-11-26 10:35"
        @params       当前点击预览的图片对象
        @return       
    */
  public handlePreview = (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = developNodeImgUrl + file.name;
    }
    window.open(file.preview);
  };
  /* 
        @description  自定义删除
        @autor        cheng liang
        @create       2020-11-26 10:34"
        @params       file: 当前点击删除的图片对象
        @return       boolean
    */
  public handleOnRemove = (file: any): boolean => {
    this.setState(
      (state) => {
        return {
          fileList: state.fileList
            ? state.fileList.filter((item) => item.uid !== file.uid)
            : state.fileList,
        };
      },
      () => {
        if (this.props.showUploadList) {
          this.props.handleListenUploadImg({ data: this.state.fileList });
        }
      }
    );
    return true;
  };
  componentDidUpdate(prevProps: propTypes, prevState: stateTypes) {
    if (prevProps.fileList) {
      if (prevProps.fileList !== this.props.fileList) {
        if (this.props.fileList) {
          this.setState({
            fileList: this.props.fileList,
          });
        }
      }
      if (prevProps.singleFile) {
        if (prevProps.singleFile !== this.props.singleFile) {
          this.setState({
            singleFile: this.props.singleFile,
          });
        }
      }
    }
  }
  componentDidMount() {
    //=====================================单图片上传需要将默认值映射====================================//
    if (this.props.singleFile) {
      this.setState({
        singleFile: this.props.singleFile,
      });
    }
  }
  render() {
    const {
      action,
      showUploadList,
      disabled,
      multiple,
      withCredentials,
      defaultFileList,
      listType,
    } = this.props;
    const { loading, singleFile, fileList } = this.state;
    const uploadButton =
      singleFile && !showUploadList ? (
        <img
          src={developNodeImgUrl + singleFile.name}
          className="w-100"
          alt="logo"
        />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    return (
      <Upload
        name="file"
        accept="image/png, image/jpeg, image/jpg"
        beforeUpload={this.beforeUpload}
        headers={{ Authorization: sessionStorage.token || '' }}
        listType={listType || 'picture-card'}
        defaultFileList={defaultFileList || []}
        showUploadList={showUploadList || false}
        disabled={disabled || loading}
        action={action || '/api/upload'}
        fileList={fileList}
        multiple={multiple}
        onChange={(info: any) => {
          this.handleOnchange(info);
        }}
        onPreview={this.handlePreview}
        onRemove={this.handleOnRemove}
        withCredentials={withCredentials}
      >
        {uploadButton}
      </Upload>
    );
  }
}
