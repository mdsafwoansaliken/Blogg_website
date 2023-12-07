const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config();

//UPDATE
router.put("/:id",verifyToken, async (req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Forgot Password
router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ status: "User does not exist" });
        }

        const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'md.safwoan.saliken@gmail.com',
            to: user.email,
            subject: 'Reset your password',
            text: `http://localhost:5173/resetPassword/${user._id}/${token}`
        };

        await transporter.sendMail(mailOptions);
        return res.send({ status: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/resetPassword/:id/:token', (req, res)=>{
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err){
            return res.json({Status: "Error with token"})
        } else{
            bcrypt.hash(password, 10)
            .then(hash =>{
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})





module.exports=router