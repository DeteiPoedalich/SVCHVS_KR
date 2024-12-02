const jwt = require('jsonwebtoken');
const { Tokens } = require('../models/models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    validateAccessToken(token){
        try{
            const userData= jwt.verify(token,process.env.JWT_ACCESS_KEY)
            return userData;
        }catch(e){
            return null;
        }
    }
    validateRefreshToken(token){
        try{
            const userData= jwt.verify(token,process.env.JWT_REFRESH_KEY)
            return userData;
        }catch(e){
            return null;
        }
    }

    async saveToken(UserId, refreshToken) {  // Use UserId consistently
        try {
            const tokenData = await Tokens.findOne({ where: { userId: UserId } });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return await tokenData.save(); // Add await
            }
            const token = await Tokens.create({ userId: UserId, refreshToken });
            return token;
        } catch (e) {
            console.error("Error saving token:", e); // Detailed error logging
            throw e; // Re-throw the error to be caught by UserService
        }
    }
    async removeToken(refreshToken) {
        try {
            const deletedCount = await Tokens.destroy({ where: { refreshToken } }); // Use destroy with where clause
            if (deletedCount === 0) {
                throw ApiError.notFound('Refresh token not found'); // Throw an error if no token was found
            }
            // No need to return anything here, as the token is deleted
        } catch (error) {
            console.error('Token removal error:', error); // Log the error
            throw error; // Re-throw the error
        }
    }
    async findToken(refreshToken) {
        const tokenData=await tokenModel.findOne({refreshToken})
        return tokenData 
    }
}

module.exports = new TokenService();