import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import PropTypes from "prop-types";
import Moment from 'moment'

class TollLine extends Component {
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('tollline'))
        let dates=[]
        let i=1
        for(let temp=this.props.start_date;temp<=this.props.end_date;){
            dates.push(Moment(temp).format('YYYY-MM-DD'))
            temp=Moment(temp).add(1,'days')
            console.log(temp)
            if(i>10){
                break
            }
            i++;
        }
        console.log(dates)
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
                data: ['2020-12-10', '2020-12-11', '2020-12-12']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '技术交流',
                    type: 'line',
                    data: [120, 132, 101]
                },
                {
                    name: '公益志愿者',
                    type: 'line',
                    data: [120, 132, 101]
                },
                {
                    name: '游玩',
                    type: 'line',
                    data: [120, 132, 101]
                },
                {
                    name: '学术探讨',
                    type: 'line',
                    data: [220, 182, 191]
                },
                {
                    name: '社会实践',
                    type: 'line',
                    data: [150, 232, 201]
                }
            ]
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        return <div id='tollline' style={{ height: 300 }}></div>
    }
}
TollLine.propTypes = {
    data:PropTypes.array,
}

export default TollLine
