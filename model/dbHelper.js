import mysql from 'mysql';
const getConnection = async() => {
    let conn = mysql.createConnection( {
        "host" : "localhost",
        "port": "3306",
        "user": "root",
        "password": "root",
        "database": "studentdb"
    })
    await conn.connect( err => {
        if (err) {
            console.log('getConnection: connection error: ' + err)
            return;
        }
        console.log('getConnection: connection successful');
    })
    return conn;
}
export const dbQueryUsers = async () => {
    var users = [];
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryUsers: connection error: ' + err)
            return;
        }
        console.log('dbQueryUsers: connection successful');
        for (let i=0; i< result.length; i++) {
            let row = result[i];
            let user = { "id" : row["UID"], "fname": row["FNAME"], "lname": row["LNAME"]}
            console.log("user="+JSON.stringify(user))
            users = [...users, user]
        }
        resolve( users);   
    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = 'SELECT UID, FNAME, LNAME FROM USERS';
            console.log( 'dbQueryUsers: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }
    catch (err) {
        console.log('dbQueryUsers: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve([])})

}

export const dbQueryUser = async (id) => {

    var user;

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbQueryUser: connection error: ' + err)

            return;

        }

        console.log('dbQueryUser: connection successful');

        let row = result[0];

        let user = { "id" : row["UID"], "fname": row["FNAME"], "lname": row["LNAME"]}

        console.log("user="+JSON.stringify(user))

        resolve( user);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `SELECT UID, FNAME, LNAME FROM USERS WHERE UID='${id}'`;

            console.log( 'dbQueryUser: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbQueryUser: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve({})})

}

export const dbInsertUser = async (user) => {

    var user;

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbInsertUser: connection error: ' + err)

            return;

        }

        console.log('dbInsertUser: connection successful');

        resolve( 1);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `INSERT INTO USERS (UID, FNAME, LNAME) VALUES ('${user.id}', '${user.fname}', '${user.lname}')`;

            console.log( 'dbInsertUser: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbInsertUser: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve(0)})

}

export const dbDeleteUser = async (id) => {

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbDeleteUser: connection error: ' + err)

            return;

        }

        console.log('dbDeleteUser: connection successful');

        resolve( 1);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `DELETE FROM USERS WHERE UID='${id}'`;

            console.log( 'dbDeleteUser: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbDeleteUser: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve(0)})

}

export const dbUpdateUser = async (user) => {

    var user;

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbUpdateUser: connection error: ' + err)

            return;

        }

        console.log('dbUpdateUser: connection successful');

        resolve( 1);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `UPDATE USERS SET FNAME='${user.fname}',LNAME='${user.lname}' WHERE UID='${user.id}'`;

            console.log( 'dbUpdateUser: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbUpdateUser: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve(0)})

}