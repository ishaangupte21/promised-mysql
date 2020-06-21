import * as mysql from 'mysql'
import MySql from './MySql'
import MySqlURL from './MySqlURL'
import MySqlPool from './MySqlPool'


export const connect = (host: 'localhost' | string, user: string, password: string, database?: string) => new Promise((resolve, reject) => {
   if(database) {
    const con = mysql.createConnection({host, user, password, database})
    
    con.connect((err: mysql.MysqlError) => {
        if(err) {
            reject(err.message)
        } else {
            resolve(new MySql(host, user, password, con))
        }
    })
   } else {
    const con = mysql.createConnection({host, user, password})
    
    con.connect((err: mysql.MysqlError) => {
        if(err) {
            reject(err.message)
        } else {
            resolve(new MySql(host, user, password, con))
        }
    })
   }
})

export const connectWithURL = (url: string) => new Promise((resolve, reject) => {
    const con = mysql.createConnection(url)

    con.connect((err: mysql.MysqlError) => {
        if(err) {
            reject(err.message)
        } else {
            resolve(new MySqlURL(con))
        }
    })
}) 

export const pool = (limit: number, host: 'localhost' | string, user: string, password: string, database?: string) => 
    new Promise((resolve, reject) => {
        if(database) {
            const pool = mysql.createPool({
                connectionLimit: limit,
                host,
                user,
                password,
                database
            })
            resolve(new MySqlPool(limit, host, user, password, pool))
        } else {
            const pool = mysql.createPool({
                connectionLimit: limit,
                host,
                user,
                password
            })
            resolve(new MySqlPool(limit, host, user, password, pool))
        }
    })
