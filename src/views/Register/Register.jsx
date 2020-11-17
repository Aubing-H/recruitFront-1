import React, { Component } from 'react'
import {
    Layout,
    Input,
    Icon,
    Form,
    Button,
    Divider,
    message,
    Select,
    Row,
    Col,
    Alert,
    Tooltip,
    Radio, Checkbox, InputNumber, DatePicker
} from 'antd'
import { withRouter } from 'react-router-dom'

const { Option } = Select

class Register extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
        confirmDirty: false,
        visible: true
    }

    registering = () => {
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
            this.registering()
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=utf-8'
            });
            let url='http://127.0.0.1:8080/user/register'
            fetch(url,{
                method:'POST',
                headers:myHeaders,
                body:JSON.stringify(values),
                // credentials:"include",
                mode:'cors'
            }).then(res=>res.text()).then(data=>{
                console.log(data)
                if(data==="success"){
                    message.info('注册成功')
                    this.props.history.push('/login')
                }else{
                    this.setState({loading:false})
                    message.error("注册失败,请联系管理员：yuhang@bupt.edu.cn")
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
        const { getFieldDecorator, getFieldValue } = this.props.form

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{ width: 70 }}>
                <Option value='86'>+86</Option>
                <Option value='87'>+87</Option>
            </Select>
        )


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
                                            用户名&nbsp;
                                            <Tooltip title='可以尽量好听点，真的!'>
                                                <Icon type='question-circle-o' />
                                            </Tooltip>
                                        </span>
                                    }>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名' },
                                            {min:3,message: '用户名长度最少为3'}]
                                    })(<Input placeholder='请输入用户名' />)}
                                </Form.Item>
                                <Form.Item label='性别'>
                                    {getFieldDecorator('sex', {
                                        rules: [{ required: true, message: '请选择性别' }],
                                        initialValue:'man'
                                    })(
                                        <Radio.Group>
                                            <Radio value='man'>男</Radio>
                                            <Radio value='women'>女</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                {/*用户姓名*/}
                                <Form.Item label='姓名'>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入姓名' }]
                                    })(<Input placeholder='请输入姓名' />)}
                                </Form.Item>
                                <Form.Item label='证件类型'>
                                    {getFieldDecorator('cardtype', {
                                        rules: [{ required: true, message: '请选择证件类型' }],
                                        initialValue: '0'
                                    })(
                                        <Radio.Group style={{ width: '100%' }}>
                                            <Radio value='0'>身份证</Radio>
                                            <Radio value='1'>护照</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item label='证件号'>
                                    {getFieldDecorator('cardnum', {
                                        rules: [{ required: true, message: '请输入证件号' }]
                                    })(<Input placeholder='请输入证件号' />)}
                                </Form.Item>
                                <Form.Item label='年龄'>
                                    {getFieldDecorator('age', {
                                        rules: [{ required: true, message: '请输入年龄' }]
                                    })(<InputNumber placeholder='请输入年龄' style={{ width: '100%' }} />)}
                                </Form.Item>
                                <Form.Item label='出生年月'>
                                    {getFieldDecorator('date-picker', {
                                        rules: [{ type: 'object', required: true, message: '请选择日期' }]
                                    })(<DatePicker style={{ width: '100%' }} placeholder='请选择日期' />)}
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
                                            }
                                        ]
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
                                        ]
                                    })(<Input.Password onBlur={this.handleConfirmBlur} placeholder='请确认密码' />)}
                                </Form.Item>
                                <Form.Item label='所在城市'>
                                    {getFieldDecorator('address', {
                                        initialValue: '成都',
                                        rules: [{ required: true, message: '请选择所在城市!' }]
                                    })(
                                        <Select style={{ width: 100 }}>
                                            <Option value='成都'>成都</Option>
                                            <Option value='北京'>北京</Option>
                                        </Select>)}
                                </Form.Item>
                                <Form.Item label='联系电话' extra='你最好写真实的电话号码!'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入联系电话!' },
                                            {min:11,max:11,message: '电话号码为11位'}]
                                    })(<Input addonBefore={prefixSelector} />)}
                                </Form.Item>
                                <Form.Item label='简介'>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '个人简介' }]
                                    })(<Input placeholder='请输入个人简介' />)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked'
                                    })(
                                        <Checkbox>
                                            阅读并理解 <a href='www.baidu.com'>此协议</a>
                                        </Checkbox>
                                    )}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={this.state.loading}
                                        disabled={getFieldValue('agreement') ? false : true}>
                                        注册
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
