const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const {Bid} = require('../models/bid')

router.get('/', async (req, res)=>{
    let filter={}
    
    if(req.query.products) {
        filter = {
            product: req.query.products.split(',')
        }
    }

    if(req.query.users) {
        filter = {
            user: req.query.users.split(',')
        }
    }

    const bidList = await Bid.find(filter).populate('user').populate('product')
    if(!bidList) {
        return res.status(500).json({success: false})
    }
    res.status(200).send(bidList)
})

router.get('/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    }
    const bid = await Bid.findById(req.params.id).populate('user').populate('product')

    if(!bid) {
        return res.status(404).json({success: false})
    }
    res.status(201).send(bid)
})

router.get('/products/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    }

    let productBids = await Bid.find({product: req.params.id}).populate('product').populate('user')
    if(!productBids) {
        return res.status(500).json({success: false})
    }
    res.status(500).send(productBids)
})

router.get('/userbids/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false})
    }

    let userBids = await Bid.find({user: req.params.id}).populate('product')
    if(!userBids) {
        return res.status(500).json({success: false, message: 'User not found'})
    }
    res.status(201).send(userBids.sort((a, b) => a.amount-b.amount))
})

router.post('/', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.body.user) && !mongoose.isValidObjectId(req.body.product)) {
        return res.status(404).json({message: 'Invalid user', success: false})
    }
    let bidList = await Bid.find({product: req.body.product})
    if(bidList.length>0) {
        bidList = await bidList.filter(bid => bid.amount>=req.body.amount)
        if(bidList.length !== 0) {
            return res.status(404).json({message: 'cannot bid with lower amount', success: false})
        }
    }
    let newBid = new Bid({
        user: req.body.user,
        product: req.body.product,
        amount: req.body.amount
    })
    newBid = await newBid.save()

    if(!newBid) {
        return res.status(404).json({message: 'error in saving bid', success: false})
    }
    res.status(201).send(newBid)
})

router.delete('/:id', async (req, res)=>{
    const bid = await Bid.findByIdAndDelete(req.params.id)

    if(!bid) {
        return res.status(500).json({success: false})
    }
    res.status(200).send(bid)
})

module.exports = router