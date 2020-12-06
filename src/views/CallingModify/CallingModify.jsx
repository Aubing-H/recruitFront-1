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
import moment from "moment";

import calltype from "../../assets/dataFrom/calltype";

const { Option } = Select;
const ipServer = "http://10.28.173.174:8080";

class CallingModify extends React.Component {
  state = {};

  getUserInfo = () => {
    // 再页面渲染之前得到修改之前的召集令数据
    // let url = "http://127.0.0.1:8080/user/tokenOwner/token/";
    // let myHeaders = new Headers({
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'text/plain'
    // });
    // fetch(url + "token_id").then(function(response) {
    //   console.log(response);
    // });
    console.log("param:", this.props.params);
    console.log("search:", this.props.location.search);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      let token = localStorage.getItem("token");
      var now = new Date();
      /*
      token_id: "106040",
      token_name: "健步社讲座招聘",
      token_type: "social",
      created_time: "2020/03/04",
      recruit_end: "2020/12/15",
      state: "timeout",
      recruit_nums: 160,
      cur_recruited_nums: 4,
      token_desc: "description6695" 
      */
      const values = {
        token_name: fieldsValue["callName"],
        token_id: fieldsValue["callID"],
        token_type: fieldsValue["call_type"],
        token_desc: fieldsValue["description"],
        recruit_nums: fieldsValue["number"],
        recruit_end: fieldsValue["end_time"]
      };
      console.log("body:", values);
      let myHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8"
      });
      let url = ipServer + "/tokensOwner/modify";
      //   fetch(url,{
      //       method:'POST',
      //       headers:myHeaders,
      //       body:JSON.stringify(values),
      //       mode:'cors'
      //   })
      //  .then(res=>res.json()).then(data=>{
      //       console.log(data)
      //   })
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
      message.success("修改成功");
      this.props.history.push("/offer_info");
    });
  };

  onChange = (time, timeString) => {
    console.log("time change:", timeString);
    this.setState({ inputTime: time });
  };

  getSearch = () => {
    // 获取前一个页面的参数信息
    var search = this.props.location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (search.indexOf("?") !== -1) {
      var str = search.substr(1);
      let strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
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
              <Divider orientation="left">召集令信息修改</Divider>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/* 召集令名称 */}
                <Form.Item label="召集令名称">
                  {getFieldDecorator("callName", {
                    rules: [
                      {
                        required: true,
                        min: 3,
                        message: "召集令名称最少为3"
                      }
                    ],
                    initialValue: data.token_name
                  })(<Input />)}
                </Form.Item>
                {/* 召集令ID */}
                <Form.Item label="召集令ID">
                  {getFieldDecorator("callID", {
                    initialValue: data.token_id
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 召集令类型 */}
                <Form.Item label="召集令类型">
                  {getFieldDecorator("callType", {
                    initialValue: data.token_type,
                    rules: [{ required: true, message: "请选择所在城市!" }]
                  })(
                    <Select>
                      {calltype.map(item => (
                        <Option value={item.key}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="召集令描述">
                  {getFieldDecorator("description", {
                    initialValue: data.token_desc,
                    rules: [
                      {
                        required: true,
                        message: "请输入描述信息"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {/* 召集令状态 */}
                <Form.Item label="召集令状态">
                  {getFieldDecorator("state", {
                    initialValue: data.state
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 拟召集人数 */}
                <Form.Item label="召集人数">
                  {getFieldDecorator("number", {
                    rules: [{ required: true, message: "请输入召集人数" }],
                    initialValue: data.recruit_nums
                  })(<InputNumber style={{ width: "100%" }} />)}
                </Form.Item>
                {/* 已召集人数 */}
                <Form.Item label="已召集人数">
                  {getFieldDecorator("currentNum", {
                    initialValue: data.cur_recruited_nums
                  })(<InputNumber style={{ width: "100%" }} disabled={true} />)}
                </Form.Item>
                {/* 创建时间 */}
                <Form.Item label="创建时间">
                  {getFieldDecorator("createTime", {
                    initialValue: data.created_time
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 结束时间 */}
                <Form.Item label="结束时间">
                  {getFieldDecorator("endTime", {
                    rules: [{ required: true, message: "请输入截止时间" }],
                    initialValue: moment(data.recruit_end, "YYYY/MM/DD")
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
                    修改
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

export default withRouter(Form.create()(CallingModify));
