const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User,Team } = require("../models/models");
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
    async getUsersByTeamId(req,res,next){
            try {
                const { CurrentTeamId } = req.query;
        
                const whereClause = {};
        
                // Correctly apply the CurrentTeamId filter if provided
                if (CurrentTeamId) {
                    whereClause.CurrentTeamId = parseInt(CurrentTeamId); // Important: Parse to integer!
                }
        
                const users = await User.findAll({ where: whereClause });
                res.json(users);
        
            } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ message: "Error fetching users" });
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
    async update(req, res, next) {
        try {
            const user =req.params;
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
    async getUsersByNickName(req, res) {
        try {
            const { NickName } = req.query; // Извлекаем NickName из запроса
            if (!NickName) {
                return res.status(400).json({ message: "NickName parameter is required." });
            }
    
            // Ищем пользователя по NickName в базе данных
            const users = await User.findAll({
                where: {
                    NickName: NickName // Убедитесь, что поле в модели называется так же
                }
            });
    
            if (users.length === 0) {
                return res.status(404).json({ message: "User not found." });
            }
    
            res.json(users);
        } catch (error) {
            console.error("Error fetching users by NickName:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
    async JoinTeam(req, res) {
        const { teamId } = req.body; // Get teamId from request body
        const {userId} = req.params; // Get userId from authenticated user (assuming authMiddleware)
    
        try {
            const user = await User.findOne({ where: { UserId: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const team = await Team.findOne({ where: { TeamId: teamId } });
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
    
            // Update User's CurrentTeamId and TeamList
            let teamList = user.TeamList ? user.TeamList.split(' ').map(Number) : []; // Use array for TeamList
    
            if (!teamList.includes(teamId)) {
                teamList.push(teamId);
            }
    
            await user.update({ CurrentTeamId: teamId, TeamList: teamList.join(' ') }); // Convert back to string for storage
    
            res.status(200).json({ message: 'Successfully joined team', user }); // Return updated user data
        } catch (error) {
            console.error("Error joining team:", error);
            res.status(500).json({ error: 'Failed to join team' });
        }
    };
        
}

module.exports=new UserController()