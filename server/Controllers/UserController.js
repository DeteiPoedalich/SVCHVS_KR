const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const  UserService = require('../services/user-service');
const jwt = require('jsonwebtoken'); // Import jwt
const {validationResult}=require('express-validator');
const userService = require("../services/user-service");


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
}

module.exports=new UserController()