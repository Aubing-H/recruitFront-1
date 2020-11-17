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

class Register extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
        confirmDirty: false,
        visible: true,
        user_info:{
            username:'test',
            password:'1234',
            name:'yh',
            cardtype:0,
            cardnum:'1234',
            phone:'11111111111',
            content:'for test first',
            address:'成都',
            age:12,


        }
    }

    modifying = () => {
        this.setState({
            loading: true
        })
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if(err)return
            const values={
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'] ? fieldsValue['date-picker'].format('YYYY-MM-DD') : ''
            }
            console.log(values)
            this.modifying()
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=utf-8'
            });
            let url='http://127.0.0.1:8080/user/modify'
            fetch(url,{
                method:'POST',
                headers:myHeaders,
                body:JSON.stringify(values),
                // credentials:"include",
                mode:'cors'
            }).then(res=>res.text()).then(data=>{
                console.log(data)
                if(data==="success"){
                    message.info('修改成功')
                    //重新调用此界面
                    this.props.history.push('/personal_info')
                }else{
                    this.setState({loading:false})
                    message.error("修改失败,请联系管理员：yuhang@bupt.edu.cn")
                }
            })
        })
    }
    //确认密码相关的三个函数，如下:
    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!')
        } else {
            callback()
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
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
                            <div>
                                {this.state.visible ? (
                                    <Alert
                                        message='请认真填写表格信息，有助于让更多人了解你'
                                        type='warning'
                                        closable
                                        banner
                                        afterClose={this.handleClose}
                                    />
                                ) : null}
                            </div>
                            <Divider orientation='left'>个人信息</Divider>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                {/*登录的用户名*/}
                                <Form.Item
                                    label={
                                        <span>
                                            用户名
                                        </span>
                                    }>
                                    <Input disabled={true} value={this.state.user_info.username}/>
                                </Form.Item>
                                {/*用户姓名*/}
                                <Form.Item label='姓名'>
                                    <Input disabled={true} value={this.state.user_info.name}/>
                                </Form.Item>
                                <Form.Item label='证件类型'>
                                    <Radio.Group style={{ width: '100%' }} value={this.state.user_info.cardtype}>
                                        <Radio value='0' disabled={true}>身份证</Radio>
                                        <Radio value='1' disabled={true}>护照</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label='证件号'>
                                    <Input disabled={true} value={this.state.user_info.cardnum}/>
                                </Form.Item>
                                <Form.Item label='年龄'>
                                    <InputNumber disabled={true} value={this.state.user_info.age} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label='密码' hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码!'
                                            },
                                            {
                                                validator: this.validateToNextPassword
                                            },
                                        ],
                                        initialValue:this.state.user_info.password
                                    })(<Input.Password placeholder='请输入密码' />)}
                                </Form.Item>
                                <Form.Item label='确认密码' hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请确认密码!'
                                            },
                                            {
                                                validator: this.compareToFirstPassword
                                            }
                                        ],
                                        initialValue:this.state.user_info.password
                                    })(<Input.Password onBlur={this.handleConfirmBlur} placeholder='请确认密码' />)}
                                </Form.Item>
                                <Form.Item label='所在城市'>
                                    <Select style={{ width: 100 }} disabled={true} value={this.state.user_info.address}>
                                        <Option value='成都'>成都</Option>
                                        <Option value='北京'>北京</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label='联系电话' extra='你最好写真实的电话号码!'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入联系电话!' },
                                            {min:11,max:11,message: '电话号码为11位'}],
                                        initialValue:this.state.user_info.phone
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='简介'>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '个人简介' }],
                                        initialValue:this.state.user_info.content
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={this.state.loading}>
                                        修改
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Register))
