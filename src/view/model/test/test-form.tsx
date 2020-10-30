import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Radio,
  Divider,
  Button,
  TreeSelect,
  Cascader,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import axios from '../../../api';
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface props {
  foodTypesData: any;
  planTypesData: any;
  areaData: any;
  areaAllData: any;
  planTypesAllData: any;
}
interface stateTypes {
  organizationsData: any;
  companysData: any;
  regulationPlansData: any;
  feeTemplatesData: any;
  loading: boolean;
  feeTemplateLoading: boolean;
}
class TestForm extends React.Component<props, stateTypes> {
  public formInfo: any = {
    amount: 1,
    areaId: [],
    detectionCompanyId: null,
    endDate: '',
    feeTemplateId: null,
    foodTypeId: null,
    name: '',
    planClassify: 1,
    planTypeId: [],
    ruleId: null,
    sampleCompanyId: null,
    specialWay: 0,
    taskSourceId: null,
    year: '',
  };
  public form: any;
  constructor(props: props) {
    super(props);
    this.state = {
      organizationsData: [],
      companysData: [],
      regulationPlansData: [],
      feeTemplatesData: [],
      loading: false,
      feeTemplateLoading: false,
    };
    this.form = React.createRef();
  }
  //=====================================请求枚举数据====================================//
  getPromiseData = () => {
    this.setState({
      loading: true,
    });
    const organizations = axios.get('/plan/organizations');
    const companys = axios.get('/plan/companys');
    const regulationPlans = axios.get('/regulationPlans');
    Promise.allSettled([organizations, companys, regulationPlans]).then(
      (res) => {
        const data = res.map((item) => {
          let temp;
          if (item.status === 'fulfilled') {
            temp = item.value.data;
          }
          return temp;
        });
        this.setState({
          organizationsData: data[0],
          companysData: data[1],
          regulationPlansData: data[2],
          loading: false,
        });
      }
    );
  };
  //=====================================inputchange====================================//
  handleInputChange = (e: any, key: string) => {
    this.formInfo[key] = e.target.value;
  };
  //=====================================selectchange====================================//
  handleSelectChange = (value: any, key: string) => {
    this.formInfo[key] = value;
    if (
      key === 'sampleCompanyId' ||
      key === 'detectionCompanyId' ||
      key === 'taskSourceId' ||
      key === 'planTypeId'
    ) {
      this.getFeeTemplatesData();
    }
  };
  //=====================================获取价格模版数据====================================//
  getFeeTemplatesData = () => {
    if (
      !this.formInfo.sampleCompanyId ||
      !this.formInfo.detectionCompanyId ||
      !this.formInfo.taskSourceId ||
      !this.formInfo.planTypeId.length
    ) {
      this.setState({
        feeTemplatesData: [],
      });
      this.formInfo.feeTemplateId = null;
      this.form.current.setFieldsValue({ feeTemplateId: null });
      return;
    }
    this.setState({
      feeTemplateLoading: true,
    });
    const params = {
      sampleCompanyId: this.formInfo.sampleCompanyId,
      detectionCompanyId: this.formInfo.detectionCompanyId,
      taskSourceId: this.formInfo.taskSourceId,
      planSmallTypeId: this.formInfo.planTypeId[2],
    };
    axios
      .get('/plan/getFeeTemplates', { params })
      .then((res) => {
        this.setState({
          feeTemplatesData: res.data,
        });
      })
      .finally(() => {
        this.setState({
          feeTemplateLoading: false,
        });
      });
  };
  //=====================================提交表单====================================//
  handleSave = () => {
    this.form.current
      .validateFields()
      .then((value: any) => {
        this.handleRequestSave();
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: '表单提交失败',
          description: '请完善表单填写后再进行保存操作',
          duration: 10,
        });
      });
  };
  //=====================================重置表单====================================//
  handleReset = () => {
    this.form.current.resetFields();
    this.formInfo = {
      amount: 1,
      areaId: [],
      detectionCompanyId: null,
      endDate: '',
      feeTemplateId: null,
      foodTypeId: null,
      name: '',
      planClassify: 1,
      planTypeId: [],
      ruleId: null,
      sampleCompanyId: null,
      specialWay: 0,
      taskSourceId: null,
      year: '',
    };
  };
  //=====================================服务器保存====================================//
  handleRequestSave = () => {
    this.setState({
      loading: true,
    });
    const areaIds =
      this.formInfo.areaId[0] === 3
        ? this.props.areaData[0].children.map((item: any) => item.id).join(',')
        : this.formInfo.areaId.join(',');
    const areaNames = areaIds
      .split(',')
      .map((item: any) => {
        let name = '';
        this.props.areaAllData.forEach((val: any) => {
          if (Number(val.id) === Number(item)) {
            name = val.name;
          }
        });
        return name;
      })
      .join(',');
    const data = {
      amount: this.formInfo.amount,
      areaId: 3,
      areaIds,
      areaNames,
      detectionCompanyId: this.formInfo.detectionCompanyId,
      detectionCompanyName: this.state.companysData.filter(
        (item: any) => item.id === this.formInfo.detectionCompanyId
      )[0].companyName,
      endDate: this.formInfo.endDate,
      feeTemplateId: this.formInfo.feeTemplateId,
      foodTypeId: this.formInfo.foodTypeId,
      foodTypeName: this.props.foodTypesData.filter(
        (item: any) => item.id === this.formInfo.foodTypeId
      )[0].name,
      name: this.formInfo.name,
      planClassify: this.formInfo.planClassify,
      planSmallTypeCode: this.props.planTypesAllData.filter(
        (item: any) => item.id === this.formInfo.planTypeId[1]
      )[0].code,
      planSmallTypeId: this.formInfo.planTypeId[1],
      planSmallTypeName: this.props.planTypesAllData.filter(
        (item: any) => item.id === this.formInfo.planTypeId[1]
      )[0].name,
      planTypeId: this.formInfo.planTypeId[0],
      planTypeName: this.props.planTypesAllData.filter(
        (item: any) => item.id === this.formInfo.planTypeId[0]
      )[0].name,
      ruleId: this.formInfo.ruleId,
      sampleCompanyId: this.formInfo.sampleCompanyId,
      sampleCompanyName: this.state.companysData.filter(
        (item: any) => item.id === this.formInfo.sampleCompanyId
      )[0].companyName,
      specialWay: this.formInfo.specialWay,
      taskSource: this.state.organizationsData.filter(
        (item: any) => item.id === this.formInfo.taskSourceId
      )[0].orgName,
      taskSourceId: this.formInfo.taskSourceId,
      year: this.formInfo.year,
    };
    axios
      .post('/plans', data)
      .then((res) => {})
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.getPromiseData();
  }
  render() {
    const { foodTypesData, planTypesData, areaData } = this.props;
    return (
      <div>
        <Form
          ref={this.form}
          labelAlign="left"
          {...formItemLayout}
          initialValues={{ amount: 1, planClassify: 1, specialWay: 0 }}
          layout="horizontal"
          scrollToFirstError={true}
        >
          <Row gutter={10}>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划名称"
                name="name"
                rules={[{ required: true, message: '请输入计划名称' }]}
              >
                <Input
                  disabled={this.state.loading}
                  onChange={(e) => this.handleInputChange(e, 'name')}
                  allowClear
                  placeholder="请输入计划名称"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="食品类型"
                name="foodTypeId"
                rules={[{ required: true, message: '请选择食品类型' }]}
              >
                <Select
                  disabled={this.state.loading}
                  onChange={(value) =>
                    this.handleSelectChange(value, 'foodTypeId')
                  }
                  allowClear
                  placeholder="请选择食品类型"
                >
                  {foodTypesData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划类型"
                name="planTypeId"
                rules={[{ required: true, message: '请选择计划类型' }]}
              >
                <Cascader
                  options={planTypesData}
                  className="w-100"
                  onChange={(value) =>
                    this.handleSelectChange(value, 'planTypeId')
                  }
                  placeholder="请选择计划类型"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划年份"
                name="year"
                rules={[{ required: true, message: '请选择计划年份' }]}
              >
                <DatePicker
                  disabled={this.state.loading}
                  picker="year"
                  onChange={(data, value) =>
                    this.handleSelectChange(value, 'year')
                  }
                  allowClear
                  className="w-100"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划地区"
                name="areaId"
                rules={[{ required: true, message: '请选择计划地区' }]}
              >
                <TreeSelect
                  disabled={this.state.loading}
                  treeData={areaData}
                  onChange={(value) => this.handleSelectChange(value, 'areaId')}
                  treeCheckable={true}
                  showCheckedStrategy={SHOW_PARENT}
                  placeholder="请选择计划地区"
                  maxTagCount={2}
                  className="w-100"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划截止时间"
                name="endDate"
                rules={[{ required: true, message: '请选择计划截止时间' }]}
              >
                <DatePicker
                  disabled={this.state.loading}
                  onChange={(date, value) =>
                    this.handleSelectChange(value, 'endDate')
                  }
                  format="YYYY-MM-DD hh:mm:ss"
                  showTime
                  className="w-100"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="计划总批次"
                name="amount"
                rules={[{ required: true, message: '请输入计划总批次' }]}
              >
                <InputNumber
                  disabled={this.state.loading}
                  min={1}
                  onChange={(value) => this.handleSelectChange(value, 'amount')}
                  className="w-100"
                />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="抽样机构"
                name="sampleCompanyId"
                rules={[{ required: true, message: '请选择抽样机构' }]}
              >
                <Select
                  disabled={this.state.loading}
                  allowClear
                  onChange={(value) =>
                    this.handleSelectChange(value, 'sampleCompanyId')
                  }
                  placeholder="请选择抽样机构"
                  className="w-100"
                >
                  {this.state.companysData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.companyName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="检验机构"
                name="detectionCompanyId"
                rules={[{ required: true, message: '请选择检验机构' }]}
              >
                <Select
                  disabled={this.state.loading}
                  allowClear
                  onChange={(value) =>
                    this.handleSelectChange(value, 'detectionCompanyId')
                  }
                  placeholder="请选择检验机构"
                  className="w-100"
                >
                  {this.state.companysData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.companyName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="任务来源"
                name="taskSourceId"
                rules={[{ required: true, message: '请选择任务来源' }]}
              >
                <Select
                  disabled={this.state.loading}
                  allowClear
                  onChange={(value) =>
                    this.handleSelectChange(value, 'taskSourceId')
                  }
                  placeholder="请选择任务来源"
                  className="w-100"
                >
                  {this.state.organizationsData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.orgName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="制定类型"
                name="planClassify"
                rules={[{ required: true, message: '请选择制定类型' }]}
              >
                <Radio.Group
                  disabled={this.state.loading}
                  onChange={(e) => this.handleInputChange(e, 'planClassify')}
                  className="w-100"
                >
                  <Radio value={1}>食品分类</Radio>
                  <Radio value={2}>受检单位</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="特殊下达"
                name="specialWay"
                rules={[{ required: true, message: '请选择特殊下达' }]}
              >
                <Radio.Group
                  disabled={this.state.loading}
                  onChange={(e) => this.handleInputChange(e, 'specialWay')}
                  className="w-100"
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="校验规则"
                name="ruleId"
                rules={[{ required: true, message: '请选择校验规则' }]}
              >
                <Select
                  disabled={this.state.loading}
                  allowClear
                  onChange={(value) => this.handleSelectChange(value, 'ruleId')}
                  placeholder="请选择校验规则"
                  className="w-100"
                >
                  {this.state.regulationPlansData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="价格模版"
                name="feeTemplateId"
                rules={[{ required: true, message: '请选择价格模版' }]}
              >
                <Select
                  disabled={
                    this.state.loading ||
                    this.state.feeTemplateLoading ||
                    !this.state.feeTemplatesData.length
                  }
                  allowClear
                  onChange={(value) =>
                    this.handleSelectChange(value, 'feeTemplateId')
                  }
                  placeholder="请选择价格模版"
                >
                  {this.state.feeTemplatesData.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="right">
            <Button
              loading={this.state.loading}
              type="primary"
              className="mr-1"
              onClick={this.handleSave}
            >
              保存
            </Button>
            <Button
              htmlType="button"
              loading={this.state.loading}
              onClick={this.handleReset}
            >
              重置
            </Button>
          </Divider>
        </Form>
      </div>
    );
  }
}
//=====================================将redux中数据添加进props中====================================//
const mapStateToProps = ({ layout }: any) => {
  const data = layout.areaData
    .filter((item: any) => item.id === 3)
    .map((item: any) =>
      Object.assign(item, {
        title: item.name,
        key: item.id,
        children: [],
        value: item.id,
      })
    );
  layout.areaData.forEach((item: any) => {
    if (item.parentId === 3) {
      data[0].children.push(
        Object.assign(item, { title: item.name, value: item.id, key: item.id })
      );
    }
  });
  const data2 = layout.planTypesData
    .filter((item: any) => !item.parentId)
    .map((item: any) =>
      Object.assign(item, { value: item.id, label: item.name, children: [] })
    )
    .map((item: any) => {
      layout.planTypesData.forEach((val: any) => {
        if (val.parentId === item.id) {
          item.children.push(
            Object.assign(val, { value: val.id, label: val.name })
          );
        }
      });
      return item;
    });
  return {
    areaData: data,
    areaAllData: layout.areaData,
    foodTypesData: layout.foodTypesData,
    planTypesData: data2,
    planTypesAllData: layout.planTypesData,
  };
};
export default connect(mapStateToProps)(TestForm);
