import React from "react";
import {
  Layout,
  Input,
  Dropdown,
  Menu,
  Row,
  Card,
  Descriptions,
  Button,
  message
} from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import calltype from "../../assets/dataFrom/calltype";
import callstate from "../../assets/dataFrom/callstate";

import "../../style/view-style/Calling.scss";
import dataModel from "../../assets/dataFrom/dataModel";

const { Search } = Input;

const ipaddr = "http://127.0.0.1:3000";
const ipServer = "http://10.28.168.104:8080";
// const ipServerLocal = "http://127.0.0.1:8080";

class Calling extends React.Component {
  constructor(props) {
    super(props);
    this.getCallings();
    this.state = {
      call_type_select: "play",
      call_state_select: "all",
      search_key: "",
      type_dropdown: "类型选择",
      state_dropdown: "状态选择",
      callings: JSON.parse(localStorage.callersCall)
    };
  }

  getCallings = () => {
    // 请求之前判断前端是否已存在数据，否则向服务器请求

    let values = JSON.parse(localStorage.getItem("user")).username;
    let myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=utf-8"
    });
    let url = ipServer + "/tokensOwner/all?username=" + values;
    fetch(url, {
      method: "GET",
      headers: myHeaders,
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        console.log("data:", data);
      });
    if (localStorage.getItem("callersCall") == null) {
      localStorage.setItem(
        "callersCall",
        JSON.stringify(dataModel.callersCall)
      );
    }
  };

  handleMenuClick = e => {
    for (let i = 0; i < calltype.length; i++) {
      if (calltype[i].key === e.key) {
        this.setState({ type_dropdown: calltype[i].name });
        break;
      }
    }
  };

  handleStateClick = e => {
    for (let i = 0; i < callstate.length; i++) {
      if (callstate[i].key === e.key) {
        this.setState({ state_dropdown: callstate[i].name });
        break;
      }
    }
  };

  onDetail = (e, item) => {
    console.log("onDetail:");
    localStorage.setItem("detailCur", JSON.stringify(item));
    console.log(localStorage.getItem("detailCur"));
    this.props.history.push("/calling_details");
  };

  onModify = (e, item) => {
    console.log("onModify:");
    localStorage.setItem("modifyCur", JSON.stringify(item));
    console.log(localStorage.getItem("modifyCur"));
    this.props.history.push("/calling_modify");
  };

  onDelete = (e, call_id) => {
    let url = ipaddr + "/user/tokensOwner/delete";
    let myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    });
    let temp_value = JSON.parse(localStorage.getItem("user"));
    const myBody = {
      user_id: temp_value.user_id,
      token_id: call_id
    };

    console.log("onDelete: ", call_id);
    message.success("已删除");

    // fetch(url,{
    //     method:'POST',
    //     headers: myHeaders,
    //     mode: 'cors',
    //     body: myBody
    //     //转或称字符串格式
    // }).then(res=>res.json()).then(
    //     res => {
    //         if(res.isSuccess === 'success'){
    //             // 在本地删除该数据 或者重新请求数据
    //         }else{
    //             console.log('删除失败')
    //         }
    //     }
    // )

    const array = this.state.callings;
    let i;
    for (i = 0; i < array.length; i++) {
      if (array[i].token_id === call_id) {
        break;
      }
    }
    if (array.length > 0) {
      array.splice(i, 1); //删除
      this.setState({ callings: array });
      localStorage.setItem("callersCall", JSON.stringify(array));
    }
  };

  render() {
    // 渲染模式，每渲染一次（state变化触发等），会执行一次
    const onSearch = value => {
      console.log("onsearch: " + value);
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {calltype.map(item => (
          <Menu.Item key={item.key} icon={<UserOutlined />}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );

    const menuState = (
      <Menu onClick={this.handleStateClick}>
        {callstate.map(item => (
          <Menu.Item key={item.key}>{item.name}</Menu.Item>
        ))}
      </Menu>
    );

    let typeMap = new Map();
    for (var i in calltype) {
      typeMap.set(calltype[i].key, calltype[i].name);
    }

    let stateMap = new Map();
    for (var j in callstate) {
      stateMap.set(callstate[j].key, callstate[j].name);
    }
    var data = "";

    return (
      <Layout className="calling">
        <div className="calling-head">
          <div className="search">
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200, margin: "0 10px" }}
            />
          </div>
          <Dropdown.Button overlay={menu} className="search">
            {this.state.type_dropdown}
          </Dropdown.Button>
          <Dropdown.Button overlay={menuState} className="search">
            {this.state.state_dropdown}
          </Dropdown.Button>
          <div className="calling-add">
            <Link className="add-icon" to="/calling_info">
              添加
              <PlusOutlined />
            </Link>
          </div>
        </div>
        <Layout className="calling-content">
          {this.state.callings.map(item => (
            <Row className="my-item" key={item.token_id}>
              <Card
                title={item.token_name}
                bordered={false}
                className="my-item-card"
              >
                <Descriptions column={2}>
                  <Descriptions.Item label="召集令类型">
                    {typeMap.get(item.token_type)}
                  </Descriptions.Item>
                  <Descriptions.Item label="创建时间">
                    {item.created_time}
                  </Descriptions.Item>
                  <Descriptions.Item label="结束日期">
                    {item.recruit_end}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集令状态">
                    {stateMap.get(item.state)}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集人数（当前/总数）">
                    {item.cur_recruited_nums}/{item.recruit_nums}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集令描述">
                    {item.token_desc}
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onDetail(e, item)}
                >
                  详情
                </Button>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onModify(e, item)}
                >
                  修改
                </Button>
                {/* </Link> */}
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onDelete(e, item.token_id)}
                >
                  删除
                </Button>
              </Card>
            </Row>
          ))}
        </Layout>
      </Layout>
    );
  }
}

export default Calling;
