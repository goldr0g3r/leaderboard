import "./environment";
import "./mongodb";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "iAgent API",
      version: "1.0.0",
      description: "iAgent API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "iAgent Backend API",
      },
    ],
  },
  apis: ["./routes/protected/index.js", "./routes/public/index.js"],
};
