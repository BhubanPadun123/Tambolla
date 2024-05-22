"use client"
import React from "react";
import { Box, Button, ThemeProvider } from "@mui/material"
import {useRouter} from "next/navigation"

function JointGame() {
    const [state, setState] = React.useState({
        name: "",
        contactNumber:""
    })
    const router = useRouter()
    return (
        <ThemeProvider
            theme={{
                palette: {
                    primary: {
                        main: '#007FFF',
                        dark: '#0066CC',
                    },
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <h1 style={{
                        fontFamily: "Lato",
                        fontStyle: "italic",
                        fontWeight: "bold"
                    }}>Joint The Game.</h1>
                    <input
                        placeholder="Enter Your Name Here...."
                        style={{
                            padding: "20px",
                            width: "30%",
                            borderRadius: "20px",
                            fontSize: "40px",
                            fontFamily: "Lato"
                        }}
                        value={state.name}
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value })
                        }}
                    />
                    <input
                        placeholder="Enter Your Contact Number Here...."
                        style={{
                            padding: "20px",
                            width: "30%",
                            borderRadius: "20px",
                            fontSize: "40px",
                            fontFamily: "Lato"
                        }}
                        value={state.contactNumber}
                        onChange={(e) => {
                            setState({ ...state, contactNumber: e.target.value })
                        }}
                    />
                    {
                        state.name.length > 0 && state.contactNumber.length > 0 && (
                            <button style={{
                                width: "150px",
                                height: "60px",
                                borderRadius: "10px",
                                backgroundColor: "#a61f6e",
                                color: "#b3c936",
                                fontSize: "20px",
                                letterSpacing: "1px",
                                fontFamily: "Lato"
                            }}
                            onClick={()=>{
                                localStorage.setItem("playerName",state.name)
                                localStorage.setItem("number",state.contactNumber)
                                router.push("/buyTicket")
                            }}
                            >Go</button>
                        )
                    }
                </div>
            </Box>
        </ThemeProvider>
    )
}

export default JointGame