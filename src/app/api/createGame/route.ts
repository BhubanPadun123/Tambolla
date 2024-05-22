import clientPromise from "@/db/connection";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import createGame from "@/db/model/gameModel";
import { NextApiRequest } from "next";


export async function POST(request: NextRequest) {
    try {
        await clientPromise()
        const reqBody = await request.json()
        const {
            tournamentName,
            gameOwnerName,
            gameStartTime,
            award,
            winner,
            participants
        } = reqBody.data

        let activeGame = await createGame.findOne({ tournamentName: tournamentName })
        if (!activeGame) {
            const newGame = tournamentName && new createGame({
                tournamentName: tournamentName,
                gameOwnerName: gameOwnerName,
                gameStartTime: gameStartTime,
                award: award,
                winner: winner,
                participants: participants,
                bookedTicket:[]
            })
            await newGame.save()
            return NextResponse.json({ message: "Game created successfully", data: newGame }, { status: 200 })
        } else {
            let findActiveGame: any = await createGame.findOneAndReplace(
                { gameOwnerName: gameOwnerName },
                {
                    tournamentName: tournamentName,
                    gameOwnerName: gameOwnerName,
                    gameStartTime: gameStartTime,
                    award: award,
                    winner: winner,
                    participants: participants,
                }
            )
            if (!findActiveGame) {
                findActiveGame = new createGame({
                    tournamentName: tournamentName,
                    gameOwnerName: gameOwnerName,
                    gameStartTime: gameStartTime,
                    award: award,
                    winner: winner,
                    participants: participants,
                    bookedTicket:[]
                })
                await findActiveGame.save()
            }
            return NextResponse.json({ message: "Game data save successfully!!", data: findActiveGame }, { status: 202 })
        }
    } catch (error: any) {
        return NextResponse.json({
            error: error,
        }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    await clientPromise()
    try {
        let allGameCollection = await createGame.find({})
        if (allGameCollection.length > 0) {
            let filterList: any = []
            allGameCollection.map((t, idx) => {
                let tList = {
                    name: t.tournamentName,
                    id: idx
                }
                filterList.push(tList)
            })
            return NextResponse.json({
                message: "Game collection list",
                filterList
            }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Game list not create yet" }, { status: 500 })
        }

    } catch (error) {
        console.log("Error==>", error)
        return NextResponse.json({ message: "Error while API call", data: error }, { status: 500 })
    }
}

