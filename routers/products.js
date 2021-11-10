const express = require('express');
const router = express.Router();
const {Product} = require('../models/product')

router.get('/', async(req, res)=>{
    const productList = await Product.find()

    if(!productList) 
        return res.status(500).json({success: false})
    res.status(201).send(productList)
})

router.get('/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id)

    if(!product) 
        return res.status(500).json({success: false})
    res.status(201).send(product)
})

router.get('/:name', async (req, res)=>{
    const products=[]
    if(req.params.name.length !== 0)
        products= await Product.find().filter(product => product.name.includes(req.params.name))

    if(!products)
        return res.status(500).json({message: 'Product not found', success: false})
    res.status(201).send(products)
})

router.post('/', async(req, res)=>{
    let newProduct = new Product({
        name: req.body.name,
        initialPrice: req.body.initialPrice,
        description: req.body.description,
        currentPrice: req.body.currentPrice
    })

    newProduct = await newProduct.save()

    if(!newProduct) 
        return res.status(500).json({success: false})
    res.status(201).send(newProduct)
})

router.delete('/:id', async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product) 
        return res.status(500).json({success: false})
    res.status(201).send(product)
})

router.put('/:id', async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        initialPrice: req.body.initialPrice,
        currentPrice: req.body.currentPrice,
        description: req.body.description
    }, {new: true})
    
    if(!product) 
        return res.status(500).json({success: false})
    res.status(201).send(product)
})

module.exports = router