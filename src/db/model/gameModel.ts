import mongoose from "mongoose";


const gameModel = new mongoose.Schema({
    tournamentName:{type: String},
    gameOwnerName:{type:String},
    gameStartTime:{type: String},
    award:{type:Array},
    winner:{type:Array},
    participants:{type:Array},
    bookedTicket:{type:Array}
})

const createGame = mongoose.models.creategames || mongoose.model("creategames",gameModel)

export default createGame