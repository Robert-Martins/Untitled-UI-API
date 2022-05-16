const express = require('express');

const User = require('../models/user.model');

const router = express.Router();

//Get all users
router.get('/', async (request, response) =>{
    try{
        const users = await User.find({});
        response.status(200).send(users);
    } catch (error){
        response.status(500).send(error.message);
    }
})

//Get user by id
router.get('/:id', async (request, response) =>{
    const id = request.params.id;
    try{
        const user = await User.findById(id);
        if(!user)
            return response.status(401).send({ error: 'User Not Found' })

        response.status(200).send(user);
    } catch (error){
        response.status(500).send({ error: 'Invalid id' });
    }
})

//Update user by id
router.put('/:id', async (request, response) =>{
    const id = request.params.id;
    try{
        const user = await User.findByIdAndUpdate(id, request.body, {new: true});
        if(!user)
            return response.status(401).send({ error: 'User Not Found' })

        response.status(200).send(user);
    } catch (error){
        response.status(500).send({error:'Update Failed'})
    }
})

//Delete user by id
router.delete('/:id', async (request, response) =>{
    const id = request.params.id;
    try{
        const user = await User.findByIdAndRemove(id);
        if(!user)
            return response.status(401).send({ error: 'User Not Found' })

        response.status(200).send(user);
    } catch (error) {
        response.status(500).send({ error: 'Deletion failed' });
    }
})

module.exports = app => app.use('/users', router);