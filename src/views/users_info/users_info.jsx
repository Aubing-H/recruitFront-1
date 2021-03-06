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
        title: '用户姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '城市',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '用户等级',
        key: 'user_level',
        dataIndex: 'user_level',
        render: user_level => {
            let color='green'
            let level='一般'
            switch (user_level) {
                case 2: color='blue'
                    level='重要'
                    break
                case 3:color='red'
                    level='钻石'
                    break
            }
            console.log(color)
            return (
                <Tag color={color} key={level}>
                    {level}
                </Tag>
            )
        }
    },
    {
        title: '证件类型',
        key: 'cardtype',
        dataIndex: 'cardtype',
        render:cardtype =>{
            let type='身份证'
            switch (cardtype) {
                case 1: type='护照'
                    break
                default:type='身份证'
            }
            return (
                <span>
                    {type}
                </span>
            )

        }
    },
    {
        title: '证件号码',
        key: 'cardnum',
        dataIndex: 'cardnum',
    },
    {
        title: '电话',
        key: 'phone',
        dataIndex: 'phone',
    },
    {
        title: '注册时间',
        key: 'register_time',
        dataIndex: 'register_time',
        render:register_time=>{
            return Moment(register_time).format("YYYY-MM-DD")
        }
    },
    {
        title: '个人简介',
        key: 'content',
        dataIndex: 'content',
    },
    {
        title: '修改时间',
        key: 'modify_time',
        dataIndex: 'modify_time',
        render:modify_time=>{
            if(modify_time!==null){
                return Moment(modify_time).format("YYYY-MM-DD")
            }
        }
    }
]
class UsersView extends Component{
    state ={
        usersData: []
    }

    componentDidMount() {
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url='http://127.0.0.1:8080/user/all'
        fetch(url,{
            method:'GET',
            headers: myHeaders,
            mode: 'cors'
            //转或称字符串格式
        }).then(res=>res.json()).then(
            data=>{
                console.log(data);
                let newData=[]
                if (data.isSuccess === 'success') {
                    data.user.map((a,index)=>{
                        // let register_time=new Date(a.register_time)
                        // a={...a,
                        //     register_time:register_time.toDateString()+register_time.toTimeString()
                        // }
                        // if(a.modify_time!==null){
                        //     let modify_time=new Date(a.modify_time)
                        //     a={...a,
                        //         modify_time:modify_time.toDateString()+modify_time.toTimeString()
                        //     }
                        // }
                        newData.push(a)
                    })
                    console.log(newData)
                    this.setState({
                        usersData:newData
                    })
                } else {
                    message.error('获取用户信息失败，请刷新页面')
                }
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
                            <Table columns={columns} dataSource={this.state.usersData} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default UsersView
