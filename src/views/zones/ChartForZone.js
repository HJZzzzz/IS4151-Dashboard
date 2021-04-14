import React, { lazy, useState, useEffect } from 'react'
import {
  CSelect,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardGroup,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CDataTable,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ReactECharts from 'echarts-for-react';

import { DocsLink } from 'src/reusable'

import usersData from '../users/UsersData'
import 'antd/dist/antd.css';

const ChartForZone = (props) => {

    const [options,setOptions] = useState({})
    const [data,setData] = useState([])
    // const [visit,setVisist] = useState([])
    // const [asist,setAssit] = useState([])
    useEffect(()=>{
        console.log(props)
        setData(props.data)
        // setVisist(props.data.visit)
        // setAssit(props.data.asist)
    },[props.data])
    return (
        <>
            <ReactECharts option={{
                title: {
                    text: 'Visit&Assistance in a day',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Visit','Assistance']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'No. Visit',
                        type: 'bar',
                        data: data.visit,
                        markPoint: {
                            data: [
                                {type: 'max', name: 'Max'},
                                {type: 'min', name: 'Min'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: 'Avg'}
                            ]
                        }
                    },
                    {
                        name: 'No. Assistance',
                        type: 'bar',
                        data: data.assist,
                        markPoint: {
                            data: [
                                {type: 'max', name: 'Max'},
                                {type: 'min', name: 'Min'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: 'Avg'}
                            ]
                        }
                    }
                ]
            }} />
        </>
    )
}

export default ChartForZone
