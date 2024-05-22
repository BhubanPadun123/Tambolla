import createGame from "@/db/model/gameModel";
import { PlayerListM } from "@/db/model/playerListModel";
import {NextRequest,NextResponse} from "next/server"
import clientPromise from "@/db/connection";



export const getPlayerList=async(request:NextRequest)=>{
    try {
        await clientPromise()
        const tournamentName = await request.nextUrl.searchParams.get("param2")
        const playerList = await createGame.findOne({tournamentName:tournamentName})
        if(playerList){
            let playerCollection = Array.isArray(playerList.participants) && playerList.participants
            console.log("List===>",playerCollection)
            return NextResponse.json({
                message:"Player list",
                data:playerCollection
            },{status:200})
        }else{
            return NextResponse.json({
                message:"user not joint yet!!",
            },{status:402})
        }


    } catch (error) {
        console.log("Error while call the api: ",error)
        return NextResponse.json({
            message:"Error while api call",
            data:error
        },{status:500})
    }
}