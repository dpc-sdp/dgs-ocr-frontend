import React, { useState } from "react";

import { Button, Typography } from "antd";
import { AppContentProvider } from "../contexts/app-context";
import {
  LOGIN_ACTION,
  useLoginContent,
  useLoginContentDispatch,
} from "../contexts/login-context";
import OcrComponent from "../components/ocr";
import SwaggerUIComponent from "../components/swagger-ui";
import axios from "axios";
import { showErrorNotification } from "../components/notifications";

const { Title } = Typography;

function Dashboard() {
  const authDispatch = useLoginContentDispatch();
  const { token } = useLoginContent();

  const logout = async () => {
    try {
      await axios({
        method: "post",
        url: "/api/v1/user/logout",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      authDispatch({ action: LOGIN_ACTION.LOGOUT });
    } catch (e: any) {
      showErrorNotification(e.response.statusText, e.response.data.msg);
      authDispatch({ action: LOGIN_ACTION.LOGOUT });
    }
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
            {showPage1 ? "View Swagger UI" : "View OCR"}
          </Button>
          <Button type="primary" ghost onClick={logout}>
            Logout
          </Button>
        </div>
        <br />
        <br />
        {showPage1 ? <OcrComponent /> : <SwaggerUIComponent />}
      </div>
    </AppContentProvider>
  );
}

export default Dashboard;
