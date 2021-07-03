import mysql from 'mysql';

//Creatimg a connection to connect with the DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hapi-server',
    password: 'newPassword123@@',
    database: 'buy-and-sell'
});

//Exporting db object that rest of the app can user
export const db = {
    connect: () => connection.connect(),
    query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
        connection.query(queryString, escapedValues, (error, results, fields) => {
            if(error) reject(error);
            resolve({results, fields});
        })
    }),
    end: () => connection.end()

}