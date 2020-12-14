import React from 'react'
import {Form,Input,Button,Layout,Row,Col} from 'antd'
import {withRouter} from 'react-router-dom'


class Image extends React.Component{
    uploadImage(e) {
        e.preventDefault()
        let myHeaders= new Headers({
            'Access-Control-Allow-Origin': '*',
            Authorization:'Bearer '+localStorage.getItem('token')
            // 'Content-Type': 'multipart/form-data'
        })
        let fd =new FormData(e.target)
        console.log(fd)
        fetch("http://127.0.0.1:8080/upload/image",{
            method:'POST',
            mode:'cors',
            headers:myHeaders,
            body:fd
        }).then(res=>res.text()).then(data=>{
            console.log(data)
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            // <form action={this.uploadImage}>
            //     <input type='file' id='file'/>
            //     <button type='submit'>提交</button>
            // </form>
            <Layout>
                <Row>
                    <Col>
                        <Form onSubmit={this.uploadImage}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请选择图片' }]
                                })(<Input type='file' name='file'/>)}
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary'
                                        htmlType='submit'>
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </Layout>


        )
    }
}

export default withRouter(Form.create(Image))
