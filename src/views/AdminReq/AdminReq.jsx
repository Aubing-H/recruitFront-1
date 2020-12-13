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
import Moment from "moment";

const { Search } = Input;
const reqStateMap = {
    complete: "完成",
    waitprocess: "等待接受",
    cancel: "取消",
    timeout: "超时",
    discarded: "拒绝",
    accepted: "接受"
};

class AdminReq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            call_type_select: "play",
            call_state_select: "all",
            search_key: "",
            type_dropdown: "类型选择",
            state_dropdown: "状态选择",
            callingReqs: []
        };
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        let myHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url = "http://localhost:8080/tokenReq/all";
        fetch(url,{
            method:'GET',
            headers:myHeaders,
            mode:'cors'
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            this.setState({
                callingReqs:data.tokenReqs
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

    onDetail = (e, item) => {
        console.log("onDetail:");
        localStorage.setItem("detailCur", JSON.stringify(item));
        console.log(localStorage.getItem("detailCur"));
        this.props.history.push("/calling_details");
    };

    onModify = (e, item) => {

    };

    onDelete = (e, item) => {
        let url = "http://localhost:8080/tokenReq/delete?req_id="+item.req_id;
        let myHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            Authorization:'Bearer '+localStorage.getItem('token')
        });

        fetch(url,{
            method:'POST',
            headers: myHeaders,
            mode: 'cors'
        }).then(res=>res.json()).then(data=>{
            if(data.message==="success"){
                message.success("删除成功")
            }else{
                message.error("删除失败")
            }
        })

        const array = this.state.callingReqs;
        let i;
        for (i = 0; i < array.length; i++) {
            if (array[i].req_id === item.req_id) {
                break;
            }
        }
        if (array.length > 0) {
            array.splice(i, 1); //删除
            this.setState({ callingReqs: array });
        }
    };

    onCancel = (e, item) => {
        let url = "http://localhost:8080/tokenReq/cancel?req_id=" + item.req_id;
        let myHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        });

        fetch(url, {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors'
        }).then(res => res.json()).then(data => {
            if (data.message === "success") {
                message.success("取消成功")
            } else {
                message.error("取消失败")
            }
        })
    }

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
                <Layout className="calling-content">
                    {this.state.callingReqs.map(item => (
                        <Row className="my-item" key={item.req_id}>
                            <Card title={<Link to={{pathname:'/TokenDetails',query:{token_id:item.token_id}}}>点击此处查看召集令信息</Link>} bordered={false}>
                                <Descriptions column={2}>
                                    <Descriptions.Item label="描述">
                                        {item.req_desc}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="令主">
                                        {<Link to={{pathname:'/receiver_detail',query:{username:item.owner_username}}}>{item.owner_username}</Link>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="接令者">
                                        {<Link to={{pathname:'/receiver_detail',query:{username:item.req_username}}}>{item.req_username}</Link>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="状态">
                                        {reqStateMap[item.state]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="创建时间">
                                        {Moment(item.created_time).format("YYYY-MM-DD HH:mm:ss")}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="修改时间">
                                        {item.modified_time?Moment(item.modified_time).format("YYYY-MM-DD"):''}
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

export default AdminReq;
