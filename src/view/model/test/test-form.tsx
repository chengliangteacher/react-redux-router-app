import React, { useEffect, useState } from 'react';
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
import { BaseDataTypes } from '../../../index.d';
import { Store } from 'antd/lib/form/interface';
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface companyItemType {
  id: number;
  companyName: string;
}
interface organItemType {
  id: number;
  orgName: string;
}
interface props {
  foodTypesData: BaseDataTypes[];
  planTypesData: BaseDataTypes[];
  areaData: BaseDataTypes[];
  areaAllData: BaseDataTypes[];
  planTypesAllData: BaseDataTypes[];
}
interface stateTypes {
  organizationsData: organItemType[];
  companysData: companyItemType[];
  regulationPlansData: BaseDataTypes[];
  feeTemplatesData: BaseDataTypes[];
  loading: boolean;
  feeTemplateLoading: boolean;
}
interface formTypes {
  amount: number | null;
  areaId: number[];
  detectionCompanyId: number | null;
  endDate: string;
  feeTemplateId: number | null;
  foodTypeId: number | null;
  name: string;
  planClassify: number;
  planTypeId: number[];
  ruleId: number | null;
  sampleCompanyId: number | null;
  specialWay: number;
  taskSourceId: number | null;
  year: string;
}
function TestForm(props: props) {
  const [organizationsData, setOrganizationsData] = useState([]);
  const [companysData, setCompanysData] = useState([]);
  const [regulationPlansData, setRegulationPlansData] = useState([]);
  const [feeTemplatesData, setFeeTemplatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feeTemplateLoading, setFeeTemplateLoading] = useState(false);
  let formInfo: any = {
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
  let form: any = React.createRef();
  //=====================================请求枚举数据====================================//
  let getPromiseData = () => {
    setLoading(true);
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
        setOrganizationsData(data[0]);
        setCompanysData(data[1]);
        setRegulationPlansData(data[2]);
        setLoading(false);
      }
    );
  };
  //=====================================inputchange====================================//
  let handleInputChange = (e: any, key: string) => {
    formInfo[key] = e.target.value;
  };
  //=====================================selectchange====================================//
  let handleSelectChange = (value: any, key: string) => {
    formInfo[key] = value;
    if (
      key === 'sampleCompanyId' ||
      key === 'detectionCompanyId' ||
      key === 'taskSourceId' ||
      key === 'planTypeId'
    ) {
      getFeeTemplatesData();
    }
  };
  //=====================================获取价格模版数据====================================//
  let getFeeTemplatesData = () => {
    if (
      !formInfo.sampleCompanyId ||
      !formInfo.detectionCompanyId ||
      !formInfo.taskSourceId ||
      !formInfo.planTypeId.length
    ) {
      setFeeTemplatesData([]);
      formInfo.feeTemplateId = null;
      form.current.setFieldsValue({ feeTemplateId: null });
      return;
    }
    setFeeTemplateLoading(true);
    const params = {
      sampleCompanyId: formInfo.sampleCompanyId,
      detectionCompanyId: formInfo.detectionCompanyId,
      taskSourceId: formInfo.taskSourceId,
      planSmallTypeId: formInfo.planTypeId[2],
    };
    axios
      .get('/plan/getFeeTemplates', { params })
      .then((res) => {
        setFeeTemplatesData(res.data);
      })
      .finally(() => {
        setFeeTemplateLoading(false);
      });
  };
  //=====================================提交表单====================================//
  let handleSave = () => {
    form.current
      .validateFields()
      .then(() => {
        handleRequestSave();
      })
      .catch(() => {
        notification.error({
          message: '表单提交失败',
          description: '请完善表单填写后再进行保存操作',
          duration: 10,
        });
      });
  };
  //=====================================重置表单====================================//
  let handleReset = () => {
    form.current.resetFields();
    formInfo = {
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
  let handleRequestSave = () => {
    setLoading(true);
    let areaIds: string = '';
    if (props.areaData[0].children) {
      areaIds =
        formInfo.areaId[0] === 3
          ? props.areaData[0].children
              .map((item: BaseDataTypes) => item.id)
              .join(',')
          : formInfo.areaId.join(',');
    }
    const areaNames = areaIds
      .split(',')
      .map((item: string) => {
        let name = '';
        props.areaAllData.forEach((val: BaseDataTypes) => {
          if (Number(val.id) === Number(item)) {
            name = val.name;
          }
        });
        return name;
      })
      .join(',');
    let detectionCompanyName = '';
    companysData.forEach((item: companyItemType) => {
      if (item.id === formInfo.detectionCompanyId) {
        detectionCompanyName = item.companyName;
      }
    });
    let sampleCompanyName = '';
    companysData.forEach((item: companyItemType) => {
      if (item.id === formInfo.sampleCompanyId) {
        sampleCompanyName = item.companyName;
      }
    });
    let taskSource = '';
    organizationsData.forEach((item: organItemType) => {
      if (item.id === formInfo.taskSourceId) {
        taskSource = item.orgName;
      }
    });
    const data = {
      amount: formInfo.amount,
      areaId: 3,
      areaIds,
      areaNames,
      detectionCompanyId: formInfo.detectionCompanyId,
      detectionCompanyName,
      endDate: formInfo.endDate,
      feeTemplateId: formInfo.feeTemplateId,
      foodTypeId: formInfo.foodTypeId,
      foodTypeName: props.foodTypesData.filter(
        (item) => item.id === formInfo.foodTypeId
      )[0].name,
      name: formInfo.name,
      planClassify: formInfo.planClassify,
      planSmallTypeCode: props.planTypesAllData.filter(
        (item) => item.id === formInfo.planTypeId[1]
      )[0].code,
      planSmallTypeId: formInfo.planTypeId[1],
      planSmallTypeName: props.planTypesAllData.filter(
        (item) => item.id === formInfo.planTypeId[1]
      )[0].name,
      planTypeId: formInfo.planTypeId[0],
      planTypeName: props.planTypesAllData.filter(
        (item) => item.id === formInfo.planTypeId[0]
      )[0].name,
      ruleId: formInfo.ruleId,
      sampleCompanyId: formInfo.sampleCompanyId,
      sampleCompanyName,
      specialWay: formInfo.specialWay,
      taskSource,
      taskSourceId: formInfo.taskSourceId,
      year: formInfo.year,
    };
    axios
      .post('/plans', data)
      .then((res) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getPromiseData();
  }, []);
  const { foodTypesData, planTypesData, areaData } = props;
  return (
    <div>
      <Form
        ref={form}
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
                disabled={loading}
                onChange={(e) => handleInputChange(e, 'name')}
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
                disabled={loading}
                onChange={(value) => handleSelectChange(value, 'foodTypeId')}
                allowClear
                placeholder="请选择食品类型"
              >
                {foodTypesData.map((item: BaseDataTypes) => {
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
                onChange={(value) => handleSelectChange(value, 'planTypeId')}
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
                disabled={loading}
                picker="year"
                onChange={(data, value) => handleSelectChange(value, 'year')}
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
                disabled={loading}
                treeData={areaData}
                onChange={(value) => handleSelectChange(value, 'areaId')}
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
                disabled={loading}
                onChange={(date, value) => handleSelectChange(value, 'endDate')}
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
                disabled={loading}
                min={1}
                onChange={(value) => handleSelectChange(value, 'amount')}
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
                disabled={loading}
                allowClear
                onChange={(value) =>
                  handleSelectChange(value, 'sampleCompanyId')
                }
                placeholder="请选择抽样机构"
                className="w-100"
              >
                {companysData.map((item: companyItemType) => {
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
                disabled={loading}
                allowClear
                onChange={(value) =>
                  handleSelectChange(value, 'detectionCompanyId')
                }
                placeholder="请选择检验机构"
                className="w-100"
              >
                {companysData.map((item: companyItemType) => {
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
                disabled={loading}
                allowClear
                onChange={(value) => handleSelectChange(value, 'taskSourceId')}
                placeholder="请选择任务来源"
                className="w-100"
              >
                {organizationsData.map((item: organItemType) => {
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
                disabled={loading}
                onChange={(e) => handleInputChange(e, 'planClassify')}
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
                disabled={loading}
                onChange={(e) => handleInputChange(e, 'specialWay')}
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
                disabled={loading}
                allowClear
                onChange={(value) => handleSelectChange(value, 'ruleId')}
                placeholder="请选择校验规则"
                className="w-100"
              >
                {regulationPlansData.map((item: BaseDataTypes) => {
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
                  loading || feeTemplateLoading || !feeTemplatesData.length
                }
                allowClear
                onChange={(value) => handleSelectChange(value, 'feeTemplateId')}
                placeholder="请选择价格模版"
              >
                {feeTemplatesData.map((item: BaseDataTypes) => {
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
            loading={loading}
            type="primary"
            className="mr-1"
            onClick={handleSave}
          >
            保存
          </Button>
          <Button htmlType="button" loading={loading} onClick={handleReset}>
            重置
          </Button>
        </Divider>
      </Form>
    </div>
  );
}
//=====================================将redux中数据添加进props中====================================//
const mapStateToProps = ({ layout }: Store) => {
  const data = layout.areaData
    .filter((item: BaseDataTypes) => item.id === 3)
    .map((item: BaseDataTypes) =>
      Object.assign(item, {
        title: item.name,
        key: item.id,
        children: [],
        value: item.id,
      })
    );
  layout.areaData.forEach((item: BaseDataTypes) => {
    if (item.parentId === 3) {
      data[0].children.push(
        Object.assign(item, { title: item.name, value: item.id, key: item.id })
      );
    }
  });
  const data2 = layout.planTypesData
    .filter((item: BaseDataTypes) => !item.parentId)
    .map((item: BaseDataTypes) =>
      Object.assign(item, { value: item.id, label: item.name, children: [] })
    )
    .map((item: BaseDataTypes) => {
      layout.planTypesData.forEach((val: BaseDataTypes) => {
        if (val.parentId === item.id && item.children) {
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
