
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require("../../config/keys");

const User = require('../models/User');

var SALT_WORK_FACTOR = 10;

router.post('/doCureAmnesia', (req, res) => {
    User.findOne({email : req.body.email}).then( existUser => {
        if (!existUser) res.json({ success: false, errorCode: 1 });
        else {
            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                if(err) return next(err);

                bcrypt.hash(req.body.password, salt, function(err, hash){
                    if(err) return next(err);
                    User.findOneAndUpdate({email : req.body.email},{ permission:false , password : hash}).then(err =>{
                        res.json({ success: true });        
                    })        
                });
            });
        }
    });
});
  
router.post('/doRegisterUser', (req, res) => {
    if(req.body.username === '' || req.body.email === '' || req.body.password === '')
        res.json({ success : false, errorCode : 1 });
    else {
        User.findOne({ 
            $or: [
                { username : req.body.username },
                { email : req.body.email },
            ]
        }).then((existUser) => {
            if(existUser) res.json({ success : false, errorCode : 2 });
            else {
                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                    if(err) return next(err);

                    const newPerson = new User({
                        'id':'0',
                        'username': req.body.username,
                        'email': req.body.email,
                        'password': '0',
                        'permission' : false
                    });
                    
                    bcrypt.hash(req.body.password, salt, function(err, hash){
                        if(err) return next(err);

                        newPerson.password = hash;
                        newPerson.save().then((added) => {
                            User.findByIdAndUpdate(added._id, {'id':added._id},(err) => {
                                res.json({ success : true });
                            });
                        })
                    });
                });
            }
        });
    }
});
  
router.post('/doLoginUser', (req, res) => {
    User.findOne({ 
        $or: [
            { username : req.body.username_email },
            { email : req.body.username_email },
        ]
    }).then((data) => {
        if(!data) return res.json({ success:false, errorCode:1 });
        else {
            if(!data.permission) return res.json({success:false, errorCode:0});
            else {
                bcrypt.compare(req.body.password, data.password).then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            username: data.username,
                            email: data.email,
                            password: req.body.password
                        };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                              expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                return res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.json({ success:false, errorCode: 2 });
                    }
                });
            }
        }
    });
});

module.exports = router;