const User = require('../models/User');
const CryptoJS =require('crypto-js');
const router = require('express').Router();

// Register
router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_KEY
        ).toString(),
    });

  // try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
  // } catch (error) {
     //  res.status(500).json(error);
  //  }
});

// login

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_KEY
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;
        console.log(inputPassword.trim);
        console.log(originalPassword);
       originalPassword != inputPassword && res.status(401).json("Wrong Password");
       const {...others} = user._doc;
       res.status(200).json({...others});
       // res.status(200).json({user});
    
        
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;