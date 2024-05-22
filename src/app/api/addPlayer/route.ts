import clientPromise from "@/db/connection";
import {NextRequest,NextResponse} from "next/server"
import mongoose from "mongoose";
import { PlayerListM } from "@/db/model/playerListModel";
import createGame from "@/db/model/gameModel";


export async function POST(req:NextRequest){
    try{
        await clientPromise()
        const reqBody = await req.json()
        const {
            playerName,
            contactNumber,
            tournamentName
        } = reqBody.data

        if(!mongoose.models.playerlist){
            const newPlayerList = new PlayerListM({
                playerName:playerName,
                contactNumber:contactNumber,
                tournamentName:tournamentName
            })
            await newPlayerList.save()
            return NextResponse.json({
                message:"Player list created successfully!",
                data:newPlayerList
            })
        }else{
            let isExistTournament = await createGame.findOne({tournamentName:tournamentName})
            if(isExistTournament){
                let isExistUser = await PlayerListM.findOne({contactNumber:contactNumber})    
                if(isExistUser && Object.keys(isExistUser).length > 0 && isExistUser.tournamentName === tournamentName){
                    let updateUser = await PlayerListM.findOneAndUpdate(
                        {contactNumber:contactNumber},
                        {
                            playerName:playerName,
                            contactNumber:contactNumber,
                            tournamentName:tournamentName
                        },
                        {
                            returnDocument:"after"
                        }
                    )
    
                    return NextResponse.json({
                        message:"Update successfully!!",
                        data:updateUser
                    },{status:200})
                }else{
                    let pushPlayer = new PlayerListM({
                        playerName:playerName,
                        contactNumber:contactNumber,
                        tournamentName:tournamentName
                    })
                    await pushPlayer.save()
    
                    return NextResponse.json({
                        message:"User updated successfully!!!",
                        data: pushPlayer
                    },{status:200})
                }
            }
        }
    }catch(error){
        console.log("Error while call the API",error)
        return NextResponse.json({message:"Error while api call!!!",data:error},{status:500})
    }
}