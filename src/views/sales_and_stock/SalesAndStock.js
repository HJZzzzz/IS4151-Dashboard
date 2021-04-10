import React, { lazy, useState, useEffect } from 'react'
import {
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

const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
const fields = ['name','sales', 'stock', 'category']

const SalesAndStock = () => {


    const [productList,setProductList] = useState([])
    const [options1,setOptions1] = useState({})
    const [options,setOptions] = useState({})

    useEffect(()=>{
        
        console.log('use effect')
        let xhr = new XMLHttpRequest();
        xhr.open("GET", 'http://127.0.0.1:5000/sales&stock', true)
        xhr.send()
        xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            //判断响应状态码 200，404
            if(xhr.status>=200 && xhr.status<300){
                const records = JSON.parse(xhr.response)
                setProductList(records.data.list)
                const names = [],sales = [],stocks=[];
                // console.log(JSON.parse(records.data.categorySales))
                for(let item of records.data.categorySales){
                names.push(item.name)
                sales.push(item.sales)
                stocks.push(item.stock)
                }
                console.log(records.data)
                // options.xAxis[0].data = x
                // options.series[0].data = y
                setOptions1(
                    {
                        legend: {
                            top: 'bottom'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        series: [
                            {
                                name: 'Sale Pie',
                                type: 'pie',
                                radius: [20, 100],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                itemStyle: {
                                    borderRadius: 8
                                },
                                data: records.data.categorySales
                            }
                        ]
                    }
                )
                setOptions(
                    {
                        title: {
                            text: 'Sales & Stock',
                            subtext: ''
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['Sales', 'Stock']
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
                                data: names
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'Sales',
                                type: 'bar',
                                data: sales,
                                markLine: {
                                    data: [
                                        {type: 'average', name: 'Average'}
                                    ]
                                }
                            },
                            {
                                name: 'Stock',
                                type: 'bar',
                                data: stocks,
                                markLine: {
                                    data: [
                                        {type: 'average', name: 'Average'}
                                    ]
                                }
                            }
                        ]
                    }
                )
            }else{
            }
            }
        }

    },[])
    return (
        <>
            <CRow style={{display:'flex'}}>
                {/* <div > */}
                <CCard style={{flex:'1'}}>
                    <CCardHeader>
                    Top Sales Products
                    <DocsLink name="CModal"/>
                    </CCardHeader>
                    <CCardBody>
                    <CDataTable
                    items={productList}
                    fields={fields}
                    itemsPerPage={5}
                    pagination
                    scopedSlots = {{
                        'status':
                        (item)=>(
                            <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                            </td>
                        )

                    }}
                    />
                    </CCardBody>
                </CCard>
                {/* </div> */}

                {/* <div style={{flex:'1'}}> */}
                    <CCard style={{flex:'1'}}>
                        <CCardHeader>
                        Sales Distribution
                        </CCardHeader>
                        <CCardBody>
                        <ReactECharts option={options1} style={{height:'100%'}}/>
                        </CCardBody>
                    </CCard>
                {/* </div> */}
            </CRow>
        <CCard>
            <CCardBody>
            <ReactECharts option={options} />
            </CCardBody>
        </CCard>
        </>
    )
}

export default SalesAndStock
