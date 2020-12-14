import React, { Component } from 'react'
import {Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message} from 'antd'
import '@/style/view-style/table.scss'
import Moment from 'moment'

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        // render: text => <Button type='link'>{text}</Button>
    },
    {
        title: '已花费',
        dataIndex: 'total',
        key: 'total',
    }
]
class TollsUser extends Component{
    state ={
        data: []
    }

    componentDidMount() {
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url='http://127.0.0.1:8080/toll/byUser'
        fetch(url,{
            method:'GET',
            headers: myHeaders,
            mode: 'cors'
            //转或称字符串格式
        }).then(res=>res.json()).then(
            data=>{
                console.log(data);
                this.setState({
                    data:data
                })
            }
        )

    }

    render() {
        return(
            <Layout className='animated fadeIn'>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>用户信息</h3>
                            <Divider />
                            <Table columns={columns} dataSource={this.state.data} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default TollsUser
