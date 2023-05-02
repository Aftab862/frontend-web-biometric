/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TableContainer from '@mui/material/TableContainer';
import DownloadIcon from '@mui/icons-material/Download';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from './data';
import DatePicker from 'react-date-picker';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import API from '../../API/api';
import { MoonLoader } from 'react-spinners';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const gpFund = () => {
    const [tabValue, setTabValue] = useState(0);
    const [stats, setStats] = useState();
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#36d7b7");

    const handleChange = (newValue) => {
        console.log('newVal', newValue);
        setTabValue(newValue);
    };
    const [selectedDate, handleDateChange] = useState(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()))



    const yearMonthFormatter = (locale, value) =>
        new Intl.DateTimeFormat(locale, {
            year: "numeric",
        }).format(value);

    function Datetostring(date) {
        const dateStr = date ?? "1-1-1999";
        const [day, monthStr, year] = dateStr.split("-");
        const month = Number(monthStr) - 1; // subtract 1 from month because Date months are 0-indexed

        const dateObj = new Date(year, month, day);
        return dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });

        // console.log(formattedDateStr); // Output: "April 2023"
    }
    const view = async () => {
        const date = new Date(selectedDate)
        const params = {

            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        try {
            const res = await API.get('/employee/stats', { params }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                }
            });
            console.log('response', res?.data?.records);
            setLoading(false)
            setStats(res?.data?.records);
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        setLoading(true)

        view();
    }, [setStats])

    const searchRecords = async () => {
        setLoading(true)
        const date = new Date(selectedDate)
        const params = {
            //     id: employeeId,
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        try {
            let res = await API.get("/employee/stats", { params }, {
                headers: {
                    Authorization: 'Bearer <token>',
                    'Content-Type': 'application/json'
                }
            })
            setStats(res?.data?.records);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const [showAlert, setShowAlert] = useState(false);
    const RemoveRecords = async () => {
        setOpen(false);
        setLoading(true)
        const params = {
            id: Eid,
        };
        try {
            const res = await API.delete('/employee/stats', { params }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                }
            });
            view()

        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }




    }
    const [open, setOpen] = React.useState(false);
    const [Eid, setEid] = React.useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        setEid(id)
    };

    const handleClose = () => {
        setOpen(false);
    };



    function generateXLSX(xlxdata) {
        const worksheet = XLSX.utils.json_to_sheet(xlxdata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const xlsxBuffer = XLSX.write(workbook, { type: 'buffer' });
        const fileName = 'YearlyRecord.xlsx';
        saveAs(new Blob([xlsxBuffer], { type: 'application/octet-stream' }), fileName);
    }
    const individualHandler = (user) => {
        let array = [];
        user.Data.map((e) => {
            const newObj = {
                date: e?.Salary?.date,
                ...e?.Salary?.basicInfo,
                ...e?.Salary?.Emoulments,
                ...e?.Salary?.deductions,
                totalPaid: e?.Salary?.totalPaid,
            };
            array.push(newObj);
        });
        const xlxdata = array;
        generateXLSX(xlxdata);
    }

    return (
        <>



            {(

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="fs-6">
                            Are you sure you want to remove this record? This action will permanently delete it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={RemoveRecords} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <AppBar className="mt-4" position="static">
                <Toolbar className="h-32 d-flex justify-content-between">
                    <Typography variant="h2">
                        <div className="text-white">Salaries Record</div>
                    </Typography>
                    <div style={{ color: "black", fontSize: "17px", display: 'flex' }} >
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            formatValue={yearMonthFormatter}
                            format="yyyy"
                            className="bg-white"
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
                    </div>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper} className="mt-4">
                <Table sx={{ minWidth: 450 }} className="mt-0" id="gpf-table">
                    <TableHead className="bg-gray-900">
                        <TableRow>
                            <TableCell className="text-gray-200 text-center">Sr.</TableCell>
                            <TableCell className="text-gray-200 text-center">Month</TableCell>
                            <TableCell className="text-gray-200 text-center">Total Amount</TableCell>
                            <TableCell className="text-gray-200 text-center">Monthly CSV Report</TableCell>
                            <TableCell className="text-gray-200 text-center">Remove Record</TableCell>

                        </TableRow>
                    </TableHead>

                    {loading ?
                        <MoonLoader
                            color={color}
                            loading={loading}
                            size={50}
                            cssOverride={
                                {

                                    borderColor: "red",
                                    position: "absolute",
                                    margin: "3%",
                                    left: "55%"

                                }
                            }


                        />
                        : stats && stats.length > 0 ?
                            (<TableBody>
                                {stats.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center" >{index + 1}</TableCell>
                                        <TableCell className="text-center">{Datetostring(employee?.Date)}</TableCell>
                                        <TableCell className="text-center">{employee?.TotalIncome}</TableCell>
                                        <TableCell className="text-center">

                                            <Tooltip title="Download the monthly Report">
                                                <Button
                                                    startIcon={<DownloadIcon />}
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => individualHandler(employee)}
                                                >
                                                    Download Excel
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Tooltip title="Delete Record">
                                                <Button onClick={() => handleClickOpen(employee?._id)}>
                                                    <DeleteOutlineIcon style={{ color: 'red' }} />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
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
            </TableContainer >
        </>
    );
};
export default gpFund;
