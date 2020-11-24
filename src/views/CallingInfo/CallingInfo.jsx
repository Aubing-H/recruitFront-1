import {
  Form,
  Layout,
  Col,
  Row,
  Divider,
  Button,
  Input,
  Select,
  InputNumber,
  DatePicker
} from "antd";
import React from "react";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import "../../style/view-style/CallingInfo.scss";

const { Option } = Select;

class CallingInfo extends React.Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      let token = localStorage.getItem("token");
      var now = new Date();
      const values = {
        callName: fieldsValue["callname"],
        callType: fieldsValue["call_type"],
        description: fieldsValue["description"],
        callNum: fieldsValue["number"],
        deadline: fieldsValue["end_time"].format("YYYY/MM/DD"),
        setTime: now.toLocaleDateString()
      };
      console.log({
        values: values,
        token: token
      });
      this.modifying();
      let myHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8"
      });
      let url = "http://127.0.0.1:8080/user/modify";
      // fetch(url,{
      //     method:'POST',
      //     headers:myHeaders,
      //     body:JSON.stringify({
      //         user:values,
      //         token:token
      //     }),
      //     mode:'cors'
      // }).then(res=>res.text()).then(data=>{
      //     console.log(data)
      //     if(data==="success"){
      //         message.info('创建成功')
      //         //重新调用此界面
      //         this.setState({
      //             loading:false
      //         })
      //         // this.props.history.reload()
      //         // this.props.history.push('/personal_info')
      //     }else{
      //         this.setState({loading:false})
      //         message.error("创建失败,请联系管理员：yuhang@bupt.edu.cn")
      //     }
      // })
    });
  };

  onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 10 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 6
        }
      }
    };
    return (
      <Layout className="calling-info">
        <Row>
          <Col>
            <div className="base-style">
              <Divider orientation="left">新建召集令</Divider>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/* 召集令名称 */}
                <Form.Item label="召集令名称">
                  {getFieldDecorator("callname", {
                    rules: [
                      {
                        required: true,
                        message: "请输入召集令名称",
                        min: 3,
                        message: "召集令名称最少为3"
                      }
                    ],
                    initialValue: ""
                  })(<Input />)}
                </Form.Item>
                {/* 召集令类型 */}
                <Form.Item label="召集令类型">
                  {getFieldDecorator("call_type", {
                    initialValue: "",
                    rules: [{ required: true, message: "请选择所在城市!" }]
                  })(
                    <Select>
                      <Option value="tech">技术交流</Option>
                      <Option value="study">学习探讨</Option>
                      <Option value="socialize">社会实践</Option>
                      <Option value="volunteer">公益志愿者</Option>
                      <Option value="play">游玩</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="召集令描述">
                  {getFieldDecorator("description", {
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "请输入描述信息"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="召集人数">
                  {getFieldDecorator("number", {
                    rules: [{ required: true, message: "请输入召集人数" }],
                    initialValue: ""
                  })(<InputNumber style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item label="结束时间">
                  {getFieldDecorator("end_time", {
                    rules: [{ required: true, message: "请输入截止时间" }],
                    initialValue: ""
                  })(
                    <DatePicker
                      onChange={this.onChange}
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.state.loading}
                  >
                    提交
                  </Button>
                  <Link to="/offer_info" style={{ margin: "0 10px" }}>
                    返回
                  </Link>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withRouter(Form.create()(CallingInfo));
