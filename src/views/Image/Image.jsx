import React from 'react'
import {Form,Input,Button} from 'antd'


class Image extends React.Component{
    uploadImage() {
        let image=document.getElementById('file')
        let myHeaders= new Headers({
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'multipart/form-data'
        })
        let fd =new FormData()
        console.log(image[0].files[0])
        fd.append('file',image[0].files[0])
        console.log("weism")
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
        // <Form onSubmit={this.uploadImage}>
        //     <Form.Item>
        //         <Input type='file' name='file'/>
        //     </Form.Item>
        //     <Form.Item>
        //         <Button type='primary'
        //         htmlType='submit'>
        //             提交
        //         </Button>
        //     </Form.Item>
        // </Form>

        return (
            <form action={this.uploadImage}>
                <input type='file' id='file'/>
                <button type='submit'>提交</button>
            </form>

        )
    }
}

export default Image
