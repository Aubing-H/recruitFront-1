import React from "react";
import {
  Layout,
  Input,
  Dropdown,
  Menu,
  Row,
  Card,
  Descriptions,
  Button
} from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import calltype from "../../assets/dataFrom/calltype";
import callstate from "../../assets/dataFrom/callstate";

import "../../style/view-style/Calling.scss";
import dataModel from "../../assets/dataFrom/dataModel";

const { Search } = Input;

const ipaddr = "http://127.0.0.1:3000";

class Calling extends React.Component {
  state = {
    call_type_select: "play",
    call_state_select: "all",
    search_key: "",
    type_dropdown: "类型选择",
    state_dropdown: "状态选择",
    callings: JSON.parse(localStorage.callersCall)
  };

  componentWillMount() {
    this.getInfo();
  }

  getInfo = () => {
    if (
      localStorage.getItem("load") == null ||
      localStorage.getItem("load") == false
    ) {
      // 请求之前判断前端是否已存在数据，否则向服务器请求
      // let user = localStorage.getItem('user')
      // url = ipaddr + '/user/tokenOwner/' + user.username
      // fetch(url).then(
      //     data => {
      //         console.log(data)
      //     }
      // )
    }
    localStorage["callersCall"] = JSON.stringify(
      Object.values(dataModel.callersCall)
    );
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
    const array = JSON.parse(localStorage.callersCall);
    let i;
    for (i = 0; i < array.length; i++) {
      if (array[i].token_id === call_id) {
        break;
      }
    }
    array.splice(i, 1); //删除
    this.setState({ callings: array });
    localStorage["callersCall"] = JSON.stringify(array);
  };

  render() {
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

    const array = this.state.callings;
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
          {array.map(item => (
            <Row className="my-item">
              <Card
                title={item.token_name}
                bordered={false}
                className="my-item-card"
              >
                <Descriptions column={2}>
                  <Descriptions.Item label="召集令类型">
                    {item.token_type}
                  </Descriptions.Item>
                  <Descriptions.Item label="创建时间">
                    {item.created_time}
                  </Descriptions.Item>
                  <Descriptions.Item label="结束日期">
                    {item.recruit_end}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集令状态">
                    {item.state}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集人数（当前/总数）">
                    {item.cur_recruited_nums}/{item.recruit_nums}
                  </Descriptions.Item>
                  <Descriptions.Item label="召集令描述">
                    {item.token_desc}
                  </Descriptions.Item>
                </Descriptions>
                <Link to={"/calling_modify?callID=" + item.token_id}>
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    修改
                  </Button>
                </Link>
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
