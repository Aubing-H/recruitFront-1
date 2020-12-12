import React from 'react'
import {Button, Card, Descriptions, Dropdown, Input, Layout, Menu, message, Row} from "antd";
import calltype from "../../assets/dataFrom/calltype";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";
import callstate from "../../assets/dataFrom/callstate";
import {Link} from "react-router-dom";
import Moment from "moment";

import "../../style/view-style/CallerView.scss";

import "../../style/view-style/Calling.scss";
const { Search } = Input;


class AdminToken extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            call_type_select: "play",
            call_state_select: "all",
            search_key: "",
            type_dropdown: "类型选择",
            state_dropdown: "状态选择",
            callings: []
        };
    }
    componentDidMount() {
        let myHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url = "http://localhost:8080/tokensOwner/all";
        fetch(url,{
            method:'GET',
            headers:myHeaders,
            mode:'cors'
        }).then(res=>res.json()).then(data=>{
            this.setState({
                callings:data.data
            })
        })
    }

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

    onReq = (e, item) => {
        // localStorage.setItem('tokenDetail',JSON.stringify(item))
        this.props.history.push("/receiver/req_detail");
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
                                        {Moment(item.created_time).format("YYYY-MM-DD")}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="上次修改时间">
                                        {item.modified_time?Moment(item.modified_time).format("YYYY-MM-DD"):''}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="结束日期">
                                        { Moment(item.recruit_end).format("YYYY-MM-DD")}
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
                                    <Descriptions.Item label="令主">
                                        {<Link to={{pathname:'/receiver_detail',query:{username:item.username}}}>{item.username}</Link>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Row>
                    ))}
                </Layout>
            </Layout>
        );
    }
}

export default AdminToken
