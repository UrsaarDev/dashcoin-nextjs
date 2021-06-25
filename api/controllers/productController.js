
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/doGetWholeProducts', (req, res) => {
    Product.find({}).then((products) => {
        res.json(products);
    });
});

router.get('/doGetIndividualProduct/:where', (req, res) => {
    Product.findOne({id:req.params.where}).then((product) => {
        res.json({product:product});
    });
});

router.post('/doAddNewProduct', (req, res) => {
    const newProd = new Product({
        'id'        : '0',
        'prodname'  : req.body.prodname,
        'calories'  : req.body.calories,
        'fat'       : req.body.fat,
        'carbs'     : req.body.carbs,
        'protein'   : req.body.protein,
    });
    newProd.save().then((added) => {
        Product.findByIdAndUpdate(added._id, {'id':added._id},(err) => {
            res.json({ success : true, added : added });
        });
    })
});

router.post('/doRemoveProduct', (req, res) => {
    Product.findByIdAndRemove(req.body.where).then(() =>{
        res.json({ success : true });
    });
});

module.exports = router;