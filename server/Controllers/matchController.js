const {Match} = require("../models/models")
const ApiError=require("../error/ApiError")

class MatchController{
    async create(req, res) {
        try {
            const {
                PlayerId1, PlayerId2, PlayerId3, PlayerId4, PlayerId5,
                PlayerId6, PlayerId7, PlayerId8, PlayerId9, PlayerId10
            } = req.body;
    
            console.log("Creating match with:", req.body); // Лог входных данных
    
            const match = await Match.create({
                PlayerId1, PlayerId2, PlayerId3, PlayerId4, PlayerId5,
                PlayerId6, PlayerId7, PlayerId8, PlayerId9, PlayerId10
            });
    
            return res.json(match);
        } catch (e) {
            console.error("Error creating match:", e); // Логирование полной ошибки
            return res.status(500).json({ message: "Internal server error." });
        }
    }
    async getMatchCount(req, res){
        try {
            const count = await Match.findAndCountAll(); // Количество всех документов Match
            res.status(200).json({ count:count.count }); // Отправляем количество в ответ
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving match count.', error });
        }
    }
    async getAll(req,res){
        let matches
        matches=await Match.findAll()
        return res.json(matches)
    }
    async getSome(req,res){
        let{limit,page}=req.query
        page=page||1
        limit=limit||5
        let offset=page=limit-limit
        let matches
        matches=await Match.findAll({where:limit,offset})
        return res.json(matches)
    }
    async getOne(req, res,next) {
        const { MatchId } = req.params;
        
        // if (!MatchId) {
        //     return res.status(400).json({ message: "MatchId is required."+ next(e) });
        // }
    
        try {
            const match = await Match.findOne({
                where: { MatchId: MatchId }, // Применяем MatchId из параметров
            });
    
            if (!match) {
                return res.status(404).json({ message: "Match not found." });
            }
    
            return res.json(match);
        } catch (e) {
            console.error("Error finding match:", e);
            return res.status(500).json({ message: "Internal server error."+e.message });
        }
    }
    async update(req,res){
        
            const matchId = req.params.id;
            const matchData = req.body;
        
            try {
                // Обновление матча в базе данных
                const updatedMatch = await Match.findByIdAndUpdate(matchId, matchData, { new: true });
                
                if (!updatedMatch) {
                    return res.status(404).json({ message: 'Match not found' });
                }
        
                res.status(200).json(updatedMatch);
            } catch (error) {
                console.error("Error updating match:", error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        
    }
}

module.exports=new MatchController()