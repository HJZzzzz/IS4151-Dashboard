import React, { lazy, useState, useEffect } from "react";
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
  CCardImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ReactECharts from "echarts-for-react";

import { DocsLink } from "src/reusable";

import usersData from "../users/UsersData";
import "antd/dist/antd.css";
import { Select } from "antd";
import ChartForZone from "./ChartForZone";

const { Option } = Select;

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const fields = ["name", "sales", "stock", "category"];

const Zones = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [zoneData, setZoneData] = useState([]);
  const [options1, setOptions1] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    console.log("use effect");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/zonedashboard", true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断响应状态码 200，404
        if (xhr.status >= 200 && xhr.status < 300) {
          const records = JSON.parse(xhr.response);
          console.log(records.data);
          console.log(records.data.details["A"]);
          setSelectedZone("A");
          setZoneData(records.data.details["A"]);
          setResponse(records.data.details);
          setOptions1({
            legend: {
              top: "bottom",
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
              },
            },
            series: [
              {
                name: "Sale Pie",
                type: "pie",
                radius: [20, 100],
                center: ["50%", "50%"],
                roseType: "area",
                itemStyle: {
                  borderRadius: 8,
                },
                data: records.data.all,
              },
            ],
          });
        } else {
        }
      }
    };
  }, []);
  const handleSelect = (e) => {
    console.log("select");
    console.log(e);
    setSelectedZone(e);
    setZoneData(response[e]);
  };
  return (
    <>
      <CRow style={{ display: "flex" }}>
        <CCol xs="12" sm="6" md="7">
          <CCard>
            <CCardHeader>Shelf Management</CCardHeader>

            <CCardBody>
              <CCardImg src={"images/shoppingMap.png"}></CCardImg>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="5">
          <CCard>
            <CCardHeader>Visit Distribution</CCardHeader>
            <CCardBody>
              <ReactECharts option={options1} style={{ height: "50vh" }} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          <Select
            defaultValue="A"
            style={{ width: "50%" }}
            id="select"
            onSelect={handleSelect}
          >
            <Option key="A" value="A">
              Zone A
            </Option>
            <Option key="B" value="B">
              Zone B
            </Option>
            <Option key="C" value="C">
              Zone C
            </Option>
          </Select>
        </CCardHeader>
        <CCardBody>
          <ChartForZone data={zoneData}></ChartForZone>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Zones;
