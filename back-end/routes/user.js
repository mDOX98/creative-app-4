const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const Store = require('../database/models/store')
const passport = require('../passport')
const { hash } = require('bcryptjs')

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        console.log('found user:',user)
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user !== null) {
            console.log(`Sorry, already a user with the username: ${username}`)
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
            return;
        }
        else {
            console.log("somehow here")
            const newUser = new User({
                username: username,
                password: password,
                items: [],
                hashed: false
            })
            
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
            console.log("done!")
        }
    })
})


router.get('/store', (req,res)=>{
    const query = Store.find({}, (err,list)=>{
        //console.log(list);
        res.send(list)
    });
    
})

router.get('/inventory/:username', (req, res) =>{
        let username  = req.params.username;
        var list = undefined;
        //console.log(username)
        Store.find({}, (err, listFound)=>{
            list = listFound
            let user = undefined;
            //console.log({username})
            User.findOne({username: username}, (err, userFound) => {
                user = userFound;
                //console.log(user)
                //console.log(user.items)
                //console.log(list)
                let arr = list.filter(value=>{return (user.items.find(i=>{return value.item_id === i}) !== undefined)})
                //console.log(arr)
                res.send(arr)
            })
        });
        // console.log(list);

})

router.post('/store/buy', (req, res) => {
    const { username, itemId } = req.body;
    itemId_ = parseInt(itemId);
    
   
    // ADD VALIDATION
    let output = undefined;
    User.findOne({ username: username}, (err, user) => {
        console.log({user});
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            Store.findOne({item_id: itemId_}, (err2, item) => {
                console.log({item});

                if (err2) {
                    console.log('User.js post error: ', err2);
                } else if (item){
                    console.log(`This Item Exists!`);
                    if(!user.items.includes(itemId_)){
                        user.items.push(itemId_);
                    } else {
                        console.log('Player already owns this item!');
                    }
                } else {
                    console.log('This item Does not exist!');
                }

                
                user.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json(savedUser)
                })
                
                

                
                
                
            })   
        }
        else {
            res.json({
                error: `Sorry, ${username} does not exist!  Cannot buy item! `
            })
            
        }

    })
    

    
});

router.post('/login', function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
passport.authenticate('local'),
(req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
}
)

router.get('/', (req, res, next) => {
    console.log('Get /!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    console.log("Post logout");
    console.log(req.data)
    if (req.user) {
        console.log("calling logout")
        req.logout(function(err) {
            console.log(err);
        })
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router