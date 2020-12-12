import React from "react";
import {Layout, Card, Descriptions, Row, Button, message} from "antd";
import { Link } from "react-router-dom";

import "../../style/view-style/CallingDetails.scss";

import stateMap from "../../assets/dataFrom/stateMap";
import typeMap from "../../assets/dataFrom/typeMap";
import Moment from "moment";


const reqStateMap = {
  complete: "完成",
  waitprocess: "等待接受",
  cancel: "取消",
  timeout: "超时",
  discarded: "拒绝",
  accepted: "接受"
};

class CallingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calling: JSON.parse(localStorage.getItem("detailCur")),
      callingReq:[]
    };
  }

  getDetails = () => {
    /* 请求当前发布的召集令的所有接令信息 */
    // const values = "token_id"
    // let myHeaders = new Headers({
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json;charset=utf-8"
    // })
    // let url = ipServer + ""
  };
  getCallingReq(){
    let myHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:'Bearer '+localStorage.getItem('token')
    })
    let user=JSON.parse(localStorage.getItem('user'))
    let url = "http://localhost:8080/tokenReq/allReq?username="+user.username+'&token_id='+this.state.calling.token_id;
    fetch(url,{
      method:'GET',
      headers:myHeaders,
      mode:'cors'
    }).then(res=>res.json()).then(data=>{
      console.log(data)
      this.setState({
        callingReq:data.tokenReqs
      })
    })
  }


  componentDidMount() {
    this.getCallingReq()
  }

  onRecept = (e, item) => {
    let myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
      Authorization:'Bearer '+localStorage.getItem('token')
    })
    let url = "http://localhost:8080/tokenReq/accpet?req_id="+item.req_id;
    fetch(url,{
      method:'GET',
      headers:myHeaders,
      mode:'cors'
    }).then(res=>res.json()).then(data=>{
      if(data.message==="success"){
        message.success('接受成功')
        this.getCallingReq()
      }else{
        message.error('接受失败')
      }
    })
  };

  onRefuse = (e, item) => {
    let myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
      Authorization:'Bearer '+localStorage.getItem('token')
    })
    let url = "http://localhost:8080/tokenReq/reject?req_id="+item.req_id;
    fetch(url,{
      method:'GET',
      headers:myHeaders,
      mode:'cors'
    }).then(res=>res.json()).then(data=>{
      if(data.message==="success"){
        message.success('拒绝成功')
        this.getCallingReq()
      }else{
        message.error('拒绝失败')
      }
    })
  };

  render() {
    const item = this.state.calling;
    return (
      <Layout className="calling-details">
        <Layout className="details-profile">
          <Card
            title={item.token_name}
            bordered={false}
            className="my-item-card"
          >
            <Descriptions column={1}>
              <Descriptions.Item label="召集令类型">
                {typeMap[item.token_type]}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {Moment(item.created_time).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="结束日期">
                {item.recruit_end}
              </Descriptions.Item>
              <Descriptions.Item label="召集令状态">
                {stateMap[item.state]}
              </Descriptions.Item>
              <Descriptions.Item label="召集人数（当前/总数）">
                {item.cur_recruited_nums}/{item.recruit_nums}
              </Descriptions.Item>
              <Descriptions.Item label="召集令描述">
                {item.token_desc}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Link to="/offer_info">
            <Button type="primary" style={{ width: "100%" }}>
              返回
            </Button>
          </Link>
        </Layout>
        <Layout className="details-content">
          {this.state.callingReq.map(item => (
            <Row className="my-item" key={item.req_id}>
              <Card title={<Link to={{pathname:'/receiver_detail',query:{username:item.req_username}}}>{item.req_username}</Link>} bordered={false}>
                <Descriptions column={2}>
                  <Descriptions.Item label="描述">
                    {item.req_desc}
                  </Descriptions.Item>
                  <Descriptions.Item label="状态">
                    {reqStateMap[item.state]}
                  </Descriptions.Item>
                  <Descriptions.Item label="创建时间">
                    {Moment(item.created_time).format("YYYY-MM-DD")}
                  </Descriptions.Item>
                  <Descriptions.Item label="修改时间">
                    {item.modified_time?Moment(item.modified_time).format("YYYY-MM-DD"):''}
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onRecept(e, item)}
                  disabled={item.state !== 'waitprocess'}
                >
                  接受
                </Button>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onRefuse(e, item)}
                  disabled={item.state !== 'waitprocess'}
                >
                  拒绝
                </Button>
              </Card>
            </Row>
          ))}
        </Layout>
      </Layout>
    );
  }
}

export default CallingDetails;
