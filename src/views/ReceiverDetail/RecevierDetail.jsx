import React, { Component } from 'react'
import {
    Layout,
    Input,
    Form,
    Button,
    Divider,
    message,
    Select,
    Row,
    Col,
    Alert,
    Radio, InputNumber
} from 'antd'
import { withRouter } from 'react-router-dom'

const { Option } = Select

class RecevierDetail extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
        confirmDirty: false,
        visible: true,
        user_info:{}
    }
    getUserInfo(){
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain',
            Authorization:'Bearer '+localStorage.getItem('token')
        });
        let url='http://127.0.0.1:8080/user/info'
        let username=this.props.location.query.username
        let values={
            username:username
        }
        if (values) {
            let paramsArray = [];
            //拼接参数
            Object.keys(values).forEach(key => paramsArray.push(key + '=' + values[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        fetch(url,{
            method:'POST',
            headers: myHeaders,
            mode: 'cors'
            //转或称字符串格式
        }).then(res=>res.json()).then(
            data=>{
                console.log(data);
                if (data.isSuccess === 'success') {
                    this.setState({
                        user_info:data.user
                    })
                } else {
                    // 这里处理一些错误信息
                    message.error("获取用户信息失败")
                    // history.back()
                    this.props.history.push('/offers_info')
                }
            }
        )
    }
    componentWillMount() {
        this.getUserInfo()
    }


    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0
                },
                sm: {
                    span: 10,
                    offset: 6
                }
            }
        }


        return (
            <Layout className='animated fadeIn'>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Divider orientation='left'>个人信息</Divider>
                            <Form {...formItemLayout}>
                                {/*登录的用户名*/}
                                <Form.Item
                                    label={
                                        <span>
                                            用户名
                                        </span>
                                    }>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名' },
                                            {min:3,message: '用户名长度最少为3'}],
                                        initialValue:this.state.user_info.username
                                    })(<Input disabled={true}/>)}
                                </Form.Item>
                                {/*用户姓名*/}
                                <Form.Item label='姓名'>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入姓名' }],
                                        initialValue:this.state.user_info.name
                                    })(<Input disabled={true} />)}
                                </Form.Item>
                                <Form.Item label='证件类型'>
                                    {getFieldDecorator('cardtype', {
                                        rules: [{ required: true, message: '请选择证件类型' }],
                                        initialValue: this.state.user_info.cardtype
                                    })(
                                        <Radio.Group style={{ width: '100%' }} disabled={true}>
                                            <Radio value='0' >身份证</Radio>
                                            <Radio value='1' >护照</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item label='证件号'>
                                    {getFieldDecorator('cardnum', {
                                        rules: [{ required: true, message: '请输入证件号' }],
                                        initialValue:this.state.user_info.cardnum
                                    })(<Input disabled={true} />)}
                                </Form.Item>
                                <Form.Item label='年龄'>
                                    {getFieldDecorator('age', {
                                        rules: [{ required: true, message: '请输入年龄' }],
                                        initialValue:this.state.user_info.age
                                    })(<InputNumber disabled={true} style={{ width: '100%' }} />)}
                                </Form.Item>
                                <Form.Item label='所在城市'>
                                    {getFieldDecorator('address', {
                                        initialValue: this.state.user_info.address,
                                        rules: [{ required: true, message: '请选择所在城市!' }]
                                    })(
                                        <Select style={{ width: 100 }} disabled={true}>
                                            <Option value='成都'>成都</Option>
                                            <Option value='北京'>北京</Option>
                                        </Select>)}
                                </Form.Item>
                                <Form.Item label='联系电话'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入联系电话!' },
                                            {min:11,max:11,message: '电话号码为11位'}],
                                        initialValue:this.state.user_info.phone
                                    })(<Input disabled={true}/>)}
                                </Form.Item>
                                <Form.Item label='简介'>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '个人简介' }],
                                        initialValue:this.state.user_info.content
                                    })(<Input disabled={true} />)}
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(RecevierDetail))
