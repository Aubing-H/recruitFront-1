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
    Radio, Checkbox, InputNumber, DatePicker, AutoComplete, Cascader, Rate, Switch, Slider
} from 'antd'
import { withRouter,Link } from 'react-router-dom'

const { Option } = Select

class Register extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
        confirmDirty: false,
        autoCompleteResult: [],
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password } = values
                let myHeaders = new Headers({
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'text/plain'
                });
                let url='http://127.0.0.1:8080/user/login'
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
                    method:'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    //转或称字符串格式
                }).then(res=>res.json()).then(
                    data=>{
                        console.log(data);
                        if (data.isSuccess === 'success') {
                            values.auth=data.kind
                            localStorage.setItem('user', JSON.stringify(values))
                            localStorage.setItem('token', data.token)
                            this.props.history.push('/')
                            message.success('登录成功!')
                        } else {
                            // 这里处理一些错误信息
                            message.error("密码或用户名错误")
                            //todo 优化登录失败这里，可以将用户输入的用户名保存下来
                            this.props.history.push('/login')
                        }
                    }
                )
                this.registering()
            }
        })
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
                                        rules: [{ required: true, message: '请输入用户名' }]
                                    })(<Input placeholder='请输入用户名' />)}
                                </Form.Item>
                                <Form.Item label='性别'>
                                    {getFieldDecorator('sex', {
                                        rules: [{ required: true, message: '请选择性别' },
                                            {min:3,message: '用户名长度最少为3'}]
                                    })(
                                        <Radio.Group>
                                            <Radio value='man'>男</Radio>
                                            <Radio value='women'>女</Radio>
                                            <Radio value='unknow'>不详</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                {/*用户姓名*/}
                                <Form.Item label='姓名'>
                                    {getFieldDecorator('Name', {
                                        rules: [{ required: true, message: '请输入姓名' }]
                                    })(<Input placeholder='请输入姓名' />)}
                                </Form.Item>
                                <Form.Item label='证件类型'>
                                    {getFieldDecorator('cardtype', {
                                        rules: [{ required: true, message: '请选择证件类型' }],
                                        initialValue: ['身份证']
                                    })(
                                        <Checkbox.Group style={{ width: '100%' }}>
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox value='身份证'>身份证</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value='护照'>
                                                        护照
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    )}
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
                                {/*<Form.Item label='家庭住址'>*/}
                                {/*    {getFieldDecorator('adress', {*/}
                                {/*        initialValue: ['sichuan', 'chengdu', 'gaoxin'],*/}
                                {/*        rules: [{ type: 'array', required: true, message: '请选择住址!' }]*/}
                                {/*    })(<Cascader options={residences} placeholder='请选择住址' />)}*/}
                                {/*</Form.Item>*/}
                                <Form.Item label='联系电话' extra='你最好写真实的电话号码!'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入联系电话!' }]
                                    })(<Input addonBefore={prefixSelector} />)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked'
                                    })(
                                        <Checkbox>
                                            阅读并理解 <a href='#'>此协议</a>
                                        </Checkbox>
                                    )}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
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
