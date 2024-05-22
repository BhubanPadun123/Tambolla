import mongoose from "mongoose";



const PlayerListModel = new mongoose.Schema({
    playerName:{type:String},
    contactNumber:{type:Number},
    tournamentName:{type:String},
    ticketNo:{type:String}
})

const PlayerListM = mongoose.models.playerlist || mongoose.model("playerlist",PlayerListModel)

export {
    PlayerListM
}