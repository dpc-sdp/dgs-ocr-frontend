import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Spin, UploadProps } from "antd";
import { message, Upload, Select } from "antd";
import { ACTION, useAppContentDispatch } from "../contexts/app-context";
import { useLoginContent } from "../contexts/login-context";

const { Dragger } = Upload;
const { Option } = Select;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Uploader: React.FC = () => {
  const dispatch = useAppContentDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useLoginContent();
  const [coverType, setCoverType] = useState("");

  const handleCoverTypeChange = (value: string) => {
    console.log(value);
    setCoverType(value);
  };

  const props: UploadProps = {
    name: "doc",
    data: { cover_type: coverType },
    multiple: false,
    action: `${window._env_.REACT_APP_ENDPOINT?.trim()}/api/v1/ocr/analyze-doc?sample_doc=true`,
    accept: ".pdf,.png",
    showUploadList: false,
    headers: { Authorization: `Bearer ${token}` },
    async onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        setLoading(true);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const pdf = await getBase64(info.file.originFileObj);
        const fileName = info.file.name;
        dispatch({
          action: ACTION.NEW_PDF_RESULT,
          data: { rawData: info.file.response, pdf, fileName },
        });
        setLoading(false);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setLoading(false);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onPreview(info) {
      dispatch({
        action: ACTION.SELECT_PDF,
        data: info.name,
      });
    },
  };

  return (
    <Spin spinning={loading} size="large">
      <div>
        <Select
          style={{ width: "200px", paddingBottom: "10px" }}
          value={coverType}
          onChange={handleCoverTypeChange}
          placeholder="Select Cover Type"
        >
          <Option value="public">Public Cover</Option>
          <Option value="product">Product Cover</Option>
          <Option value="professional">Professional Cover</Option>
        </Select>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p> */}
        </Dragger>
      </div>
    </Spin>
  );
};

export default Uploader;
