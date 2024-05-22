"use client"
import { Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";


function CreateGame() {
    const route = useRouter()
    const [state, setState] = React.useState({
        value: "",
        tournamentName: ""
    })
    
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px"
        }}>
            <Typography sx={{
                color: "white",
                fontSize: '3rem',
                padding: "20px",
            }}>
                Hi. What's your name?
            </Typography>
            <input
                placeholder="Type Your Name Gmail Here..."
                value={state.value}
                onChange={(e) => {
                    setState({ ...state, value: e.target.value })
                }}
                style={{
                    width: "40%",
                    height: "40px",
                    color: " rgb(255, 203, 54)",
                    fontSize: "2rem",
                    letterSpacing: "0.2rem",
                    padding: "10px",
                    borderRadius: "10px"
                }}
            />
            <input
                placeholder="Type Tournament Name Here..."
                value={state.tournamentName}
                onChange={(e) => {
                    setState({ ...state, tournamentName: e.target.value })
                }}
                style={{
                    width: "40%",
                    height: "40px",
                    color: " rgb(255, 203, 54)",
                    fontSize: "2rem",
                    letterSpacing: "0.2rem",
                    padding: "10px",
                    borderRadius: "10px"
                }}
            />
            {
                state.value.length > 0 && state.tournamentName.length > 0 && (
                    <Typography sx={{
                        width: "40%",
                        textAlign: 'center',
                        padding: "30px"
                    }}>
                        <Button variant='contained' onClick={() => {
                            localStorage.setItem("tournamentName",state.tournamentName)
                            localStorage.setItem("gameOwnerName",state.value)
                            route.push('/setup')
                        }}>
                            Create
                        </Button>
                    </Typography>
                )
            }
        </div>
    )
}

export default CreateGame