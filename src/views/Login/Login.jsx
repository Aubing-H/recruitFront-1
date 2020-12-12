import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter,Link } from 'react-router-dom'
import '@/style/view-style/login.scss'

class Login extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let myHeaders = new Headers({
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
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
                    mode: 'cors'
                    //转或称字符串格式
                }).then(res=>res.json()).then(
                    data=>{
                        console.log(data);
                        if (data.isSuccess === 'success') {
                            values.auth=data.kind
                            localStorage.setItem('user', JSON.stringify(values))
                            //todo 后期改进token
                            localStorage.setItem('token', data.token)
                            if(data.kind===0){
                                this.props.history.push('/offer_info')
                            }else{
                                this.props.history.push('/users_info')
                            }
                            message.success('登录成功!')
                        } else {
                            // 这里处理一些错误信息
                            message.error("用户名或密码错误")
                            //todo 优化登录失败这里，可以将用户输入的用户名保存下来
                            this.props.history.push('/login')
                            this.setState({
                                loading:false
                            })
                        }
                    }
                )
                this.enterLoading()
            }
        })
    }

    componentDidMount() {
        notification.open({
            message: '欢迎使用后台管理平台',
            duration: 20,
            // description: ''
        })
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>召集令系统</h3>
                        <Divider />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='用户名'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(
                                    <Input
                                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type='password'
                                        placeholder='密码'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    loading={this.state.loading}>
                                    登录
                                </Button>
                                <Link to="/register">
                                    注册
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Login))
