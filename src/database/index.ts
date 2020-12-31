import mysql, { Connection } from 'mysql2/promise';
import createHttpError from "http-errors";
// interface dbQueryFunc { 
//     insertWithValues(query: string, values:any|any[]): Promise<any>,
//     updateWithValues(query: string, values:any|any[]): Promise<any>, 
//     selectWithValues(query: string, values:any|any[]): Promise<any>,
//     updateJSONValues(query:string, values:any|any[]): Promise<any> 
// };

enum QUERY_TYPES {
    INSERT =  'INSERT',
    UPDATE =  'UPDATE',
    SELECT =  'SELECT',
    UPDATE_JSON = 'UPDATE_JSON',
}

class SQL_DB {
    private CONFIG = {
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    };
    public TYPES = QUERY_TYPES;
    private db!: mysql.Connection;
    constructor(connect?: boolean) {
        connect && this.connect();
    }
    connect = async () => {
        try {
            this.db = await mysql.createConnection(this.CONFIG);
        } catch(err) {
            // console.log('DB connection error');
            // console.log('Closing DB');
            this.db?.end();
            throw err;
        }
        // console.log('DB Connected!');
    }
    close = () => {
        this.db?.end();
        // console.log('Closing DB');
    }
    initalizeTransc = () => this.db?.beginTransaction();
    rollbackTransc = () => this.db?.rollback();
    commitTransc = () => this.db?.commit();
    insertWithValues = (query: string, values: any | any[] | { [param: string]: any }):Promise<any> => {
        if (query.startsWith('Insert') || query.startsWith('INSERT')) {
            return this.db?.query(query, values)
            .catch(err => {
                console.log('Insertion failed');
                this.logError(query,values, err);
                throw new createHttpError.InternalServerError('SQL Exception');
            });
        }
        return Promise.reject('Not a valid Insert Query');
    }
    updateWithValues = (query: string, values: any | any[] | { [param: string]: any }):Promise<any>  => {
        if (query.startsWith('Update') || query.startsWith('UPDATE')) {
            return this.db?.query(query, values)
            .catch(err => {
                console.log('Updation failed');
                this.logError(query,values, err);
                throw new createHttpError.InternalServerError('SQL Exception');
            });
        }
        return Promise.reject('Not a valid Update Query');
    }
    selectWithValues = (query: string, values: any | any[] | { [param: string]: any }):Promise<any>  => {
        if (query.startsWith('SELECT') || query.startsWith('select')) {
            return this.db?.query(query, values)
            .catch(err => {
                console.log('Selection failed');
                this.logError(query,values, err);
                throw new createHttpError.InternalServerError('SQL Exception');
            });
        }
        return Promise.reject('Not a valid Select Query');
    }
    updateJSONValues = (query: string, values: any|any[]) => {
        return this.db?.query(query, values)
            .catch(err => {
                console.log('Updating JSON values failed');
                this.logError(query,values, err);
                throw new createHttpError.InternalServerError('SQL Exception');
            });
    }
    logError = (query:string, values: any | any[], err: Error):void => {
        console.log(`Query: ${query}`);
        console.log(`Values: ${values}`);
        console.log(`Error: ${err}`);
    }
    exec = async (type: string, query: string, values: any | any[] | { [param: string]: any }) => {
        let res;
        if (type in QUERY_TYPES) {
            try {
                await this.connect();
                await this.initalizeTransc();
                switch(type) {
                    case this.TYPES.INSERT:
                        res = await this.insertWithValues(query, values);
                    case this.TYPES.UPDATE:
                        res = await this.updateWithValues(query, values);
                    case this.TYPES.SELECT:
                        res = await this.selectWithValues(query, values);
                    case this.TYPES.UPDATE_JSON:
                        res = await this.updateJSONValues(query, values);
                }
                if (res) {
                    this.commitTransc();
                }
            }catch(err) {
                this.rollbackTransc();
                return Promise.reject(err);
            }finally {
                this.close();
                return res;
            }
        }
        return res;
    }
}
export default SQL_DB;