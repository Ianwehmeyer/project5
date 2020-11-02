import express from 'express';
import {v4 as uuidv4} from 'uuid';
import Router from 'express-promise-router'; 
import {dbQueryUsers, dbQueryUser, dbInsertUser, dbUpdateUser, dbDeleteUser} from '../model/dbhelper.js'

 

//const router = express.Router();
const router = Router();
let users = [];
const addDefaultUsers = () => {
    users = [
        { "id": uuidv4(), "fname": "Bruce", "lname": "Banner"},
        { "id": uuidv4(), "fname": "Clark", "lname": "Kent"},
        { "id": uuidv4(), "fname": "Diana", "lname": "Prince"},
        { "id": uuidv4(), "fname": "Tony", "lname": "Stark"}
    ];

}
const queryUsers = async (request, response) => {
    /*let dbusers = await dbQueryUsers()
    dbusers.forEach( user => {
        console.log( user)
    })*/
    users = await dbQueryUsers()
    users.forEach( user => {
        console.log( user)
    })
    if (users.length === 0) addDefaultUsers();
    console.log('GET: users='+JSON.stringify(users));
    //response.send(users);
    const context = {"users": users, "title": "This is cool" }
    response.render('users', context)
}

const addUser = async (request, response) => {
    let user = request.body;
    const newUser = { "id": uuidv4(), ...user };
    console.log('POST: user='+JSON.stringify(newUser));
    users = [...users, newUser];
    await dbInsertUser( newUser);
    response.send(`${newUser.id}: ${newUser.fname}, ${newUser.lname} added`);
}

const deleteUser = async (request, response) => {
    console.log('deleteUser called')
    const {id} = request.params; //const id = request.params['id'];
    users = users.filter( user => user.id !== id);
    await dbDeleteUser( id); 
    console.log(`DELETE: id=${id} deleted`);
    response.send(`DELETE: id=${id} deleted`);
}

const queryUser = async (request, response) => {
    const {id} = request.params; //const id = request.params['id'];
    let user = await dbQueryUser( id);
    //let user = users.find( user => user.id === id);
    console.log(`GET: ${user.id} found`);
    //response.send(`${user.id}: ${user.fname}, ${user.lname} found`);
    const context = {"user": user }
    response.render('user', context)
}

const updateUser = async (request, response) => {
    console.log(JSON.stringify(request.params))
    const {id} = request.params; //const id = request.params['id'];
    const {fname, lname} = request.body
    console.log(`fname=${fname} lname=${lname}`);
    let user = users.find( user => user.id === id);
    if (!user) {
        response.send(`UPDATE: ${user} not found`)
        return;
    }
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    await dbUpdateUser( user);
    console.log(`${user.id}: ${user.fname}, ${user.lname} updated`);
    response.send(`${user.id}: ${user.fname}, ${user.lname} updated`);
}

// all routes are starting with /users

router.get('/', queryUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.get('/:id', queryUser);
router.patch('/:id', updateUser);

export default router;