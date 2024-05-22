"use client"
import React from "react";
import "@/component/entry/styles.css"
import { Box, Button, Divider, Typography, colors } from "@mui/material"
import {useRouter} from "next/navigation"


function Entry() {
    const router = useRouter()
    return (
        <React.Fragment>
            <div className="entry-wrapper">
                <Box>
                    <Typography sx={{
                        letterSpacing: "-0.01562em",
                        fontSize: "5rem",
                        fontWeight: 600,
                        lineHeight: 1.125,
                        color: "white"
                    }}>
                        Tambola
                    </Typography>
                    <Typography sx={{
                        paddingBottom: "1rem",
                        fontWeight: 400,
                        fontSize: '3rem',
                        letterSpacing: "-0.00833em",
                        lineHeight: 1.2,
                        color: "white"
                    }}>
                        Anywhere Anytime
                    </Typography>
                    <Typography sx={{
                        color: "#a89e8a",
                        fontSize: "1rem",
                        fontFamily: "Lato"
                    }}>
                        Same Tambola fun with your loved ones on your browser. <br />Create a game and then share link to play together.
                    </Typography>
                    <Typography sx={{
                        padding: "10px",
                        marginTop: "20px"
                    }}>
                        <Button onClick={()=> {router.push("./create")}} sx={{
                            backgroundColor: "#ffcb36"
                        }}>
                            Create Game.
                        </Button>
                    </Typography>
                </Box>
                <Box id="img-box" sx={{
                    width: "50%",
                    height: "100%",
                    backgroundImage: `url(./entry_1.png)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} />
            </div>
            <Divider sx={{
                border:"2px solid #ffcb36"
            }}/>
            <Typography sx={{textAlign:"center",backgroundColor:"#0e141f",color:"white",padding:"100px"}}>
              <a href="#">
                Provide Feedback
              </a>
            </Typography>
        </React.Fragment>
    )
}

export default Entry