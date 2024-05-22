"use client"
import React from "react";
import { TableHead, Table, TableBody, TableContainer, Paper, TableCell, TableRow, Typography, Divider } from "@mui/material"
import "@/app/startGame/styles.css"
import {Axios} from "axios"

interface Row {
    id: number;
    name: string;
}
function generateRandomNumber() {
    const min = Math.pow(10, 9); // Minimum 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number

    // Generate a random number between min and max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}
let numberToCall: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99,
]
function StartGame() {
    const [state, setState] = React.useState<{
        tableHeader: Row[],
        calledNumbers: number[],
    }>({
        tableHeader: [
            { id: generateRandomNumber(), name: "Row-1" },
            { id: generateRandomNumber(), name: "Row-2" },
            { id: generateRandomNumber(), name: "Row-3" },
            { id: generateRandomNumber(), name: "Row-4" },
            { id: generateRandomNumber(), name: "Row-5" },
            { id: generateRandomNumber(), name: "Row-6" },
            { id: generateRandomNumber(), name: "Row-7" },
            { id: generateRandomNumber(), name: "Row-8" },
            { id: generateRandomNumber(), name: "Row-9" },
            { id: generateRandomNumber(), name: "Row-10" }
        ],
        calledNumbers: []
    })
    function getRandomIndexNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generateUniqueRandomNumber(): number {
        let randomNumber = 0
        if (numberToCall.length > 0) {
            if (numberToCall.length === 1) {
                randomNumber = numberToCall[0]
                return randomNumber
            }
            const arrayIdx = getRandomIndexNumber(0, numberToCall.length - 1)
            randomNumber = numberToCall[arrayIdx - 1]
        }
        return randomNumber;
    };
    async function textToSpeech(text: string) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text
        utterance.pitch = 1
        utterance.rate = 1
        utterance.volume = 1
        const synth = window.speechSynthesis;
        await synth.speak(utterance);
    }
    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            if(numberToCall.length === 0){
                return
            }
            let newNumber: number = generateUniqueRandomNumber();
            if (state.calledNumbers.includes(newNumber)) {
                return
            } else {
                if (newNumber < 10) {
                    await textToSpeech(`Single number ${newNumber.toString()}`)
                } else {
                    await textToSpeech(`${newNumber.toString().charAt(0)} and ${newNumber.toString().charAt(1)} ${newNumber.toString()}`)
                }
                let newNumToCall: number[] = numberToCall.filter(num => num != newNumber)
                numberToCall = newNumToCall
                setState((prevState) => ({ ...prevState, calledNumbers: [...prevState.calledNumbers, newNumber] }))
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [])
    return (
        <div style={{
            width: "100%",
            height: "auto",
        }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                state.tableHeader.map((item) => {
                                    return (
                                        <TableCell key={item.id}>
                                            <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }} >{item.name}</Typography>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <Divider />
                    <TableBody>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 0 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 0 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [51, 52, 53, 54, 55, 56, 57, 58, 59, 60].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 0 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [61, 62, 63, 64, 65, 66, 67, 68, 69, 70].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [71, 72, 73, 74, 75, 76, 77, 78, 79, 80].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 0 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [81, 82, 83, 84, 85, 86, 87, 88, 89, 90].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                    <TableBody>
                        {
                            [91, 92, 93, 94, 95, 96, 97, 98, 99].map((item) => {
                                return (
                                    <TableCell className={`class-${item}`}>
                                        <Typography className={state.calledNumbers.includes(item) ? "called" : `class-${item}`} sx={{ width: "100%", textAlign: "center", background: item % 2 === 0 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>{item}</Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default StartGame