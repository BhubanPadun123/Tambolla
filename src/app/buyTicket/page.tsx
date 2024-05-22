"use client"
import React from "react";
import {
    Divider,
    Typography,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableBody,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,

} from "@mui/material"
import axios from "axios";
import {useRouter} from "next/navigation"

interface ticketObject {
    sl: number,
    number: number
}
interface player {
    contactNumber: number,
    playerName: string,

}

function TicketCounter() {
    const [state, setState] = React.useState<{
        bookedTicket: number[],
        gameList: object[],
        renderTicket: boolean,
        tounamentList: any,
        selectedTournament: string,
        showTicket: boolean
        userName: string,
        contactNumber: number,
        selectedTicket: number,
        showSubmit: boolean
    }>({
        bookedTicket: [],
        gameList: [],
        renderTicket: false,
        tounamentList: [],
        selectedTournament: "",
        showTicket: false,
        userName: "",
        contactNumber: 0,
        selectedTicket: 0,
        showSubmit: false
    })

    const navigation = useRouter()

    const handleFetchData = async () => {
        try {
            const response = await axios.get("/api/createGame")
            if (response) {
                const { filterList } = response.data
                setState({ ...state, tounamentList: filterList })
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    React.useEffect(() => {
        handleFetchData()
    }, [])

    const renderTounamentList = (list: object) => {
        return (
            <div>
                <Typography variant='h2' sx={{
                    color: "white",
                    fontSize: "2rem",
                    fontFamily: "Lato"
                }} >Select Your Tournament.</Typography>
                <Box component={Paper}
                    sx={{
                        width: "400px",
                        padding: "10px"
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel>Tournament Name</InputLabel>
                        <Select
                            value={state.selectedTournament}
                            onChange={(e: any) => { setState({ ...state, selectedTournament: e.target.value }) }}
                            variant='outlined'
                            label="Tournament Name"
                        >
                            {
                                Array.isArray(list) && list.map((l, idx) => {
                                    if (l.name) {
                                        return (
                                            <MenuItem value={l.name} key={idx}>{l.name}</MenuItem>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div>
        )
    }

    const handleTicketBooking = (tickeNo: number) => {
        if (tickeNo) {
            setState({
                ...state,
                selectedTicket: tickeNo,
                showSubmit: true
            })
        }
    }


    const renderTable = () => {
        let ticketObj: ticketObject[] = [];
        Array.from({ length: 100 }, (_, index) => {
            let item = {
                number: index + 1,
                sl: index + 1
            }
            ticketObj.push(item)
        })
        return (
            <TableContainer component={Paper} sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                <Table sx={{ width: "90%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-1</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-2</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-3</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-4</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-5</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-6</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-7</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-8</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-9</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ backgroundColor: "rgb(55, 64, 81)", fontSize: "1.2rem", color: "#fff", padding: "0px", height: "3rem", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>ROW-10</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.from({ length: 10 }, (__, idx) => {
                                let toBeSum = idx + 1
                                switch (toBeSum) {
                                    case 1:
                                        toBeSum = 1
                                        break;
                                    case 2:
                                        toBeSum = 11
                                        break;
                                    case 3:
                                        toBeSum = 21
                                        break;
                                    case 4:
                                        toBeSum = 31
                                        break;
                                    case 5:
                                        toBeSum = 41;
                                        break;
                                    case 6:
                                        toBeSum = 51;
                                        break;
                                    case 7:
                                        toBeSum = 61;
                                        break;
                                    case 8:
                                        toBeSum = 71;
                                        break;
                                    case 9:
                                        toBeSum = 81;
                                        break;
                                    case 10:
                                        toBeSum = 91
                                        break
                                    default:
                                        break;
                                }
                                return (
                                    <TableRow key={idx}>
                                        {
                                            Array.from({ length: 10 }, (_, item) => (
                                                <TableCell key={idx} className={`class-${item + toBeSum}`}>
                                                    <Typography className={state.bookedTicket.includes(item + toBeSum) ? "called" : `class-${item + toBeSum}`} sx={{ width: "100%", textAlign: "center", background: item + toBeSum % 2 === 1 ? "#b5736e" : "#f2d5d3", fontSize: "30px" }}>
                                                        <button style={{
                                                            width: "100%",
                                                            height: "50px",
                                                            borderRadius: "10px",
                                                            backgroundColor: item % 2 === 0 ? "#b5736e" : "#f2d5d3",
                                                            color: "#b3c936",
                                                            fontSize: "20px",
                                                            letterSpacing: "1px",
                                                            fontFamily: "Lato"
                                                        }}
                                                            onClick={() => {
                                                                handleTicketBooking(item + toBeSum)
                                                            }}
                                                        >
                                                            {
                                                                item + toBeSum
                                                            }
                                                        </button>
                                                    </Typography>
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return (
        <div className="col-md-12" style={{
            width: "100vw",
            height: `100vh`,
            textAlign: "center"
        }}>
            <Typography sx={{
                color: "white",
                textAlign: "center",
                padding: "20px",
                fontSize: "2.5rem",
                fontStyle: "normal",
                fontFamily: "Lato"
            }}>Ticket Counter</Typography>
            <Divider sx={{ width: "100%", border: "2px solid red" }} />
            <div style={{
                // width:"100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {
                    Array.isArray(state.tounamentList) && state.tounamentList.length > 0 && !state.showTicket &&
                    renderTounamentList(state.tounamentList)
                }
            </div>
            {
                state.selectedTournament.length > 0 && !state.showTicket && (
                    <Button sx={{ padding: "20px", marginTop: "10px", position: "relative" }} variant="contained"
                        onClick={async () => {
                            try {
                                const playerName = localStorage.getItem("playerName")
                                const contactNumber = localStorage.getItem("number")
                                // const params={param1:playerName,param2:contactNumber,params3:state.selectedTournament}
                                // const response = await axios.get('/api/createGame',{params})                                
                                playerName && contactNumber && setState({ ...state, showTicket: true })
                            } catch (e) {
                                console.log("error : ", e)
                            }
                        }}
                    >
                        Get Your Tournament Ticket
                    </Button>
                )
            }
            {
                state.showTicket && renderTable()
            }
            {
                state.showSubmit && (
                    <Typography >
                        <button style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "10px",
                            backgroundColor: "#b5736e",
                            fontSize: "20px",
                            letterSpacing: "1px",
                            fontFamily: "Lato"
                        }}
                        onClick={async()=>{
                            try {
                                const playerName = localStorage.getItem("playerName")
                                const contactNumber = localStorage.getItem("number")

                                const data = {
                                    playerName:playerName,
                                    contactNumber:contactNumber,
                                    tournamentName: state.selectedTournament,
                                    selectedTicket : state.selectedTicket
                                }
                                const response = await axios.post(`/api/buyTicket`,{data})
                                if(response.status === 200){
                                    navigation.push("/setup")
                                }
                            } catch (e) {
                                console.log("Error: ",e)
                            }
                        }}
                        >
                            Submit
                        </button>
                    </Typography>
                )
            }
        </div>
    )
}

export default TicketCounter