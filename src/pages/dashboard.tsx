import React, { useState } from "react";

import { Button, Typography } from "antd";
import { AppContentProvider } from "../contexts/app-context";
import {
  LOGIN_ACTION,
  useLoginContentDispatch,
} from "../contexts/login-context";
import OcrComponent from "../components/ocr";
import SwaggerUIComponent from "../components/swagger-ui";

const { Title } = Typography;

function Dashboard() {
  const authDispatch = useLoginContentDispatch();

  const logout = () => {
    authDispatch({ action: LOGIN_ACTION.LOGOUT });
  };

  const [showPage1, setShowPage1] = useState(true);

  const togglePages = () => {
    setShowPage1((prevState) => !prevState);
  };

  return (
    <AppContentProvider>
      <div style={{ margin: "15px" }}>
        <div className="header">
          <div className="logo-wrapper">
            <img
              src="victorian-government-word-text-logo-symbol-transparent-png-222281.png"
              alt="Logo"
              className="logo"
            />
            <div className="title-wrapper">
              <Title className="title">Document AI Recogniser</Title>
              {/* <h3 style={{ textAlign: 'left' }}>DPC Marketplace</h3> */}
            </div>
          </div>
          <Button type="primary" ghost onClick={togglePages}>
            {showPage1 ? "View OCR" : "View Swagger UI"}
          </Button>
          <Button type="primary" ghost onClick={logout}>
            Logout
          </Button>
        </div>
        <br />
        <br />
        {showPage1 ? <SwaggerUIComponent /> : <OcrComponent />}
      </div>
    </AppContentProvider>
  );
}

export default Dashboard;
