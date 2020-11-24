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
  DatePicker
} from "antd";
import { withRouter, Link } from "react-router-dom";

import calltype from "../../assets/dataFrom/calltype";

const { Option } = Select;

class CallingModify extends React.Component {
  state = {
    callInfo: {}
  };

  getUserInfo = () => {
    // 再页面渲染之前得到修改之前的召集令数据
    let url = "http://127.0.0.1:8080/user/tokenOwner/token/";
    // let myHeaders = new Headers({
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'text/plain'
    // });
    fetch(url + "token_id").then(function(response) {
      console.log(response);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      let token = localStorage.getItem("token");
      var now = new Date();
      const values = {
        callName: fieldsValue["callName"],
        callID: fieldsValue["callID"],
        callType: fieldsValue["call_type"],
        description: fieldsValue["description"],
        callNum: fieldsValue["number"],
        endTime: fieldsValue["end_time"].format("YYYY/MM/DD"),
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

  getSearch = () => {
    // 获取前一个页面的参数信息
    var search = this.props.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (search.indexOf("?") != -1) {
      var str = search.substr(1);
      let strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
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
                        message: "请输入召集令名称",
                        min: 3,
                        message: "召集令名称最少为3"
                      }
                    ],
                    initialValue: ""
                  })(<Input />)}
                </Form.Item>
                {/* 召集令ID */}
                <Form.Item label="召集令ID">
                  {getFieldDecorator("callID", {
                    initialValue: "召集令ID"
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 召集令类型 */}
                <Form.Item label="召集令类型">
                  {getFieldDecorator("callType", {
                    initialValue: "",
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
                    initialValue: "",
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
                    initialValue: "waitresps"
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 拟召集人数 */}
                <Form.Item label="召集人数">
                  {getFieldDecorator("number", {
                    rules: [{ required: true, message: "请输入召集人数" }],
                    initialValue: 30
                  })(<InputNumber style={{ width: "100%" }} />)}
                </Form.Item>
                {/* 已召集人数 */}
                <Form.Item label="已召集人数">
                  {getFieldDecorator("currentNum", {
                    initialValue: 18
                  })(<InputNumber style={{ width: "100%" }} disabled={true} />)}
                </Form.Item>
                {/* 创建时间 */}
                <Form.Item label="创建时间">
                  {getFieldDecorator("createTime", {
                    initialValue: "2020/02/20"
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 修改时间 */}
                <Form.Item label="修改时间">
                  {getFieldDecorator("modifyTime", {
                    initialValue: "2020/08/12"
                  })(<Input disabled={true} />)}
                </Form.Item>
                {/* 结束时间 */}
                <Form.Item label="结束时间">
                  {getFieldDecorator("endTime", {
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
