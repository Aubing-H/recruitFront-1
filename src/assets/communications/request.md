Tokenreq

1 查看当前所有可以接到的令

```json
method:GET
url:/tokenReq/allToken
request:{

}
response:
{
    "code":200,
    "message":"success",
    "data":[
    	{
    		"token_id": "123456", //召集令识别码
        	"token_name": "腾讯前端招聘",
	        "created_time": "2020-03-04",
    	    "recruit_end": "2020-12-15",
        	"state": "waitresp",
        	"recruit_nums": 30,
        	"cur_recruited_nums": 18,
        	"token_desc": "description"
		},
		{
            ...
        }
    ]
}
```

2 查看自己的所有请求

```json
method:GET
url:/tokenReq/myReq
request:{
    "req_username":"xxx"   //请求的用户名
}
response:
{
    "code":200,
    "message":"success",
    "data":[
        {
            "req_id":123,
            "token_id":123,
            "owner_username":"111",
            "req_desc":"shisha",
            "created_time":xx-xx-xx,
            "modified_time":xx-xx-xx,
            "state":"waitprocess"
        }
    ]
}
```

3 提交自己的召集令请求

```json
method:POST
url:/tokenReq/create
request:
{
	"token_id":123,
    "owner_username":"fabuzhe",
    "req_username":"wzla",
    "req_desc":"wo yao jieling a",
    "state":"waitprocess"
}

response:
{
    "code":200,
    "message":"success",
    "data":null   //null的时候这个字段在返回里面是不存在的
}
```
