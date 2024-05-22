"use client"
import React from "react";
import "@/app/pages/create/styles.css"
import { Button, Typography } from "@mui/material"
import {useRouter} from "next/navigation"
function CreateGame() {
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [state, setState] = React.useState({
        userName: ""
    })
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef])
    return (
        <div className="create-wrapper">
            <Typography sx={{
                fontSize: "4rem",
                color: "white",
                fontFamily: "Lato",
                fontWeight: 600
            }}>
                Hi. What's your name?
            </Typography>
            <input className="input-field"
                placeholder="Enter Your Name Here."
                value={state.userName}
                ref={inputRef}
                onChange={(e)=> {
                    setState({...state,userName:e.target.value})
                }}
            />
            {
                state.userName.length > 0 && (
                    <Typography sx={{ textAlign: 'center', width: "40%", padding: "40px", paddingLeft: "0px" }}>
                        <Button variant='contained' onClick={()=> router.push('/setup')}>
                            Ok
                        </Button>
                    </Typography>
                )
            }
        </div>
    )
}

export default CreateGame