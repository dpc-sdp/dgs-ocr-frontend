import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useLoginContent } from "../contexts/login-context";

const SwaggerUIComponent = () => {
  // The URL to your Swagger/OpenAPI specification JSON file
  const swaggerJsonUrl = `${window._env_.REACT_APP_ENDPOINT}/swagger.json`;
  const { token } = useLoginContent();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return (
    <div>
      <SwaggerUI
        url={swaggerJsonUrl}
        requestInterceptor={(request) => {
          // Modify the fetch request to include the Authorization header
          request.headers = headers;
          return request;
        }}
      />
    </div>
  );
};

export default SwaggerUIComponent;
