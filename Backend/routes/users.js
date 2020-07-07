const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../model/user');

// See if can make it so only admins can use this
router.get('/admin/all', (req, res) => {
    User.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

router.get('/login', (req, res) =>{
    User.findOne({username: req.body.username}, (err, userInfo) =>{
        if(err){
            console.log(err);
        } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password)){
                res.status(200).json({msg:`Login success! Welcome ${userInfo.username}`,userInfo});
                // Use some kind of tokenizer for login validation here, but validation works.
            } else {
                res.status(500).json({msg:'Incorrect username or password, try again.'})
            }
        }
    });
});

router.post('/register', (req, res) => {
    if(req.body.email && req.body.username && req.body.password){
        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            level: 0,
            achievements: []
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err){
                    console.log(err);
                }
                else{
                    newUser.password = hash;
                    newUser.save((err) =>{
                        if(err){
                            console.log(err);
                        } else{
                            res.status(200).json({msg:'Success! A new user has been created.'});
                        }
                    });
                }
            });
        });
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

// Can update everything but the password
router.patch('/:userId', (req, res) =>{
    const updateOps = {};
    for(const ops of req.body){
        if(ops.propName !== 'password'){
            updateOps[ops.propName] = ops.value;
        }
    }
    // Sets only the values listed in updateOps
    User.update({ _id : req.params.userId }, { $set: updateOps}).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

router.delete('/:userId', (req, res) =>{
    User.remove({ _id : req.params.userId }).then(result =>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

module.exports = router;