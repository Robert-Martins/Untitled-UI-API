const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

const checkIdType = (id) =>{
    if(id.match(/^[0-9a-fA-F]{24}$/))
        return true;
    return false;
}

//Get all users
router.get('/', async (request, response) =>{
    try{
        const users = await User.find({});
        if(users.length == 0)
            return response.status(401).send({ error: 'Database empty' })
        return response.status(200).send(users);
    } catch (error){
        return response.status(500).send(error.message);
    }
})

//Get user by id
router.get('/:id', async (request, response) =>{
    const id = request.params.id;
    let user;
    try{
        if(checkIdType(id))
            user = await User.findById(id);
        if(!checkIdType(id))
            user = await User.find({documentId: id});  
        if(user.length == 0)
                return response.status(401).send({ error: 'User Not Found' });
        return response.status(200).send(user);
    } catch (error){
        return response.status(500).send({ error: 'Invalid id' });
    }
})

//Update user by id
router.put('/:id', async (request, response) =>{
    const id = request.params.id;
    let user;
    try{
        if(checkIdType(id))
            user = await User.findByIdAndUpdate(id);
        if(!checkIdType(id))
            user = await User.findOneAndUpdate({documentId: id});  
        if(user.length == 0)
                return response.status(401).send({ error: 'User Not Found' });

        return response.status(200).send(user);
    } catch (error){
        return response.status(500).send({error:'Update Failed'})
    }
})

//Delete user by id
router.delete('/:id', async (request, response) =>{
    const id = request.params.id;
    let user;
    try{
        if(checkIdType(id))
            user = await User.findByIdAndDelete(id);
        if(!checkIdType(id))
            user = await User.findOneAndDelete({documentId: id});  
        if(user.length == 0)
                return response.status(401).send({ error: 'User Not Found' });

        return response.status(200).send(user);
    } catch (error) {
        return response.status(500).send({ error: 'Deletion failed' });
    }
})

module.exports = app => app.use('/users', router);