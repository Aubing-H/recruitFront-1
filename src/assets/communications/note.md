用户表

```sql
create table if not exists `user`(
    `user_id` int unsigned auto_increment,
    `username` varchar(30) not null ,
    `password` varchar(30) not null ,
    `user_type` tinyint not null ,
    `name` varchar(10) default null,
    `cardtype` char(5) default '0',
    `cardnum` char(15) default null ,
    `phone` char(11) default null ,
    `user_level` tinyint default 1,
    `content` varchar(100) default null,
    `address` char(5) default null,
    `register_time` DATE ,
    `modify_time` DATE,
    `age` tinyint,
    primary key (user_id)
)ENGINE=Innodb DEFAULT CHARSET=utf8;
```

召集令类

```sql
create table if not exists `Token`(
    `token_id`          int unsigned not null primary key auto_increment,
    `user_id`           int unsigned not null ,
    `username`          varchar(30) not null ,
    `token_type`        enum('tech','academic','social','volunteer','play') default null,
    `token_name`        char(100) not null ,
    `token_desc`        text default null,
    `recruit_nums`      int unsigned default 0,
    `cur_recruited_nums`int unsigned default 0,
    `recruit_end`       DATE,
    `photo`             varchar(100) default null,
    `created_time`      DATE,
    `modified_time`     DATE,
    `state`             enum ('complete','waitresp','cancel','timeout') default 'waitresp'
)ENGINE=Innodb DEFAULT CHARSET =utf8;
```

召集令请求类

```sql
create table if not exists `TokenReq`(
    `req_id`    int unsigned not null primary key auto_increment,
    `token_id`  int unsigned not null,
    `owner_username` varchar(30) not null ,
    `req_username`  varchar(30) not null,       #是否可以使用user_id
    `req_desc`  varchar(100) not null ,
    `created_time` DATE not null,
    `modified_time` DATE default null,
    `state` enum ('complete','waitprocess','cancel','timeout','discarded','accepted') default 'waitprocess'
)ENGINE=Innodb DEFAULT CHARSET =utf8;
```
