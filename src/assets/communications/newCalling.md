### 令主的召集令操作

**'http://127.0.0.1:8080/user/tokensOwner/create'**

request 请求

```json
{
  "user_id": "123456", // 用户识别码
  "token_name": "前端招聘", // 召集令名称
  "token_type": "tech", // 召集令类别['tech', 'academic', 'social', 'volunteer', 'play']
  "token_desc": "这是一个前端招聘", //描述
  "recruit_nums": 30, // 召集人数
  "recruit_end": "2020/12/31", //截止时间
  "created_time": "2020/11/20" //创建时间
}
```

response 服务器返回

```json
{
  "isSuccess": "success", // 创建成功"success", 创建失败"fail"
  "content": {
    // 没创建成功就没有相应的value数据
    "token_id": "122345", // 分配一个id号
    "state": "waitresp", // "waitresp"招聘中，"complete"招聘结束, "cancel", "timeout"
    "cur_recruit_nums": 0 //已经招聘的人数
  }
}
```

**'/user/tokensOwner/delete'**

request

```json
{
  "user_id": "123456", // 用户识别码，密钥
  "token_id": "123456" // 召集令标识
}
```

response

```json
{
  "isSuccess": "success" // 创建成功"success", 创建失败"fail"
}
```

**'/user/tokensOwner/update'**

request

```json
{
  "usr_id": "1234567", // 用户识别码，密钥
  "token_id": "123456", // 召集令标识
  "token_name": "前端招聘", // 召集令名称
  "token_type": "tech", // 召集令类别['tech', 'study', 'socialize', 'volunteer', 'play']
  "token_desc": "这是一个前端招聘", //描述
  "recruit_nums": 30, // 拟召集人数
  "recruit_end": "2020/12/31" //截止时间
}
```

response

```json
{
  "isSuccess": "success" // 更新成功"success", 更新失败"fail"
}
```

**'localhost:8080/user/tokenOwner/search'**

request

```json
{
  "usr_id": "1234567", // 用户识别码，密钥
  "token_type": "", // 查询条件：召集令类型，""表示匹配所有
  "state": "waitresp", // 查询条件：召集令状态，""表示匹配所有
  "searchKey": "前端" // 查询条件：召集令名称的关键字搜索，""表示匹配所有
}
```

response

```json
[
  // 返回一个json数组，查不到就返回一个空数组
  {
    "token_id": "123456", //召集令识别码
    "token_name": "腾讯前端招聘",
    "created_time": "2020-03-04",
    "recruit_end": "2020-12-15",
    "state": "waitresp",
    "recruit_nums": 30,
    "cur_recruited_nums": 18,
    "token_desc": "description"
  }
]
```

### 'localhost:8080/user/tokenOwner/{username}'

request get

```json
[
  // 返回一个json数组，查不到就返回一个空数组
  {
    "token_id": "123456", //召集令识别码
    "token_name": "腾讯前端招聘",
    "token_type": "tech",
    "created_time": "2020-03-04",
    "recruit_end": "2020-12-15",
    "state": "waitresp",
    "recruit_nums": 30,
    "cur_recruited_nums": 18,
    "token_desc": "description"
  }
]
```

### 'localhost:8080/user/tokenOwner/token/{token_id}'

request get

```json
{
  "usr_id": "1234567", // 用户识别码，密钥
  "token_id": "123456", // 召集令标识
  "token_name": "前端招聘", // 召集令名称
  "token_type": "tech", // 召集令类别['tech', 'study', 'socialize', 'volunteer', 'play']
  "token_desc": "这是一个前端招聘", //描述
  "recruit_nums": 30, // 拟召集人数
  "cur_recruited_nums": 18, //当前召集人数
  "created_time": "2020/01/02", //创建时间
  "modified_time": "2020/08/19", //最近修改时间
  "recruit_end": "2020/12/31" //截止时间
}
```
