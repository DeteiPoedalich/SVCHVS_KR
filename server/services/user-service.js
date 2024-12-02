const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const TokenService = require('./token-service');
const UserDTO = require('../dtos/user-dto');
const ApiError = require('../error/ApiError');
const tokenService = require('./token-service');

class UserService {
    async registration(NickName, password) {
        const candidate = await User.findOne({ where: { NickName } }); // Correct findOne
        if (candidate) {
            throw ApiError.badRequest('A user with this nickname already exists.');
        }

        try {
            const hashPassword = await bcrypt.hash(password, 3);
            const role = "USER"; // Add role back
            const user = await User.create({ NickName, role, password: hashPassword }); // Include role
            const userDTO = new UserDTO(user);
            const tokens = TokenService.generateTokens({ ...userDTO }); // Correct arguments
            await TokenService.saveToken(userDTO.UserId, tokens.refreshToken); // Consistent UserId
            return { ...tokens, user: userDTO };
        } catch (e) {
            console.error("Registration Error:", e); // Log the error
            throw ApiError.internal('Registration failed. Please try again later.'); // More informative error
        }
    }
    async login(NickName,password){

        try{
            const user = await User.findOne({ where: { NickName } });
            const isPassEquals= await bcrypt.compare(password,user.password)
            if(!isPassEquals){
                return ApiError.badRequest('Nickname or password is incorrect');
            }
            const userDTO=new UserDTO(user)
            const tokens= tokenService.generateTokens({...userDTO})
            await TokenService.saveToken(userDTO.UserId, tokens.refreshToken);
            return { ...tokens, user: userDTO };
        }catch(e){
            return ApiError.badRequest('Nickname or password is incorrect');
            
        }
    }
    async logout(refreshToken) {
        try {
            await tokenService.removeToken(refreshToken);
        } catch (error) {
            console.error('Logout error:', error); // Log the error
            throw ApiError.internal('Logout failed'); // Throw a custom error
        }
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.unauthorized();
        }
        const userData=tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb=await tokenService.findToken(refreshToken)
        if(!userData||!tokenFromDb){
            throw ApiError.unauthorized()
        }
        const user=await User.findById(userData.UserId)
        const userDTO=new UserDTO(user)
            const tokens= tokenService.generateTokens({...userDTO})
            await TokenService.saveToken(userDTO.UserId, tokens.refreshToken);
            return { ...tokens, user: userDTO };
    }
}

module.exports = new UserService();