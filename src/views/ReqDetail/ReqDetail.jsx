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


class ReqDetail extends Component {
    state = {
        //控制button是否展示加载状态
        loading: false,
        confirmDirty: false
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
            const token_detail=this.props.location.query.token
            if(token_detail.cur_recruited_nums===token_detail.recruit_nums){
                message.error('人数已满,不能申请');
                return;
            }
            let user=JSON.parse(localStorage.getItem('user'))
            let values={
                req_desc:fieldsValue['content'],
                token_id:this.props.location.query.token.token_id,
                owner_username:this.props.location.query.token.username,
                req_username:user.username
            }
            console.log(values)
            this.registering()
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:'Bearer '+localStorage.getItem('token')
            });
            let url='http://127.0.0.1:8080/tokenReq/create'
            fetch(url,{
                method:'POST',
                headers:myHeaders,
                body:JSON.stringify(values),
                // credentials:"include",
                mode:'cors'
            }).then(res=>res.json()).then(data=>{
                console.log(data)
                if(data.message==='success'){
                    message.success('申请成功')
                    this.props.history.push('/receiver/receiver_info')
                }
                else if (data.message==='禁止接自己发的令'){
                    message.error('禁止接自己发的令')
                    this.setState({
                        loading:false
                    })
                }
                else if (data.message==='你已经接过此令'){
                    message.error('你已经接过此令')
                    this.setState({
                        loading:false
                    })
                }
                else {
                    message.error('申请错误，请稍后重试')
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

        const token_detail=this.props.location.query.token

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
                                <span>
                                    你要申请的召集令名称为:{token_detail.token_name},请填写一下相关信息完成申请
                                </span>
                            </div>

                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                                <Form.Item label='申请描述'>
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '个人简介' }]
                                    })(<Input placeholder='请输入和申请此令相关的信息' />)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={this.state.loading}>
                                        申请
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

export default withRouter(Form.create()(ReqDetail))
