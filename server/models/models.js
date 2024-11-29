const sequelize=require('../db')
const {DataTypes}= require('sequelize')

const User = sequelize.define('User',{
    UserId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    CurrentTeamId:{type : DataTypes.INTEGER},
    TeamList:{type : DataTypes.STRING},
    NickName: {type : DataTypes.STRING, allowNull: false, unique:true},
    Avatar:{type : DataTypes.STRING},
    password: {type : DataTypes.STRING, allowNull: false},
    role: {type : DataTypes.STRING, defaultValue: "USER"},
})

const Team = sequelize.define('Team',{
    TeamId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    TeamImg:{type : DataTypes.STRING},
    TeamName: {type : DataTypes.STRING, allowNull: false, unique:true},
})

const Item = sequelize.define('Item',{
    ItemId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    ItemImg:{type : DataTypes.STRING, allowNull: false},
    ItemName: {type : DataTypes.STRING, allowNull: false},
    ItemDescription:{type:DataTypes.STRING, allowNull: false},
    ItemType:{type:DataTypes.STRING, allowNull: false},
    ItemType2:{type:DataTypes.STRING, allowNull: false},
})

const Build = sequelize.define('Build',{
    BuildId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    ItemId1:{type : DataTypes.INTEGER},
    ItemId2:{type : DataTypes.INTEGER},
    ItemId3:{type : DataTypes.INTEGER},
    ItemId4:{type : DataTypes.INTEGER},
    ItemId5:{type : DataTypes.INTEGER },
    ItemId6:{type : DataTypes.INTEGER },
    SkillId1:{type : DataTypes.STRING },
    SkillId2:{type : DataTypes.STRING },
    SkillId3:{type : DataTypes.STRING },
    SkillId4:{type : DataTypes.STRING },
})

const Facet = sequelize.define('Facet',{
    FacetId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    HeroId:{type : DataTypes.INTEGER, allowNull: false},
    FacetName: {type : DataTypes.STRING, allowNull: false},
    FacetDescription:{type:DataTypes.STRING, allowNull: false},
})

const Skill = sequelize.define('Skill',{
    SkillId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    SkillName: {type : DataTypes.STRING, allowNull: false},
    SkillDescription:{type:DataTypes.STRING, allowNull: false},
    SkillImg: {type : DataTypes.STRING, allowNull: false},
})

const Match = sequelize.define('Match',{
    MatchId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    PlayerId1:{type : DataTypes.INTEGER, allowNull: false},
    PlayerId2:{type : DataTypes.INTEGER, allowNull: false},
    PlayerId3:{type : DataTypes.INTEGER, allowNull: false},
    PlayerId4:{type : DataTypes.INTEGER, allowNull: false},
    PlayerId5:{type : DataTypes.INTEGER , allowNull: false},
    PlayerId6:{type : DataTypes.INTEGER , allowNull: false},
    PlayerId7:{type : DataTypes.INTEGER , allowNull: false},
    PlayerId8:{type : DataTypes.INTEGER , allowNull: false},
    PlayerId9:{type : DataTypes.INTEGER , allowNull: false},
    PlayerId10:{type : DataTypes.INTEGER , allowNull: false},
})

const PlayerInMatch = sequelize.define('PlayerInMatch',{
    PlayerId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    PlayerName:{type : DataTypes.STRING, allowNull: false, defaultValue: "Anonyomous"},
    HeroId:{type : DataTypes.INTEGER, allowNull: false},
    Kills:{type : DataTypes.INTEGER, allowNull: false},
    Deaths:{type : DataTypes.INTEGER, allowNull: false},
    Assists:{type : DataTypes.INTEGER, allowNull: false},
    ItemId1:{type : DataTypes.INTEGER},
    ItemId2:{type : DataTypes.INTEGER},
    ItemId3:{type : DataTypes.INTEGER},
    ItemId4:{type : DataTypes.INTEGER},
    ItemId5:{type : DataTypes.INTEGER },
    ItemId6:{type : DataTypes.INTEGER },
    NeutralSlotId:{type : DataTypes.INTEGER },
    Side:{type : DataTypes.STRING, allowNull: false}
})

const Heroes = sequelize.define('Heroes',{
    HeroId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    HeroName:{type : DataTypes.STRING, allowNull: false},
    HeroImg:{type : DataTypes.STRING, allowNull: false},
    BuildId:{type : DataTypes.INTEGER, allowNull: false},
    Attribute:{type : DataTypes.STRING, allowNull: false},
    Strength:{type : DataTypes.INTEGER, allowNull: false},
    StrengthPlus:{type : DataTypes.DOUBLE, allowNull: false},
    Agility:{type : DataTypes.INTEGER, allowNull: false},
    AgilityPlus:{type : DataTypes.DOUBLE, allowNull: false},
    Intelligence:{type : DataTypes.INTEGER, allowNull: false},
    IntelligencePlus:{type : DataTypes.DOUBLE, allowNull: false},
    Difficulty:{type : DataTypes.INTEGER, allowNull: false},
    AttackType:{type : DataTypes.STRING, allowNull: false},
    Health:{type : DataTypes.INTEGER, allowNull: false},
    Mana:{type : DataTypes.INTEGER, allowNull: false},
    HealthPlus:{type : DataTypes.DOUBLE, allowNull: false},
    ManaPlus:{type : DataTypes.DOUBLE, allowNull: false},
    SkillId1:{type : DataTypes.INTEGER, allowNull: false},
    SkillId2:{type : DataTypes.INTEGER, allowNull: false},
    SkillId3:{type : DataTypes.INTEGER, allowNull: false},
    SkillId4:{type : DataTypes.INTEGER, allowNull: false},
})

Team.hasMany(User);
User.belongsTo(Team);

Build.hasMany(Item);
Item.belongsTo(Build);

PlayerInMatch.hasMany(Item);
Item.belongsTo(PlayerInMatch);

Match.hasMany(PlayerInMatch);
PlayerInMatch.belongsTo(Match);

Heroes.hasMany(Facet);
Facet.belongsTo(Heroes);

Heroes.hasMany(Skill);
Skill.belongsTo(Heroes);

Heroes.hasOne(Build);
Build.belongsTo(Heroes);

module.exports={
    User,
    Team,
    Item,
    Build,
    Facet,
    Skill,
    Match,
    PlayerInMatch,
    Heroes
}