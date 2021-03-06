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
  CCardImgOverlay,
  CProgress,
  CRow,
  CDataTable,
  CCardImg,
  CCardText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ReactECharts from "echarts-for-react";

import { DocsLink } from "src/reusable";

import usersData from "../users/UsersData";
import "antd/dist/antd.css";
import { Select } from "antd";
import ChartForZone from "./ChartForZone";
import { BACKEND_ENDPOINT } from "../../constants";
import axios from "axios";
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
  const [shelfData, setShelfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shelfLocation, setShelfLocation] = useState("");
  const [foundShelf, setFoundShelf] = useState(false);

  useEffect(() => {
    console.log("use effect");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", BACKEND_ENDPOINT + "zonedashboard", true);
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
    axios.get(BACKEND_ENDPOINT + "shelf/retrieveAll").then((res) => {
      const { data } = res;
      setShelfData(data);
      data.forEach((zone) => {
        if (zone.shelf_actionable == "1") {
          setFoundShelf(true);
          setShelfLocation(zone.shelf_location);
        }
      });
      setLoading(false);
    });
  }, []);

  const renderShelfStatusLegends = () => {
    const legends = shelfData.map((data) => {
      let className = "legend zone" + data.name;
      if (data.name == "A") {
        // Skip since it's the entrance.
        return;
      }
      if (data.shelf_actionable == "1") {
        className += " manage";
      } else {
        className += " ok";
      }
      return (
        <CCardImgOverlay key={data.id} className={className}></CCardImgOverlay>
      );
    });
    return legends;
  };

  const foundShelfWarning = () => {
    return (
      <CCardFooter className="map-footer">
        Shelf management service required at{" "}
        <span class="shelf-location">{shelfLocation}</span>
      </CCardFooter>
    );
  };

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
          {!loading && (
            <CCard>
              <CCardHeader>Shelf Management</CCardHeader>
              <CCardBody className="map container">
                <CCardImg src={"/images/shoppingMap.png"} style={{ height: "50vh" }} ></CCardImg>
                {renderShelfStatusLegends()}
              </CCardBody>
              {foundShelf && foundShelfWarning()}
            </CCard>
          )}
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
