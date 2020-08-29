import mysql, { Connection } from 'mysql2/promise';
import { dbQuery } from './db.query';

console.log('--Starting Database Connection --');
interface dbQueryFunc { 
    insertWithValues(query: string, values:any): Promise<any>,
    updateWithValues(query: string, values:any): Promise<any>, 
    selectWithValues(query: string, values:any): Promise<any>, 
};
let dbQueryHandler: dbQueryFunc;
let db: Connection;

async function initDB(): Promise<void | Connection> {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });
    } catch(err) {
        console.log('DB connection error');
        console.log('Closing DB');
        db.end();
        throw err;
    }
    console.log('DB Connected!');
    dbQueryHandler = dbQuery(db);
}

function getDBQueryHandler(): dbQueryFunc {
    return dbQueryHandler;
}

function endConnection() {
    db.end();
    console.log('Successfully Closed DataBase');
}

export const Database = Object.assign({}, {initDB, getDBQueryHandler, endConnection});