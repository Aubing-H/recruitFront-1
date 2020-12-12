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
  DatePicker,
  message
} from "antd";
import React from "react";
import { withRouter, Link } from "react-router-dom";

import "../../style/view-style/CallingInfo.scss";

const { Option } = Select;

class CallingInfo extends React.Component {
  state = {
    inputTime: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      let user = JSON.parse(localStorage.getItem("user"));
      const values = {
        username: user.username,
        token_name: fieldsValue["callname"],
        token_type: fieldsValue["call_type"],
        token_desc: fieldsValue["description"],
        recruit_nums: fieldsValue["number"],
        recruit_end: fieldsValue['end_time'].format('YYYY-MM-DD'),
        photo:'123for temp'
      };
      console.log("submit body:", JSON.stringify(values));
      let myHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:'Bearer '+localStorage.getItem('token')
      });
      let url = "http://localhost:8080/tokensOwner/create";
      fetch(url,{
        method:'POST',
        headers:myHeaders,
        body:JSON.stringify(values),
        mode:'cors'
      }).then(res=>res.json()).then(data=>{
        console.log(data)
      })

      // const item = {
      //   token_id: "660012",
      //   token_name: fieldsValue["callname"],
      //   token_type: fieldsValue["call_type"],
      //   created_time: "2020/03/04",
      //   recruit_end: "2020/08/08",
      //   state: "timeout",
      //   recruit_nums: fieldsValue["number"],
      //   cur_recruited_nums: 4,
      //   token_desc: fieldsValue["description"]
      // };
      //
      // const originCall = JSON.parse(localStorage.callersCall);
      // originCall.push(item);
      // localStorage.setItem("callersCall", JSON.stringify(originCall));
      message.success("添加成功");
      this.props.history.push("/offer_info");
    });
  };

  onChange = (time, timeString) => {
    this.setState({ inputTime: time });
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
                      <Option value="academic">学习探讨</Option>
                      <Option value="social">社会实践</Option>
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
