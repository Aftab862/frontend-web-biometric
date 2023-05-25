import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CsvDownload from 'react-json-to-csv';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from 'API/api';
import { useSelector } from 'react-redux';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { MoonLoader } from 'react-spinners';
import DatePicker from "react-date-picker";


const SearchRecords = () => {
    const [employeeData, setEmployeeData] = useState({});
    const employeeId = localStorage.getItem('rcet-userId')
    const username = localStorage.getItem('username')
    const [selectedDate, handleDateChange] = useState(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()))

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#36d7b7");


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [open, setOpen] = React.useState(false);
    const [employeepopup, setEmployeepopup] = React.useState({});

    const handleClickOpen = (id) => {

        setOpen(true);
        setEmployeepopup(employeeData.find(s => s.id === id));
    };
    const handleClose = () => {
        setOpen(false);
        setEmployeepopup({});
    };


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

    useEffect(() => {

        const fetchSalaries = async () => {
            setLoading(true)
            const date = new Date(selectedDate)
            const params = {
                id: employeeId,
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };
            try {
                let res = await API.get("/employee/getSalaries", { params }, {
                    headers: {
                        Authorization: 'Bearer <token>',
                        'Content-Type': 'application/json'
                    }
                })

                setEmployeeData(res.data);
                setLoading(false);
            } catch (error) {
                alert('error', error);
                setLoading(false)
            }
        }
        fetchSalaries()
    }, []);



    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch'
                }
            }
        }
    }));



    const yearMonthFormatter = (locale, value) =>
        new Intl.DateTimeFormat(locale, {
            year: "numeric",
        }).format(value);

    const handleDownload = () => {
        let array = [];
        employeeData.map((e) => {
            const newObj = {
                date: e?.salary?.date,
                ...e?.basicInfo,
                ...e?.salary?.Emoulments,
                ...e?.salary?.deductions,
                totalPaid: e?.salary?.totalPaid,
            };
            array.push(newObj);
        });
        const xlxdata = array
        // [
        //     { name: 'John', age: 25 },
        //     { name: 'Jane', age: 30 },
        //     { name: 'Bob', age: 35 },
        // ];
        generateXLSX(xlxdata);
    }





    const searchRecords = async () => {
        setLoading(true)
        const date = new Date(selectedDate)
        const params = {
            id: employeeId,
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        try {
            let res = await API.get("/employee/getSalaries", { params }, {
                headers: {
                    Authorization: 'Bearer <token>',
                    'Content-Type': 'application/json'
                }
            })
            setEmployeeData(res.data)

            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }


    function generateXLSX(xlxdata) {
        const worksheet = XLSX.utils.json_to_sheet(xlxdata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const xlsxBuffer = XLSX.write(workbook, { type: 'buffer' });
        const fileName = 'myData.xlsx';
        saveAs(new Blob([xlsxBuffer], { type: 'application/octet-stream' }), fileName);
    }


    const individualHandler = (user) => {

     
        let array = [];
        const newObj = {
            date: user?.salary?.date,
            ...user?.basicInfo,
            ...user?.salary?.Emoulments,
            ...user?.salary?.deductions,
            totalPaid: user?.salary?.totalPaid,
        };
        array.push(newObj)
        const xlxdata = array
        generateXLSX(xlxdata);

    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar className="h-28 d-flex justify-between">

                            <Typography variant="h2" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                {username}
                            </Typography>
                            <div style={{ color: "black", fontSize: "17px", display: 'flex' }} >
                                <DatePicker
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    formatValue={yearMonthFormatter}
                                    format="yyyy"
                                />
                                <div style={{
                                    background: "seagreen",
                                    color: "white",
                                    textAlign: "center",
                                    margin: "0px 20px"
                                }}>
                                    <Button autoFocus color="inherit" onClick={searchRecords} >
                                        Search
                                    </Button>
                                </div>

                                <div style={{
                                    background: "seagreen",
                                    textAlign: "center",
                                    color: "white",

                                }}>
                                    <Button autoFocus color="inherit" onClick={handleDownload} >
                                        Download Excel
                                    </Button>
                                </div>

                            </div>

                        </Toolbar>
                    </AppBar>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Month-Year</StyledTableCell>
                                <StyledTableCell align="center">Amoluments</StyledTableCell>
                                <StyledTableCell align="center">Deductions</StyledTableCell>
                                <StyledTableCell align="center">netPayable</StyledTableCell>
                                <StyledTableCell align="center">View Month data</StyledTableCell>
                                <StyledTableCell align="center">Download Month data</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {loading ?
                            <MoonLoader
                                color={color}
                                loading={loading}
                                size={50}
                                cssOverride={
                                    {
                                        // position: "absolute",
                                        // left: "45%",
                                        // marginTop: "9%"
                                        position: "absolute",
                                        /* left: 40%; */
                                        marginTop: "10%",

                                        width: "-webkit-fill-available",
                                        /* height: 100dvh; */
                                        /* display: flex; */
                                        textAlign: "center",
                                        alignItems: "center"
                                    }
                                }

                            />
                            : employeeData.length > 0 ?

                                (< TableBody >
                                    {employeeData?.map((empd, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                {empd?.salary?.date.slice(3, 10)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {empd?.salary?.Emoulments?.totalAmoluments}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {empd?.salary?.deductions?.totalDeductions}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{empd?.salary?.totalPaid}</StyledTableCell>
                                            <StyledTableCell align="center"><Button variant="outlined" onClick={() => handleClickOpen(empd.id)}>View</Button></StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button variant="outlined"
                                                    color="secondary"
                                                    onClick={() => individualHandler(empd)}
                                                >
                                                    Download
                                                </Button>


                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>)


                                : <Typography
                                    style={{
                                        position: "absolute",
                                        /* left: 40%; */
                                        marginTop: "10%",
                                        color: "crimson",
                                        width: "-webkit-fill-available",
                                        /* height: 100dvh; */
                                        /* display: flex; */
                                        textAlign: "center"
                                    }}
                                    sx={{ ml: 2, flex: 1 }} variant="h2"
                                >No Record found</Typography>
                        }

                    </Table>
                </TableContainer>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}

                >
                    <BootstrapDialogTitle id="customized-dialog-title" style={{ width: "699px" }} onClose={handleClose}>
                        {employeepopup?.salary?.date}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography variant="h4" gutterBottom>
                            Amoluments
                        </Typography>
                        <Typography gutterBottom>
                            BASIC Pay &nbsp; : &nbsp;{employeepopup?.salary?.Emoulments?.basicPay}<br />
                            NON Practicing-Allowance &nbsp;:&nbsp; {employeepopup?.salary?.Emoulments?.nonPracticingAllowance}<br />
                            SPECIALHEALTHCAREALLOWANCE&nbsp;:&nbsp; {employeepopup?.salary?.Emoulments?.specialHealthCareAllowance}<br />
                            HEALTHPROFNLALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.healthProfnlAllowance}<br />
                            HOUSERENT&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.houseRent}<br />
                            CONPETALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.conPetAllowance}<br />
                            QUALIFICATIONALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.qualificationAllowance}<br />
                            ENTERTAINMENT&nbsp;:&nbsp; : {employeepopup?.salary?.Emoulments?.entertainment}<br />
                            PERSONALALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.personalAllowance}<br />
                            TTALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.tTAllowance}<br />
                            MEDICALALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.medicalAllowance}<br />
                            SOCIALSECUIRTYBENEFIT&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.socialSecuirtyBenefit}<br />
                            SENIORPOSTALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.seniorPostAllowance}<br />
                            CHAIRMANALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.chairmanAllowance}<br />
                            RTWARDENALLOWANCE&nbsp;:&nbsp;  {employeepopup?.salary?.Emoulments?.rTWardenAllowance}<br />

                        </Typography>
                        <DialogContent dividers>
                            <Typography variant="h4" gutterBottom>
                                Deductions
                            </Typography>
                            <Typography gutterBottom>
                                ACCOMADATIONCHARGES :{employeepopup?.salary?.deductions?.accomadationCharges}<br />
                                BENEVOLENTFUND :{employeepopup?.salary?.deductions?.benevolentFund}<br />
                                BUSCHARGES :{employeepopup?.salary?.deductions?.busCharges}<br />
                                CONVRECOVERY :{employeepopup?.salary?.deductions?.convRecovery}<br />
                                CONVEYANCEALLOWANCE :{employeepopup?.salary?.deductions?.benevolentFund}<br />
                                DISABLEALLOWANCE :{employeepopup?.salary?.deductions?.disableAllowance}<br />
                                EIDADVANCE :{employeepopup?.salary?.deductions?.eidAdvance}<br />
                                GIP :{employeepopup?.salary?.deductions?.gIP}<br />
                                GPFSUBSCRIPTION :{employeepopup?.salary?.deductions?.gPFSubscription}<br />
                                GROUPINSURANCE :{employeepopup?.salary?.deductions?.groupInsurance}<br />
                                HOUSERENTR :{employeepopup?.salary?.deductions?.houseRentR}<br />
                                INCOMETAX :{employeepopup?.salary?.deductions?.incomeTax}<br />
                                INTEGRATEDALLOWANCE :{employeepopup?.salary?.deductions?.integratedAllowance}<br />
                                RECEIDADVANCE :{employeepopup?.salary?.deductions?.recEidAdvance}<br />
                                RECGPF :{employeepopup?.salary?.deductions?.recGPF}<br />
                                SSB :{employeepopup?.salary?.deductions?.sSB}<br />
                                SHORTDAYS :{employeepopup?.salary?.deductions?.shortDays}<br />
                                SPECIIALINCENTIVE :{employeepopup?.salary?.deductions?.speciialIncentive}<br />
                                TSAFUND :{employeepopup?.salary?.deductions?.tSAFund}<br />
                                UNITTALLOWANCE :{employeepopup?.salary?.deductions?.uniTTAllowance}<br />
                                WATERCHARGES :{employeepopup?.salary?.deductions?.waterCharges}<br />
                            </Typography>
                        </DialogContent>
                        <DialogContent dividers>
                            <Typography variant="h4" gutterBottom>
                                Net Payable
                            </Typography>
                            <Typography gutterBottom>
                                {employeepopup?.salary?.totalPaid}<br />
                            </Typography>
                        </DialogContent>


                    </DialogContent>

                </BootstrapDialog>
                {/* ))} */}

            </div >
        </>
    );
};

export default SearchRecords;
