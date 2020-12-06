import React from "react";
import { Layout, Card, Descriptions, Row, Button } from "antd";
import { Link } from "react-router-dom";

import "../../style/view-style/CallingDetails.scss";

import stateMap from "../../assets/dataFrom/stateMap";
import typeMap from "../../assets/dataFrom/typeMap";

import requestModel from "../../assets/dataFrom/requestModel";

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
    this.getDetails();
    this.state = {
      calling: JSON.parse(localStorage.getItem("detailCur"))
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

  onRecept = (e, item) => {};

  onRefuse = (e, item) => {};

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
                {item.created_time}
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
          {requestModel.requests.map(item => (
            <Row className="my-item" key={item.req_id}>
              <Card title={item.rec_username} bordered={false}>
                <Descriptions column={2}>
                  <Descriptions.Item label="描述">
                    {item.req_desc}
                  </Descriptions.Item>
                  <Descriptions.Item label="状态">
                    {reqStateMap[item.state]}
                  </Descriptions.Item>
                  <Descriptions.Item label="创建时间">
                    {item.created_time}
                  </Descriptions.Item>
                  <Descriptions.Item label="修改时间">
                    {item.modified_time}
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onRecept(e, item)}
                >
                  接受
                </Button>
                <Button
                  type="primary"
                  style={{ margin: "0 10px" }}
                  onClick={e => this.onRefuse(e, item)}
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
