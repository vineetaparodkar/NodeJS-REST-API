 const options = {
    openapi: "3.0.0",
    language: "en-US",
    disableLogs: false,
    disableWarnings: false,
    autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: true,       // Enable/Disable automatic query capture. By default is true
    autoBody: true         // Enable/Disable automatic body capture. By default is true
  };
  
  const swaggerAutogen = require("swagger-autogen")(options);
  
  const doc = {
    info: {
      version: "1.0.0",
      title: "API",
      description: "API description",
    },
    host: "localhost:3000", //host: "0.0.0.0:3000",
    basePath: "../",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "API Healthcheck",
        description: "Endpoints specific for API healthcheck",
      },
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };
  
  const outputFile = "../src/docs/swagger/swagger_output.json";
  const endpointsFiles = [
    "./www",
    "../src/routes/v1/index.router.js",
  ];
  
  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./www");
  });