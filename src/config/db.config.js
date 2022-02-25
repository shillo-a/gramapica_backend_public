import { Sequelize } from 'sequelize';

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;
const schema = process.env.DB_SCHEMA;

export const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        port,
        dialect,
        schema,
        define: {
            //Наименование модели = наименование таблицы в БД
            freezeTableName: true,
        }
    }
)