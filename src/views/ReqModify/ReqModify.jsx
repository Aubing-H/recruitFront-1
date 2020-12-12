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
} from 'antd'
import { withRouter } from 'react-router-dom'


class ReqModify extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
    }

    registering = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if(err)return
            const token_detail=this.props.location.query.token_req
            let user=JSON.parse(localStorage.getItem('user'))
            let values={
                req_desc:fieldsValue['content'],
                req_id:token_detail.req_id,
                req_username:token_detail.req_username
            }
            console.log(values)
            this.registering()
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:'Bearer '+localStorage.getItem('token')
            });
            let url='http://127.0.0.1:8080/tokenReq/update'
            fetch(url,{
                method:'POST',
                headers:myHeaders,
                body:JSON.stringify(values),
                // credentials:"include",
                mode:'cors'
            }).then(res=>res.json()).then(data=>{
                console.log(data)
                if(data.message==='success'){
                    message.success('修改成功')
                    this.props.history.push('/receiver/receiver_info')
                }else {
                    message.error('修改错误，请稍后重试')
                    this.setState({
                        loading:false
                    })
                }
            })
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const token_detail=this.props.location.query.token_req

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

                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                                <Form.Item label='申请描述'>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '请填写个人描述' }],
                                        initialValue:token_detail.req_desc
                                    })(<Input  />)}
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

export default withRouter(Form.create()(ReqModify))
