import { PlayerListM } from "@/db/model/playerListModel";
import createGame from "@/db/model/gameModel";
import {NextRequest,NextResponse} from "next/server"
import {getPlayerList} from "./apiHandle"




export async function GET(request:NextRequest){
    try {
        const {method} = request
        console.log("ggg=====>",method)
        switch(method){
            case "GET":
                console.log("param==>",await request.nextUrl.searchParams.get("param1"))
                const paramBody = await request.nextUrl.searchParams.get("param1")
                if(paramBody === "getPlayer"){
                    const playerListResponse = await getPlayerList(request)
                }
            default:
                return NextResponse.json({
                    message:"Invalid request!!"
                })
        }
    } catch (error) {
        console.log("Error while call the api")
        return NextResponse.json({
            message:"Error while fetch the api data",
            data: error
        },{status:500})
    }
}