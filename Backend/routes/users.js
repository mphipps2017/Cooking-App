const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../model/user');

// See if can make it so only admins can use this
router.get('/all', (req, res) => {
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
    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        experience: 0,
        achievements: [],
        tools: [],
        priveousRecipes: []
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err){
                console.log(err);
            }
            else {
                newUser.password = hash;
                newUser.save((err) =>{
                    if(err){
                        console.log(err);
                        res.status(400).json({msg:'A field was not filled out correctly, try again.'});
                    } else {
                        res.status(200).json({msg:'Success! A new user has been created.'});
                    }
                });
            }
        });
    });
});

// Can update everything but the password
router.patch('/updateUser/:userId', (req, res) =>{
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

// Add method for server to make temp password and email user so that they can use that for validation and change
router.patch('/passwordReset/', (req, res) => {
    User.findOne({username: req.body.username}, (err, userInfo) =>{
        if(err){
            console.log(err);
        } else {
            if(bcrypt.compareSync(req.body.oldPassword, userInfo.password)){
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.newPassword, salt, (err, hash) =>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            newPass = {password : hash};
                            User.update({ _id : userInfo._id }, { $set: newPass}).then(result => {
                                res.status(200).json({msg:`Successfully reset password! Go back and relog`, result});
                            }).catch(err => {
                                res.status(500).json({error:err});
                            });
                        }
                    });
                });
            } else {
                res.status(500).json({msg:'password, try again.'})
            }
        }
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