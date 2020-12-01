import React, { useState } from "react"
import { SettingOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Switch, Form } from 'antd';
import { connect } from "react-redux";
import { changeLayoutX } from "../../../redux/action/layout";
const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
  };
interface propTyps {
    dispatch: any;
    isLayoutX: boolean;
}
function SysSet(props: propTyps) {
    const [visible, setVisible] = useState(false)
    let sysRefs: any = null;
    let handleOnClose = () => {
        setVisible(false);
        sysRefs.style.right = "0";
    }
    //=====================================打开设置====================================//
    let handleOnOpen = () => {
        if (!visible) {
            sysRefs.style.right = "256px";
        } else {
            sysRefs.style.right = "0";
        }
        setVisible(!visible);
    }
    //=====================================改变布局====================================//
    let changeLayout = (val: boolean) => {
        props.dispatch(changeLayoutX())
    }
    return (
        <div className="sys-set">
            <div ref={ref => sysRefs = ref} className="sys-set-btn">
                <Button type="primary" icon={!visible ? <SettingOutlined /> : <CloseOutlined />} onClick={handleOnOpen} size="large" />
            </div>
            <Drawer
                title="系统设置"
                placement="right"
                closable={false}
                onClose={handleOnClose}
                visible={visible}
            >
                <div className="w-100">
                    <Form {...layout}>
                        <Form.Item label="是否开启左右布局">
                            <Switch onChange={changeLayout}></Switch>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </div>
    )
}

export default connect(({ layout }: any) => {
    return {
        isLayoutX: layout.isLayoutX
    }
})(SysSet)