import React from "react";
import { Button, Col, Row, Tabs, Typography } from "antd";
import Uploader from "../components/file-uploader";
import InfoView from "../components/info-table-view";
import { AppContentProvider } from "../contexts/app-context";
import JsonView from "../components/info-json-view";
import PDFView from "../components/pdf-view";
import FileList from "../components/file-list";

const OcrComponent = () => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <Uploader />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FileList />
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <Row className="ContentView">
        <Col span={11}>
          <PDFView />
        </Col>
        <Col span={1} />
        <Col span={12}>
          <Tabs
            type="card"
            items={[
              {
                label: `Table View`,
                key: "table_view",
                children: <InfoView />,
              },
              {
                label: `JSON View`,
                key: "json_view",
                children: <JsonView />,
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OcrComponent;
