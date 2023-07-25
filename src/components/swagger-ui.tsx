import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUIComponent = () => {
  // The URL to your Swagger/OpenAPI specification JSON file
  const swaggerJsonUrl = `${window._env_.REACT_APP_ENDPOINT}/swagger.json`;

  return (
    <div>
      <SwaggerUI url={swaggerJsonUrl} />
    </div>
  );
};

export default SwaggerUIComponent;
