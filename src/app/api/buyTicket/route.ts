import createGame from "@/db/model/gameModel";
import { PlayerListM } from "@/db/model/playerListModel";
import clientPromise from "@/db/connection";
import { NextRequest,NextResponse } from "next/server";




export async function POST(request:NextRequest){
    try {
        await clientPromise()
        const reqBody = await request.json()
        const {
            playerName,
            contactNumber,
            tournamentName,
            selectedTicket
        } = reqBody.data
        const updateGame = await createGame.updateOne({tournamentName:tournamentName},{$push:{participants:{playerName:playerName,ticketnumber:selectedTicket}}})
        if(updateGame){
            const updatePlayerName = await PlayerListM.findOneAndUpdate({
                contactNumber:contactNumber
            },{
                playerName:playerName,
                contactNumber:contactNumber,
                tournamentName:tournamentName
            })
            if(!updatePlayerName){
                return NextResponse.json({
                    message:"User is not available in this tournament"
                },{status:502})
            }else{
                return NextResponse.json({message:"Ticket buying successfull!!!",updateGame:{updateGame},updatePlayerName:{updatePlayerName}},{status:200})
            }
        }
    } catch (error) {
        return NextResponse.json({mesage:"Error while API request!!!."})
    }
}

export async function GET(){

}