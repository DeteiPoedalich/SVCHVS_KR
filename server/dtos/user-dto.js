module.exports = class UserDto {
    NickName;
    UserId; // Use UserId consistently
    role; // Include the role

    constructor(model) {
        this.NickName = model.NickName;
        this.UserId = model.UserId; // Use UserId
        this.role = model.role; // Add role to the DTO
    }
};