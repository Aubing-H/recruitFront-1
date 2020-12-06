import React from "react";
import { Layout, Row, Card, Descriptions, Button, Tabs, Avatar } from "antd";
import { AppleOutlined } from "@ant-design/icons";
import "../../style/view-style/CallerView.scss";

import avater from "../../assets/images/user.jpg";

const { TabPane } = Tabs;

class CallerView extends React.Component {
  render() {
    return (
      <Layout className="caller">
        <Layout className="caller-profile">
          <div className="caller-head">
            <Avatar src={avater} />
            <div className="caller-name">bingo</div>
          </div>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="用户等级">1</Descriptions.Item>
            <Descriptions.Item label="已发布召集令数">3</Descriptions.Item>
            <Descriptions.Item label="已接受召集令数">7</Descriptions.Item>
          </Descriptions>
        </Layout>
        <Layout className="caller-calling">
          <Tabs defaultActiveKey="release" className="calling-tabs">
            <TabPane
              tab={
                <span>
                  {" "}
                  <AppleOutlined />
                  发布召集令
                </span>
              }
              key="release"
              className="tabs-item"
            >
              <Row className="market-item">
                <Card
                  title="滑板中心组招聘"
                  bordered={false}
                  className="market-item-card"
                >
                  <Descriptions column={2}>
                    <Descriptions.Item label="召集令类型">
                      技术
                    </Descriptions.Item>
                    <Descriptions.Item label="召集令状态">
                      招聘中
                    </Descriptions.Item>
                    <Descriptions.Item label="召集人数（当前/总数）">
                      18/30
                    </Descriptions.Item>
                    <Descriptions.Item label="召集令描述">
                      此召集令面向有前端开发经验的应聘人
                    </Descriptions.Item>
                  </Descriptions>
                  <Button type="detail">详情</Button>
                </Card>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  {" "}
                  <AppleOutlined />
                  接受召集令
                </span>
              }
              key="get"
              className="tabs-item"
            ></TabPane>
          </Tabs>
        </Layout>
      </Layout>
    );
  }
}

export default CallerView;
