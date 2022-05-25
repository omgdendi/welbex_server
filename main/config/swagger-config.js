const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Blogs API",
            version: "1.0.0",
            description: "Blogs API with jwt for WelbeX test task",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: "http://localhost:8080/api/",
            },
        ],
    },
    apis: ["main/routers/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = specs;