const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const  UserService = require('../services/user-service');
const jwt = require('jsonwebtoken'); // Import jwt
const {validationResult}=require('express-validator');
const userService = require("../services/user-service");
const uuid=require('uuid')
const path=require("path")
const fs=require("fs")
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'static', 'diplomas'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); // Генерация уникального имени файла
    }
});
const upload = multer({ storage:storage }); 

class UserController{

    async registration(req, res, next) {
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty){
                return next(ApiError.badRequest('validation error',errors.array()))
            }
            const { NickName, password } = req.body;
            const userData = await UserService.registration(NickName, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error("Registration Error:", e); // Log the error for debugging
            next(e); // Pass the error to the error handling middleware
            // OR, if you don't have error handling middleware:
            // return res.status(500).json({ message: 'Registration failed. Please try again later.' });
        }
    }

    async login(req,res,next){
        const {NickName,password}=req.body;
        const userData=await UserService.login(NickName, password)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken); // No need to return the token data
            res.clearCookie('refreshToken');
            return res.json({ message: 'Successfully logged out' }); // Send a success message
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
          const { refreshToken } = req.cookies;
          const userData = await UserService.refresh(refreshToken);
          res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'strict', // Important for security
          });
          return res.json(userData);
        } catch (e) {
          next(e);
        }
      }
    async getUsers(req,res,next){
        try{
            let users=await User.findAll()
            return res.json(users)
        }catch(e){
            next(e)
        }
    }

    async check(req,res,next){
        const token=generateJwt(req.user.UserId, req.user.NickName, req.user.role)
        return res.json(token)
    }
    async getProfile(req, res, next) {
        try {
            const userId = req.user.UserId; // Assumes authMiddleware adds `req.user`
            const user = await User.findOne({
                where: { UserId: userId },
            });

            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            return res.json(user);
        } catch (e) {
            console.error("Get Profile Error:", e);
            return next(e);
        }
    }
    // async update(req, res, next) {
    //     try {
    //         const userId =req.params;
    //         // return res.status(500).json(userId)
    //         const { NickName } = req.body;
    //         const avatar=req.file
    //         console.error(avatar)
    //         const fileName = uuidv4() + path.extname(avatar.originalname);
    //         fs.rename(avatar.path, (path.resolve(__dirname, '..', 'static', fileName)));
    //         //await avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
    //         // fs.copyFileSync(avatar,(path.resolve(__dirname, '..', 'static', fileName)))
    //         console.log("avatarUrl")
    //         const updatedUser = await UserService.updateUser(userId.id, NickName, fileName);
    //         return res.json(updatedUser);
    //     } catch (e) {

    //         console.error("Update User Error:", e);
    //         return next(e)
    //     }
    // }
    async update(req, res, next) {
        try {
            const user =req.params;
            // return res.status(500).json(userId)
            const NickName= req.body
            console.log(NickName+"cont")
            console.error(user+"cont")
            const UserId=user.id
            console.error(UserId)
            const updatedUser = await UserService.updateUser(UserId, NickName);
            return res.json(updatedUser);
        } catch (e) {

            console.error("Update User Error:", e);
            return next(e)
        }
    }
    
    
    
    
    
}

module.exports=new UserController()