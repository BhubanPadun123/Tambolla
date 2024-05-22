"use client"
import React from "react";
import "@/app/setup/styles.css"
import { Divider, Typography, Table, TableBody, InputAdornment, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Tooltip } from "@mui/material";
import { CheckCircle, Close, LockClock } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import axios from "axios";


function generateRandomNumber() {
    const min = Math.pow(10, 9); // Minimum 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number

    // Generate a random number between min and max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}
interface Rows {
    id: number, awardName: string, winnerNumber: number | string, status: boolean, winnerName: string
}
interface Winner {
    awardName: string, winnerName: string
}
interface Participant {
    name: string, contactNumber: number
}
function GameSetup() {
    const router = useRouter()
    const [state, setState] = React.useState<{
        rows: Rows[],
        winner: Winner[],
        participants: Participant[],
        playerNumber: number,
        gameStartTime: string,
        showPlayerAddField: boolean
    }>({
        rows: [
            { id: generateRandomNumber(), awardName: "Top Line", winnerNumber: 1, status: true, winnerName: "" },
            { id: generateRandomNumber(), awardName: "Bottom Line", winnerNumber: 1, status: true, winnerName: "" },
            { id: generateRandomNumber(), awardName: "Middle Line", winnerNumber: 1, status: true, winnerName: "" },
            { id: generateRandomNumber(), awardName: "Star", winnerNumber: 1, status: true, winnerName: "" },
            { id: generateRandomNumber(), awardName: "Full House", winnerNumber: 1, status: true, winnerName: "" }
        ],
        winner: [
            { awardName: "", winnerName: "" }
        ],
        participants: [
            { name: "", contactNumber: 0 }
        ],
        playerNumber: 0,
        gameStartTime: "",
        showPlayerAddField: false
    })
    let tournamentName: any = null;
    let gameOwnerName: any = null;

    if (typeof window !== 'undefined') {
        // Accessing localStorage only on the client-side
        tournamentName = localStorage.getItem("tournamentName");
        gameOwnerName = localStorage.getItem("gameOwnerName");
    }
    React.useEffect(()=>{
        const fetchPlayerDataList=async()=>{
            try {
                const playerCollectionList = await axios.get(`/api/handleApiRoute`,{params:{param1:"getPlayer",param2:tournamentName}})
            } catch (error) {
                console.log("Error: ",error)
            }
        }
        fetchPlayerDataList()
    },[])
    const fetchData = async () => {
        if (tournamentName && gameOwnerName) {
            try {
                const createNewGame = await axios.get(`/api/createGame`);
                if (createNewGame.status === 200) {
                    let checkTournamentName = Array.isArray(createNewGame.data.filterList) &&
                        createNewGame.data.filterList.find((i: any) => i.name === tournamentName && i)
                    if (checkTournamentName) {
                        router.push("/startGame")
                    }
                }
            } catch (error) {
                console.error('Error creating new game:', error);
            }
        }
    }
    const createNewGame = async () => {
        try {
            if (tournamentName && gameOwnerName) {
                const gameStartTime = state.gameStartTime
                let data = {
                    tournamentName: tournamentName,
                    gameOwnerName: gameOwnerName,
                    gameStartTime: `${gameStartTime}`,
                    award: state.rows,
                    winner: state.winner,
                    participants: state.participants
                }
                const createNewGame = await axios.post(`/api/createGame`, { data });
                if (createNewGame.status < 400) {
                    const playerList = await axios.get("/api/createGame")
                    
                    setState({ ...state, showPlayerAddField: true })
                }
            }
        } catch (e) {
            console.log("Error : ", e)
        }
    }
    return (
        <div className="game-setup-wrapper">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <Typography sx={{ fontSize: '2.5rem', fontFamily: "Lato", fontWeight: 600, fontStyle: 'italic' }}>Share Link to the Participant.</Typography>
                    </div>
                    <div className="flip-card-back">
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "80px",
                            backgroundColor: "yellow",
                            padding: "20px"
                        }}>
                            <Typography sx={{ fontSize: "1.5rem", fontFamily: "Lato", color: 'GrayText' }}>WhatsApp Group invitation link</Typography>
                            <Button variant='contained'>
                                <a href="https://chat.whatsapp.com/I2OUaDGNXaQ9yagMkJlWgS" target="__blank">Share</a>
                            </Button>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "80px",
                            backgroundColor: "green",
                            padding: "20px"
                        }}>
                            <Typography sx={{ fontSize: "1.5rem", fontFamily: "Lato", color: 'orange' }}>Game invitation link</Typography>
                            <Button variant='contained'>
                                <a href="http://localhost:3000/setup" target="__blank">Share</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Typography sx={{
                fontSize: "3rem",
                width: "50%",
                textAlign: "left",
                color: 'white',
                fontFamily: 'Lato'
            }}>
                Game Setup
            </Typography>
            <Divider sx={{
                width: "60%",
                border: "2px solid red"
            }}
            />
            <TextField component={Paper}
                placeholder="Game Start Time"
                value={state.gameStartTime}
                onChange={(e) => { setState({ ...state, gameStartTime: e.target.value }) }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <LockClock />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <TableContainer component={Paper} sx={{ width: "55%" }}>
                <Table sx={{ minWidth: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography >Award Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>How Many?</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "none" }}></Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <TextField
                                            variant='standard'
                                            value={row.awardName === "Enter Award Name" ? "" : row.awardName}
                                            placeholder={row.awardName === "Enter Award Name" ? row.awardName : ""}
                                            onChange={(e) => {
                                                setState((prevState: any) => {
                                                    const updatedRow = prevState.rows.map((item: any) => {
                                                        if (item.id === row.id) {
                                                            return { id: row.id, awardName: e.target.value, winnerNumber: row.winnerNumber, status: row.status }
                                                        }
                                                        return item
                                                    })
                                                    return { ...prevState, rows: updatedRow }
                                                })
                                            }}
                                            type='text'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            variant='standard'
                                            value={row.winnerNumber}
                                            placeholder={"Enter Number of Winner."}
                                            onChange={(e) => {
                                                setState((prevState: any) => {
                                                    const updatedRow = prevState.rows.map((item: any) => {
                                                        if (item.id === row.id) {
                                                            return { id: row.id, awardName: row.awardName, winnerNumber: e.target.value, status: row.status }
                                                        }
                                                        return item
                                                    })
                                                    return { ...prevState, rows: updatedRow }
                                                })
                                            }}
                                            type='number'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {
                                            const newRow = state.rows.filter(item => item.id != row.id)
                                            setState({ ...state, rows: newRow })
                                        }}>
                                            <Tooltip arrow placement='bottom' title="Remove">
                                                {
                                                    row.status === false ? <CheckCircle /> : <Close />
                                                }
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="control-button-wrap">
                <Button variant='contained' onClick={() => { createNewGame() }}>Create Game</Button>
                <Button variant='outlined' onClick={() => {
                    const newAward = [
                        ...state.rows,
                        { id: generateRandomNumber(), awardName: "Enter Award Name", winnerNumber: 'Enter Number of Award', status: true, winnerName: "" }
                    ]
                    setState({ ...state, rows: newAward })
                }}>Add Award ?</Button>
                <Button variant='contained' onClick={() => { fetchData() }}>Start Game ?</Button>
            </div>
            {
                state.showPlayerAddField && (
                    <>
                        <Typography sx={{ width: "50%", textAlign: 'left', fontSize: '2.5rem', color: "white", fontFamily: "Lato", fontWeight: 600 }}>Players in Game</Typography>
                        <Typography sx={{ width: "55%", display: "flex", justifyContent: "space-around" }}>
                            <input
                                placeholder="Enter the Player's Contact Number here...."
                                type="number"
                                value={state.playerNumber}
                                onChange={(e) => {
                                    setState((prevState: any) => ({ ...prevState, playerNumber: e.target.value }))
                                }}
                                style={{
                                    width: "80%",
                                    height: "40px",
                                    color: " rgb(255, 203, 54)",
                                    fontSize: "2rem",
                                    letterSpacing: "0.2rem",
                                    padding: "10px",
                                    borderRadius: "10px"
                                }}
                            />
                            <Button
                                variant="contained"
                                disabled={state.playerNumber <= 0}
                                onClick={async () => {
                                    let newPlayer = [
                                        ...state.participants,
                                        { name: "", contactNumber: state.playerNumber }
                                    ]
                                    setState({ ...state, participants: newPlayer })
                                    if (tournamentName) {
                                        try {
                                            let data = {
                                                playerName: "",
                                                contactNumber: state.playerNumber,
                                                tournamentName: tournamentName
                                            }
                                            const createNewGame = await axios.post(`/api/addPlayer`, { data });
                                        } catch (error) {
                                            console.error('Error creating new game:', error);
                                        }
                                    }
                                }}
                            >
                                Add
                            </Button>
                        </Typography>
                        <Divider sx={{
                            width: "60%",
                            border: "1.5px solid red"
                        }}
                        />
                        <TableContainer component={Paper} sx={{ width: "55%", height: 'max-content' }}>
                            <Table sx={{ minWidth: "100%", height: 'max-content' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>Name</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}># of Tickets</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "cente" }}>Ready</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>Bhuban Padun</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>#12458515462</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>
                                                <CheckCircle sx={{ color: "red" }} />
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>Bhuban Padun</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>#12458515462</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>
                                                <CheckCircle sx={{ color: "red" }} />
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>Bhuban Padun</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>#12458515462</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>
                                                <CheckCircle sx={{ color: "red" }} />
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>Bhuban Padun</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>#12458515462</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ width: "100%", textAlign: "center" }}>
                                                <CheckCircle sx={{ color: "red" }} />
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            }
        </div>
    )
}

export default GameSetup