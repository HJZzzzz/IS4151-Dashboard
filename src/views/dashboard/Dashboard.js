import React, { lazy, useState, useEffect,useLayoutEffect } from 'react'
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
  CCallout,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ReactECharts from 'echarts-for-react';

import MainChartExample from '../charts/MainChartExample.js'
import Page from './chart'
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const [totalRevenue,setTotaLRevenue] = useState(0)
  const [totalSales,setTotaLSales] = useState(0)
  const [totalMembers,setTotalMembers] = useState(0)
  const [totalOrders,setTotalOrders] = useState(0)
  const [saleStockPercentage,setSaleStockPercentage] = useState(0)
  const [options,setOptions] = useState({})

  useLayoutEffect(()=>{
    
    console.log('use effect')
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://127.0.0.1:5000/dashboard', true)
	  xhr.send()
    xhr.onreadystatechange = function(){
      if(xhr.readyState===4){
          //判断响应状态码 200，404
          if(xhr.status>=200 && xhr.status<300){
            const records = JSON.parse(xhr.response)
            console.log(typeof(records))
            console.log(records.data)
            console.log(records.data.totalMembers)
            console.log(records.data.totalOrders)
            console.log(records.data.totalSales)
            console.log(records.data.saleStockPercentage)
            setTotaLRevenue(records.data.totalRevenue.toFixed(1))
            setTotalMembers(records.data.totalMembers)
            setTotalOrders(records.data.totalOrders)
            setTotaLSales(records.data.totalSales)
            setSaleStockPercentage(records.data.saleStockPercentage.toFixed(4)*100)
            const x = [],y = [];
            console.log(JSON.parse(records.data.categorySales))
            for(let item of JSON.parse(records.data.categorySales)){
              x.push(item[0])
              y.push(item[1])
            }
            console.log(x)
            // options.xAxis[0].data = x
            // options.series[0].data = y
            setOptions(
              {
                title: {
                    text: 'Revenue',
                    subtext: 'In Categories'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Revenue']
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
                        data: x
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Revenue',
                        type: 'bar',
                        data: y,
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
      {/* <WidgetsDropdown /> */}
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header={totalMembers+''}
          text="Members"
          color="gradient-info"
          inverse
          progressSlot={
            <div></div>}
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={totalOrders+''}
          text="Total Orders"
          color="gradient-success"
          inverse
          progressSlot={
            <div></div>}
        >
          <CIcon name="cil-spreadsheet" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={totalSales+' $'}
          text="Product Sold"
          color="gradient-warning"
          inverse
          progressSlot={
            <div></div>}
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={saleStockPercentage+'%'}
          text="Current Stock"
          color="gradient-primary"
          inverse
          progressSlot={
            <div></div>}
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={totalRevenue+'$'}
          text="Revenue"
          color="gradient-danger"
          inverse
          progressSlot={
            <div></div>}
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCardGroup>
      <CCard>
        <CCardBody>
          {/* <Page></Page> */}
          {/* <MainChartExample style={{height: '300px', marginTop: '40px'}}/> */}
          <ReactECharts option={options} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard