require('dotenv').config();
const express = require('express');
const sequelize = require("./config/db-config");
const appConfig = require("../main/config/app-config");

const PORT = process.env.PORT || 8080;
const app = appConfig(express());

const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log("SERVER STARTED ON PORT " + PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

startApp();
