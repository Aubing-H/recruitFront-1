import React from 'react'
import {Layout, Row, Card, Descriptions, Button, Tabs, Avatar} from 'antd'
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons'
import '../../style/view-style/Market.scss'

import avatar from '../../assets/images/user.jpg'

const {TabPane} = Tabs

class Market extends React.Component{
    render(){
        return(
            <Layout className="market">
                <Tabs defaultActiveKey="tech" className="tabs">
                    <TabPane tab={<span> <AppleOutlined />技术交流</span>} key="tech" className="tabs-item">
                        
                        <Row className="market-item">
                            <Card title="腾讯前端招聘" bordered={false} className="market-item-card">
                            <div className="call-master">
                                    <Avatar icon='user' src={avatar} alt='avatar' style={{ cursor: 'pointer' }} />
                                    <p style={{margin: "0 10px"}}>令主: bingo</p>
                                </div>
                                <Descriptions column={2}>
                                    <Descriptions.Item label="召集令类型">技术</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2020-01-01</Descriptions.Item>
                                    <Descriptions.Item label="结束日期">2020-12-31</Descriptions.Item>
                                    <Descriptions.Item label="召集令状态">招聘中</Descriptions.Item>
                                    <Descriptions.Item label="召集人数（当前/总数）">18/30</Descriptions.Item>
                                    <Descriptions.Item label="召集令描述">此召集令面向有前端开发经验的应聘人</Descriptions.Item>
                                </Descriptions>
                                <Button type="primary">接令</Button>
                            </Card>
                        </Row>
                        <Row className="market-item"> 
                            <Card title="微软前端招聘" bordered={false} className="market-item-card">
                                <div className="call-master">
                                    <Avatar icon='user' src={avatar} alt='avatar' style={{ cursor: 'pointer' }} />
                                    <p style={{margin: "0 10px"}}>bingo</p>
                                </div>
                                <Descriptions column={2}>
                                    <Descriptions.Item label="召集令类型">技术</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2020-01-01</Descriptions.Item>
                                    <Descriptions.Item label="结束日期">2020-12-31</Descriptions.Item>
                                    <Descriptions.Item label="召集令状态">招聘中</Descriptions.Item>
                                    <Descriptions.Item label="召集人数（当前/总数）">18/30</Descriptions.Item>
                                    <Descriptions.Item label="召集令描述">此召集令面向有前端开发经验的应聘人</Descriptions.Item>
                                </Descriptions>
                                <Button type="primary">接令</Button>
                            </Card>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span> <AndroidOutlined />学业探讨</span>} key="study" className="tabs-item">
                        <Row className="market-item">
                            <Card title="北邮学习交流社招聘" bordered={false} className="market-item-card">
                                <div className="call-master">
                                    <Avatar icon='user' src={avatar} alt='avatar' style={{ cursor: 'pointer' }} />
                                    <p style={{margin: "0 10px"}}>bingo</p>
                                </div>
                                <Descriptions column={2}>
                                    <Descriptions.Item label="召集令类型">学习</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2020-01-01</Descriptions.Item>
                                    <Descriptions.Item label="结束日期">2020-12-31</Descriptions.Item>
                                    <Descriptions.Item label="召集令状态">招聘中</Descriptions.Item>
                                    <Descriptions.Item label="召集人数（当前/总数）">18/30</Descriptions.Item>
                                    <Descriptions.Item label="召集令描述">此召集令征集面向所有想讨论学习的个人</Descriptions.Item>
                                </Descriptions>
                                <Button type="primary">接令</Button>
                            </Card>
                        </Row>
                    </TabPane>
                </Tabs>
            </Layout>
        )
    }
}

export default Market