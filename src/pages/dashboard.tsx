import { Button, Col, Row, Tabs, Typography } from 'antd';
import Uploader from '../components/file-uploader';
import InfoView from '../components/info-table-view';
import { AppContentProvider } from '../contexts/app-context';
import JsonView from '../components/info-json-view';
import PDFView from '../components/pdf-view';
import FileList from '../components/file-list';
import { LOGIN_ACTION, useLoginContentDispatch } from '../contexts/login-context';

const { Title } = Typography;


function Dashboard() {
  const authDispatch = useLoginContentDispatch();

  const logout = () => {
    authDispatch({ action: LOGIN_ACTION.LOGOUT });
  };

  return (
    <AppContentProvider>
      <div style={{ margin: "15px" }}>
        <div className="header">
          <div className="logo-wrapper">
            <img src="victorian-government-word-text-logo-symbol-transparent-png-222281.png" alt="Logo" className="logo" />
            <div className="title-wrapper">
              <Title className="title">Document AI Recogniser</Title>
              {/* <h3 style={{ textAlign: 'left' }}>DPC Marketplace</h3> */}
            </div>
          </div>
          <Button type="primary" ghost onClick={logout}>
            Logout
          </Button>
        </div>
        <br />
        <br />
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
        <Row className="ContentView" >
          <Col span={11}>
            <PDFView />
          </Col>
          <Col span={1} />
          <Col span={12}>

            <Tabs
              type="card"
              items={[{
                label: `Table View`,
                key: "table_view",
                children: <InfoView />,
              },
              {
                label: `JSON View`,
                key: "json_view",
                children: <JsonView />,
              }
              ]}
            />
          </Col>
        </Row>
      </div>
    </AppContentProvider>
  );
}

export default Dashboard;
