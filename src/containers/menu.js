const menu = [
    // {
    //     key: '/index',
    //     title: '首页',
    //     icon: 'home',
    //     auth: [0,1]
    // },
    {
        key: '/users_info',
        title: '用户信息',
        icon: 'user',
        auth: [1]
    },
    {
        key: '/offer_info',
        title: '我是令主',
        icon: 'bulb',
        auth: [0]
    },
    {
        key: '/tokens_info',
        title: '召集令信息',
        icon: 'appstore',
        auth: [1]
    },
    {
        key: '/reqs_info',
        title: '召集令请求信息',
        icon: 'paper-clip',
        auth: [1]
    },
    {
        key: '/profit_info',
        title: '收益信息',
        icon: 'pie-chart',
        auth: [1]
    },
    {
        key: '/byuser',
        title: '按用户排序的收费信息',
        icon: 'pie-chart',
        auth: [1]
    },
    {
        key: '/personal_info',
        title: '个人信息',
        icon: 'user',
        auth: [0]
    },
    // {
    //     key: '/owner',
    //     title: '我是令主',
    //     icon: 'appstore',
    //     auth: [0]
    // },
    {
        key: '/receiver',
        title: '我要接令',
        icon: 'form',
        auth: [0],
        subs: [{ title: '查询召集令', key: '/receiver/receiver_info', icon: '',auth: [0] }, { title: '已接令', key: '/receiver/myall', icon: '',auth: [0] }]
    },
    // {
    //     title: '通用',
    //     key: '/public',
    //     icon: 'appstore',
    //     auth: [1],
    //     subs: [{ title: '按钮', key: '/public/button', icon: '' }, { title: '图标', key: '/public/icon', icon: '' }]
    // },
    // {
    //     title: '导航',
    //     key: '/nav',
    //     icon: 'bulb',
    //     subs: [
    //         { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
    //         { title: '导航菜单', key: '/nav/menu', icon: '' },
    //         { title: '步骤条', key: '/nav/steps', icon: '' }
    //     ]
    // },
    // {
    //     title: '表单',
    //     key: '/form',
    //     icon: 'form',
    //     subs: [
    //         { title: '基础表单', key: '/form/base-form', icon: '' },
    //         { title: '步骤表单', key: '/form/step-form', icon: '' }
    //     ]
    // },
    // {
    //     title: '展示',
    //     key: '/show',
    //     icon: 'pie-chart',
    //     subs: [
    //         { title: '表格', key: '/show/table', icon: '' },
    //         { title: '折叠面板', key: '/show/collapse', icon: '' },
    //         { title: '树形控件', key: '/show/tree', icon: '' },
    //         { title: '标签页', key: '/show/tabs', icon: '' }
    //     ]
    // },
    // {
    //     title: '其它',
    //     key: '/others',
    //     icon: 'paper-clip',
    //     auth: [1],
    //     subs: [
    //         { title: '进度条', key: '/others/progress', icon: '' },
    //         { title: '动画', key: '/others/animation', icon: '' },
    //         { title: '上传', key: '/others/upload', icon: '' },
    //         { title: '富文本', key: '/others/editor', icon: '' },
    //         { title: '404', key: '/404', icon: '' },
    //         { title: '500', key: '/500', icon: '' }
    //     ]
    // },
    // {
    //     title: '多级导航',
    //     key: '/one',
    //     icon: 'bars',
    //     subs: [
    //         {
    //             title: '二级',
    //             key: '/one/two',
    //             icon: '',
    //             subs: [{ title: '三级', key: '/one/two/three', icon: '' }]
    //         }
    //     ]
    // },
    {
        title: '关于',
        key: '/about',
        icon: 'user',
        auth: [1]
    }
]

export default menu
