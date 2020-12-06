import loadable from "@/utils/loadable";

const Index = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Index")
);

// 通用
const ButtonView = loadable(() =>
  import(/* webpackChunkName: 'button' */ "@/views/PublicView/Button")
);
const IconView = loadable(() =>
  import(/* webpackChunkName: 'icon' */ "@/views/PublicView/Icon")
);

// 导航
const DropdownView = loadable(() =>
  import(/* webpackChunkName: 'dropdown' */ "@/views/NavView/Dropdown")
);
const MenuView = loadable(() =>
  import(/* webpackChunkName: 'menu' */ "@/views/NavView/Menu")
);
const StepView = loadable(() =>
  import(/* webpackChunkName: 'step' */ "@/views/NavView/Step")
);

// 表单
const FormBaseView = loadable(() =>
  import(/* webpackChunkName: 'formBase' */ "@/views/FormView/FormBaseView")
);
const FormStepView = loadable(() =>
  import(/* webpackChunkName: 'formStep' */ "@/views/FormView/FormStepView")
);

// 展示
const TableView = loadable(() =>
  import(/* webpackChunkName: 'table' */ "@/views/ShowView/Table")
);
const CollapseView = loadable(() =>
  import(/* webpackChunkName: 'collapse' */ "@/views/ShowView/Collapse")
);
const TreeView = loadable(() =>
  import(/* webpackChunkName: 'tree' */ "@/views/ShowView/Tree")
);
const TabsView = loadable(() =>
  import(/* webpackChunkName: 'tabs' */ "@/views/ShowView/Tabs")
);

// 其它
const ProgressView = loadable(() =>
  import(/* webpackChunkName: 'progress' */ "@/views/Others/Progress")
);
const AnimationView = loadable(() =>
  import(/* webpackChunkName: 'animation' */ "@/views/Others/Animation")
);
const EditorView = loadable(() =>
  import(/* webpackChunkName: 'editor' */ "@/views/Others/Editor")
);
const UploadView = loadable(() =>
  import(/* webpackChunkName: 'upload' */ "@/views/Others/Upload")
);

const Three = loadable(() =>
  import(/* webpackChunkName: 'three' */ "@/views/TestView")
);
const About = loadable(() =>
  import(/* webpackChunkName: 'about' */ "@/views/About")
);

const personal_info = loadable(() =>
  import(/* webpackChunkName: 'about' */ "@/views/Personal_info")
);
const receiver_find = loadable(() =>
  import(/* webpackChunkName: 'about' */ "@/views/job_finder")
);
const caller_view = loadable(() => import(/*  */ "@/views/CallerView"));
const Calling = loadable(() => import(/*  */ "@/views/Calling"));
const CallingInfo = loadable(() => import(/*  */ "@/views/CallingInfo"));
const CallingModify = loadable(() => import(/*  */ "@/views/CallingModify"));
const CallingDetails = loadable(() => import(/*  */ "@/views/CallingDetails"));

const routes = [
  { path: "/index", exact: true, name: "Index", component: Index, auth: [1] },
  {
    path: "/public/button",
    exact: false,
    name: "按钮",
    component: ButtonView,
    auth: [1]
  },
  {
    path: "/public/icon",
    exact: false,
    name: "图标",
    component: IconView,
    auth: [1]
  },
  {
    path: "/nav/dropdown",
    exact: false,
    name: "下拉菜单",
    component: DropdownView
  },
  { path: "/nav/menu", exact: false, name: "下拉菜单", component: MenuView },
  { path: "/nav/steps", exact: false, name: "步骤条", component: StepView },
  {
    path: "/form/base-form",
    exact: false,
    name: "表单",
    component: FormBaseView
  },
  {
    path: "/form/step-form",
    exact: false,
    name: "表单",
    component: FormStepView
  },
  { path: "/show/table", exact: false, name: "表格", component: TableView },
  {
    path: "/show/collapse",
    exact: false,
    name: "折叠面板",
    component: CollapseView
  },
  { path: "/show/tree", exact: false, name: "树形控件", component: TreeView },
  { path: "/show/tabs", exact: false, name: "标签页", component: TabsView },
  {
    path: "/others/progress",
    exact: false,
    name: "进度条",
    component: ProgressView,
    auth: [1]
  },
  {
    path: "/others/animation",
    exact: false,
    name: "动画",
    component: AnimationView,
    auth: [1]
  },
  {
    path: "/others/editor",
    exact: false,
    name: "富文本",
    component: EditorView,
    auth: [1]
  },
  {
    path: "/others/upload",
    exact: false,
    name: "上传",
    component: UploadView,
    auth: [1]
  },
  { path: "/one/two/three", exact: false, name: "三级", component: Three },
  { path: "/about", exact: false, name: "关于", component: About, auth: [1] },
  {
    path: "/personal_info",
    exact: false,
    name: "个人信息",
    component: personal_info,
    auth: [0, 1]
  },
  {
    path: "/receiver/find",
    exact: false,
    name: "召集令查询",
    component: receiver_find,
    auth: [0, 1]
  },
  {
    path: "/owner",
    exact: false,
    name: "我是令主",
    component: caller_view,
    auth: [0, 1]
  },
  {
    path: "/offer_info",
    exact: false,
    name: "召集令信息",
    component: Calling,
    auth: [0, 1]
  },
  {
    path: "/calling_info",
    exact: false,
    name: "新建召集令",
    component: CallingInfo,
    auth: [0, 1]
  },
  {
    path: "/calling_modify",
    exact: false,
    name: "修改召集令",
    component: CallingModify,
    auth: [0, 1]
  },
  {
    path: "/calling_details",
    exact: false,
    name: "召集令详情",
    component: CallingDetails,
    auth: [0, 1]
  }
];

export default routes;
