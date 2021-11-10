const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user')

router.get('/', async (req, res) => {
    const userList = await User.find()

    if(!userList) {
        return res.status(500).json({message: 'No list found', success: false})
    }
    res.status(200).send(userList)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        return res.status(404).json({message: 'no user found', success: false})
    }
    res.status(201).send(user)
})

router.post('/', async (req, res) => {
    const dup = await User.find({email: req.body.email})
    if(dup.length===0) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin
        })

        newUser = await newUser.save()

        if(!newUser) {
            return res.status(500).json({success: false})
        }
        res.status(201).send(newUser)
    } else {
        res.status(404).json({success: false, message: 'User exists'})
    }
})

router.put('/:id', async (req, res)=>{
    const dup = await User.find({email: req.body.email})

    if(dup.length>0) {
        return res.status(404).json({message: 'User with email already exists', success: false})
    }
    const newUser = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    },{
        new: true
    })

    if(!newUser) {
        return res.status(500).json({success: false})
    }
    res.status(201).send(newUser)
})

router.delete('/:id', async (req, res)=>{
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user) {
        return res.status(500).json({success: false, message: 'User does not exist'})
    }
    res.status(201).send(user)
})

module.exports = router