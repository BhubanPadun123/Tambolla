import mongoose from "mongoose";
import { connnectionStr } from "@/db/connection";
import createGame from "@/db/model/gameModel";
import { NextResponse } from "next/server";

interface responseObj{
    status:string,
    response:object,
    error:any
}
export async function POST(filter:object,update:object){
    // console.log("from api===>",filter,update)

    let data:responseObj = {
        status:"",
        response:[],
        error:""
    }

    try{
        await mongoose.connect(connnectionStr);
        const allGame = await createGame.find({})
        console.log("all===>",allGame)
        if(allGame.length > 0){
            const updateGame = await createGame.findByIdAndUpdate(filter,update,{new:false});
            if(updateGame){
                return {
                    status:"success",
                    response:updateGame,
                    error:""
                }
            }else{
                return {
                    status:"falid",
                    response:[],
                    error:""
                }
            }
        }else{
            const newGame_aminities = new createGame(filter)
            newGame_aminities.save().then((res:object)=>{
                data = {
                    status:"success",
                    response: [],
                    error:""
                }
            }).catch((err:any)=>{
                data = {
                    status:"failed",
                    response:[],
                    error:err
                }
            })
        }


    }catch(err){
        data = {
            status:"failed",
            response:[],
            error: err
        }
    }
    return NextResponse.json({data:data})
}