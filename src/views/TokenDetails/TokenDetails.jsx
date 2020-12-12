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
    message, Avatar
} from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import calltype from "../../assets/dataFrom/calltype";
import callstate from "../../assets/dataFrom/callstate";

import "../../style/view-style/CallerView.scss";

import "../../style/view-style/Calling.scss";
import dataModel from "../../assets/dataFrom/dataModel";
import Moment from "moment";
import avater from "../../assets/images/user.jpg";

const { Search } = Input;

const ipaddr = "http://127.0.0.1:3000";
const ipServer = "http://10.28.168.104:8080";
// const ipServerLocal = "http://127.0.0.1:8080";

class TokenDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token:''
        };
    }
    componentDidMount() {
        let token_id=this.props.location.query.token_id
        let myHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url = "http://localhost:8080/tokensOwner/oneToken?token_id="+token_id;
        fetch(url,{
            method:'GET',
            headers:myHeaders,
            mode:'cors'
        }).then(res=>res.json()).then(data=>{

            this.setState({
                token:data.data
            })
        })
    }

    render() {
        // 渲染模式，每渲染一次（state变化触发等），会执行一次


        let typeMap = new Map();
        for (var i in calltype) {
            typeMap.set(calltype[i].key, calltype[i].name);
        }

        let stateMap = new Map();
        for (var j in callstate) {
            stateMap.set(callstate[j].key, callstate[j].name);
        }
        const item=this.state.token

        return (
            <Layout className="calling">
                <Layout className="calling-content">
                        <Row className="my-item" key={item.token_id}>
                            <Card
                                title={item.token_name}
                                bordered={false}
                                className="my-item-card"
                            >
                                <Descriptions>
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
                                </Descriptions>
                            </Card>
                        </Row>
                </Layout>
            </Layout>
        );
    }
}

export default TokenDetails;
