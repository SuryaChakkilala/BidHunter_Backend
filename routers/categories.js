const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Category} = require('../models/category')

router.get('/', async (req, res) => {
    const categoryList = await Category.find()

    if(!categoryList) {
        return res.status(500).json({message: 'No list found', success: false})
    }
    res.status(200).send(categoryList)
})

router.get('/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    } 
    const category = await Category.findById(req.params.id)

    if(!category) {
        return res.status(500).json({message: 'No category found', success: false})
    }
    res.status(201).send(category)
})

router.post('/', async (req, res) => {
    let newCategory = new Category({
        name: req.body.name,
        icon: req.body.icon
    })

    newCategory = await newCategory.save()

    if(!newCategory) {
        return res.status(500).json({message: 'Cannot POST', success: false})
    }
    res.status(201).send(newCategory)
})

router.delete('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    } 
    let category = await Category.findByIdAndDelete(req.params.id)

    if(!category) {
        return res.status(500).json({message: 'cannot DELETE', success: false})
    }
    res.status(201).send(category)
})

router.put('/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    } 
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon
    })

    if(!category) {
        return res.status(500).json({message: 'Cannot PUT', success: false})
    }
    res.status(201).send(category)
})

module.exports = router