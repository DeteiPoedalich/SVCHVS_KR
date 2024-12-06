const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDTO = require('../dtos/user-dto');
const ApiError = require('../error/ApiError');


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
            const tokens = tokenService.generateTokens({ ...userDTO }); // Correct arguments
            await tokenService.saveToken(userDTO.UserId, tokens.refreshToken); // Consistent UserId
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
            await tokenService.saveToken(userDTO.UserId, tokens.refreshToken);
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
    async refresh(refreshToken) {
        if (!refreshToken) {
          throw ApiError.unauthorized('Refresh token is missing');
        }
    
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
    
        if (!userData || !tokenFromDb) {
          throw ApiError.unauthorized('Invalid refresh token');
        }
    
        // Ensure User IDs match between token and database
        if (userData.UserId !== tokenFromDb.UserId) { // Assuming userId is the field in your Tokens model
            throw ApiError.unauthorized('Invalid refresh token (user mismatch)');
        }
    
    
        const user = await User.findByPk(userData.UserId);
        if (!user) {
          throw ApiError.notFound('User not found');
        }
    
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });
        await tokenService.saveToken(userDTO.UserId, tokens.refreshToken);
        return { ...tokens, user: userDTO };
      }
    async getAllUsers(){
        const users=await User.findAll()
        return users;
    }
    async updateUser(userId, NickName, avatar) { // Removed 'res' as it's not used

        try {
            const updateData = {};
            if (NickName) updateData.NickName = NickName;
            if (avatar) updateData.Avatar = avatar;
    
            console.log("userId:", userId); // Log the userId to verify its value
    
            const updatedUser = await User.findByPk(userId.UserId); // Use userId directly
    
            if (!updatedUser) {
                throw new Error('User not found'); // Clearer error message
            }
    
            const user = await updatedUser.update(updateData); // Update the found user
            console.log("Updated user:", user); // Log the updated user object
    
            return user;
        } catch (error) {
            console.error("Update User Error:", error);
            throw error;
        }
    }
    // User.update(updateData, { where: { UserId: userId } });
    
    // await User.findOne({ where: { UserId: userId } });
}

module.exports = new UserService();