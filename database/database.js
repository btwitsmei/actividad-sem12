import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ejemplo", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"

})