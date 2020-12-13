import React, { Component } from 'react'
import {Layout, Row, Col, Icon, Divider, Form, DatePicker, Button, Select, message} from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

import FinishiLine from "./FinishiLine";
import TollLine from "./TollLine";
import {Link, withRouter} from "react-router-dom";
import Moment from 'moment'
import echarts from "echarts/lib/echarts";

const { Option } = Select;

class ProfitView extends Component {
    state = {
        start_date: '',
        end_date:'',
        loading:false,
        show:false,
        tollSummaries:{}
    };
    putStart = (time) => {
        this.setState({ start_date: time });
    };
    putEnd = (time) => {
        this.setState({ end_date: time });
    };
    registering = () => {
        this.setState({
            loading: true
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            const values={
                ...fieldsValue,
                start_date: fieldsValue['start_date'].format('YYYY-MM-DD'),
                end_date:fieldsValue['end_date'].format('YYYY-MM-DD')
            }
            console.log(values)
            this.registering()
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:'Bearer '+localStorage.getItem('token')
            });
            let url='http://127.0.0.1:8080/tollsummary/rangedate'
            fetch(url,{
                method:'POST',
                headers:myHeaders,
                body:JSON.stringify(values),
                mode:'cors'
            }).then(res=>res.json()).then(data=>{
                this.setState({
                    tollSummaries:data.tollSummaries
                })
                this.showChart()
            })
            this.setState({
                loading:false
            })
        })
    }
    finishLine(dates){
        let myChart = echarts.init(document.getElementById('finishline'))
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['技术交流','学术探讨', '社会实践','公益志愿者','游玩']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dates
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '技术交流',
                    type: 'line',
                    data: this.getTollFinishByType('tech',dates)
                },
                {
                    name: '公益志愿者',
                    type: 'line',
                    data: this.getTollFinishByType('volunteer',dates)
                },
                {
                    name: '游玩',
                    type: 'line',
                    data: this.getTollFinishByType('play',dates)
                },
                {
                    name: '学术探讨',
                    type: 'line',
                    data: this.getTollFinishByType('academic',dates)
                },
                {
                    name: '社会实践',
                    type: 'line',
                    data: this.getTollFinishByType('social',dates)
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    getTollTotalByType(type,dates){
        const res=[]
        const data=this.state.tollSummaries
        for(let i=0; i< dates.length;++i){
            let tempD=dates[i]
            if(type in data && tempD in data[type]){
                res.push(data[type][tempD].total)
            }else{
                res.push(0)
            }
        }
        return res
    }
    getTollFinishByType(type,dates){
        const res=[]
        const data=this.state.tollSummaries
        for(let i=0; i< dates.length;++i){
            let tempD=dates[i]
            //fixme type也是有可能没有的，还是要判断type是否在data里
            if(type in data && tempD in data[type]){
                res.push(data[type][tempD].finish_num)
            }else{
                res.push(0)
            }
        }
        return res
    }
    tollLine(dates){
        let myChart = echarts.init(document.getElementById('tollline'))
        // this.state.tollSummaries['tech']['2020-12-10']
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['技术交流','学术探讨', '社会实践','公益志愿者','游玩']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dates
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '技术交流',
                    type: 'line',
                    data: this.getTollTotalByType('tech',dates)
                },
                {
                    name: '公益志愿者',
                    type: 'line',
                    data: this.getTollTotalByType('volunteer',dates)
                },
                {
                    name: '游玩',
                    type: 'line',
                    data: this.getTollTotalByType('play',dates)
                },
                {
                    name: '学术探讨',
                    type: 'line',
                    data: this.getTollTotalByType('academic',dates)
                },
                {
                    name: '社会实践',
                    type: 'line',
                    data: this.getTollTotalByType('social',dates)
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    showChart() {
        let dates=[]
        let i=1
        for(let temp=this.state.start_date;temp<=this.state.end_date;){
            dates.push(Moment(temp).format('YYYY-MM-DD'))
            temp=Moment(temp).add(1,'days')
            if(i>10){
                break
            }
            i++;
        }
        this.finishLine(dates)
        this.tollLine(dates)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='index animated fadeIn'>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="开始时间">
                            {getFieldDecorator("start_date", {
                                rules: [{ required: true, message: "请选择开始时间" }],
                                initialValue: ""
                            })(
                                <DatePicker
                                    onChange={this.putStart}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator("end_date", {
                                rules: [{ required: true, message: "请输入截止时间" }],
                                initialValue: ""
                            })(
                                <DatePicker
                                    onChange={this.putEnd}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label='所在城市'>
                            {getFieldDecorator('address', {
                                initialValue: '成都',
                                rules: [{ required: true, message: '请选择所在城市!' }]
                            })(
                                <Select style={{ width: 100 }}>
                                    <Option value='成都'>成都</Option>
                                    <Option value='北京'>北京</Option>
                                </Select>)}
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                           <div id='tollline' style={{ height: 300}} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <div id='finishline' style={{ height: 300 }}/>
                        </div>
                    </Col>
                </Row>
                {/*<this.AllLine show={this.state.show}/>*/}
                {/*    <Row gutter={8}>*/}
                {/*        <Col span={12}>*/}
                {/*            <div className='base-style'>*/}
                {/*                <TollLine data={this.state.tollSummaries} start_date={this.state.start_date} end_date={this.state.end_date}/>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*        <Col span={12}>*/}
                {/*            <div className='base-style'>*/}
                {/*                <FinishiLine data={this.state.tollSummaries} start_date={this.state.start_date} end_date={this.state.end_date}/>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
            </Layout>
        )
    }
}

export default withRouter(Form.create()(ProfitView))
