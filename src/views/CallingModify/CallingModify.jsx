import React from "react";
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
import { withRouter, Link } from "react-router-dom";
import Moment from "moment";

import calltype from "../../assets/dataFrom/calltype";
import stateMap from "../../assets/dataFrom/stateMap";

const { Option } = Select;
const ipServer = "http://10.28.173.174:8080";

class CallingModify extends React.Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      var now = new Date();
      const modify_token = JSON.parse(localStorage.getItem("modifyCur"));
      const values = {
        token_id:modify_token.token_id,
        token_name: fieldsValue["callName"],
        token_type: fieldsValue["callType"],
        token_desc: fieldsValue["description"],
        recruit_nums: fieldsValue["number"],
        recruit_end: fieldsValue["endTime"],
        photo:"temp"
      };
      console.log("body:", values);
      let myHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:'Bearer '+localStorage.getItem('token')
      });
      let url = "http://localhost:8080/tokensOwner/update";
        fetch(url,{
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify(values),
            mode:'cors'
        })
       .then(res=>res.json()).then(data=>{
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
      // }
      // const originCall = JSON.parse(localStorage.callersCall)
      // originCall.push(item)
      // localStorage.setItem("callersCall", JSON.stringify(originCall))
      message.success("????????????");
      this.props.history.push("/offer_info");
    });
  };



  render() {
    const data = JSON.parse(localStorage.getItem("modifyCur"));

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
      <Layout>
        <Row>
          <Col>
            <div>
              <Divider orientation="left">?????????????????????</Divider>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/* ??????????????? */}
                <Form.Item label="???????????????">
                  {getFieldDecorator("callName", {
                    rules: [
                      {
                        required: true,
                        min: 3,
                        message: "????????????????????????3"
                      }
                    ],
                    initialValue: data.token_name
                  })(<Input />)}
                </Form.Item>
                {/*????????????????????????ID*/}
                {/*/!* ?????????ID *!/*/}
                {/*<Form.Item label="?????????ID">*/}
                {/*  {getFieldDecorator("callID", {*/}
                {/*    initialValue: data.token_id*/}
                {/*  })(<Input disabled={true} />)}*/}
                {/*</Form.Item>*/}
                {/* ??????????????? */}
                <Form.Item label="???????????????">
                  {getFieldDecorator("callType", {
                    initialValue: data.token_type,
                    rules: [{ required: true, message: "????????????????????????!" }]
                  })(
                    <Select>
                      {calltype.map(item => (
                        <Option value={item.key}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="???????????????">
                  {getFieldDecorator("description", {
                    initialValue: data.token_desc,
                    rules: [
                      {
                        required: true,
                        message: "?????????????????????"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {/* ??????????????? */}
                <Form.Item label="???????????????">
                  {getFieldDecorator("state", {
                    initialValue: stateMap[data.state]
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* ??????????????? */}
                <Form.Item label="????????????">
                  {getFieldDecorator("number", {
                    rules: [{ required: true, message: "?????????????????????" }],
                    initialValue: data.recruit_nums
                  })(<InputNumber style={{ width: "100%" }} />)}
                </Form.Item>
                {/* ??????????????? */}
                <Form.Item label="???????????????">
                  {getFieldDecorator("currentNum", {
                    initialValue: data.cur_recruited_nums
                  })(<InputNumber style={{ width: "100%" }} disabled={true} />)}
                </Form.Item>
                {/* ???????????? */}
                <Form.Item label="????????????">
                  {getFieldDecorator("createTime", {
                    initialValue: data.created_time
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* ???????????? */}
                <Form.Item label="????????????">
                  {getFieldDecorator("endTime", {
                    rules: [{ required: true, message: "?????????????????????" }],
                    initialValue: Moment(data.recruit_end)
                  })(
                    <DatePicker
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
                    ??????
                  </Button>
                  <Link to="/offer_info" style={{ margin: "0 10px" }}>
                    ??????
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

export default withRouter(Form.create()(CallingModify));
