import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, IconButton, TextField, alpha, Input, FormControl, InputAdornment, makeStyles, createStyles } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
// import ReactPdfTable from "react-pdf-table";
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CsvDownload from 'react-json-to-csv';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import autoTable from 'jspdf-autotable'
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-date-picker";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { DomainVerification } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import { jsPDF } from "jspdf";


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import API from 'API/api';
import { display } from '@mui/system';
import { MoonLoader } from 'react-spinners';



const EmployeeTableData = ({ employees, setEmployees, handleClickOpen, tabValue }) => {
    // console.log('employees', employees);
    const [open, setOpen] = useState(false);
    const [data, setdata] = useState()
    let [loading, setLoading] = useState(false);
    const [selectedDate, handleDateChange] = useState(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()))


    useEffect(() => {

    }, [data])
    // console.log("salary", data)
    const [employeeId, setEmployeeId] = useState(null);
    const navigate = useNavigate();
    let [color, setColor] = useState("#36d7b7");

    const fetchSalaries = async (eId) => {
        setLoading(true)
        const date = new Date(selectedDate)
        const params = {
            id: eId,
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

            setdata(res);
            console.log("res", res)
            setLoading(false);
        } catch (error) {
            alert('error', error);
        }
    }

    // const openPreviousReportHandler = (id) => {
    //     navigate(`/PreviousTableData/${id}`);
    // };


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleClickOpenn = (id) => {
        setEmployeeId(id);
        setOpen(true);
        fetchSalaries(id)
        // const empData = empData.find((e) => e.id === id);
    };

    const handleClose = () => {
        setOpen(false);
        setEmployeeId(null);
        handleDateChange(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()))
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 20
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

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

            setLoading(false)
            setdata(res)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }


    const generatePdf = (id) => {

        console.log("called", id)

        let data = employees.find((employee) => employee.id === id)
        const doc = new jsPDF()
        let a = "aftab"
        doc.setFontSize(13);
        doc.text(20, 13, 'RACHNA COLLEGE OF ENGINEERING & TECHNOLOGY, GUJRANWALA')
        doc.setFontSize(10);
        doc.text(40, 18, '(A Constituent College of University of Engineering & Technology, Lahore.)')
        doc.setFontSize(10);
        doc.text(60, 25, '(PAY BILL FORM FOR "A" CLASS OFFICERS)')
        var date = moment();
        autoTable(doc, {
            // columnStyles: { 0: { halign: 'center', fillColor: [227, 227, 227] } , 1:{ halign: 'left',fillColor: [227, 227, 227]}},// ,  2:{ halign: 'left',fillColor: [0, 225, 0]}}, // Cells in first column centered and green
            margin: { top: 30 },
            // theme:'plain',
            styles: { fontSize: 6 },
            body: [
                ['Month', date.format("MMMM YYYY")],
                ['Name', data?.basicInfo?.name],
                ['Designation', data?.basicInfo?.designation],
                ['Account No ', data?.basicInfo?.accountNo],
                ['Department', data?.basicInfo?.department]
            ],
        })

        doc.setFontSize(8);
        autoTable(doc, {
            styles: { fontSize: 6 },
            margin: { top: 170 },
            // styles:{font:10},
            body: [
                ['Basic Pay', data?.currentPay?.amolument?.basicPay],
                ['Medical Allowance', data?.currentPay?.amolument?.medicalAllowance],
                ['Adhoc Relief Allowance', 0],
                ['House Rent Allowance ', data?.currentPay?.amolument?.houseRent],
                ['Conveyance Allowance', data?.currentPay?.amolument?.basicPay],
                ['Qualification Allowance', data?.currentPay?.amolument?.qualificationAllowance],
                ['Entertainment Allowance ', data?.currentPay?.amolument?.entertainment],
                ['Adhoc Relief Allowance', data?.currentPay?.amolument?.basicPay],
                ['Univ. Tech. Teaching Allowance', data?.currentPay?.amolument?.basicPay],
                ['Special Incentive Allowance For RCET, Regular Faculty ', data?.currentPay?.amolument?.specialReliefAllowance],
                ['Adhoc Relief Allowance', data?.currentPay?.amolument?.basicPay],
                ['Dareness Allowance', data?.currentPay?.amolument?.basicPay],
                ['  S.S.B   ', data?.currentPay?.amolument?.basicPay],
                ['  Total Emoluments  ', 9831],

            ],
        })


        autoTable(doc, {
            styles: { fontSize: 6 },
            margin: { top: 170 },
            // styles:{font:10},
            body: [
                ['Income Tax', data?.currentPay?.deductions?.incomeTax],
                ['G.P.F. Subscription', data?.currentPay?.deductions?.gPFSubscription],
                ['Recovery of G.P.F Advance', data?.currentPay?.deductions?.recGPF],
                ['House Building Advance ', data?.currentPay?.deductions?.houseRentR],
                ['Car / Scooter Advance', data?.currentPay?.deductions?.conveyanceAllowance],
                ['House Rent / Accomodation Charges ', data?.currentPay?.deductions?.houseRentR],
                ['Electricity Charges ', data?.currentPay?.deductions?.waterCharges],
                ['Water Charges', data?.currentPay?.deductions?.waterCharges],
                ['Trade Tax', data?.currentPay?.deductions?.uniTTAllowance],
                ['Benevolent Fund ', data?.currentPay?.deductions?.gPFSubscription],
                ['Group Insurance Premium / Trade Tax', data?.currentPay?.deductions?.groupInsurance],
                ['Eid Advance', data?.currentPay?.deductions?.eidAdvance],
                [' School Bus Charges   ', data?.currentPay?.deductions?.busCharges],
                ['  benevolentFund  ', data?.currentPay?.deductions.benevolentFund],
                ['  Total Deductions  ', 9831]

            ],
        })

        doc.setFontSize(8);
        doc.text(15, 65, 'Emoluments')

        doc.setFontSize(8);
        doc.text(15, 155, 'Deductions')

        doc.setFontSize(8);
        doc.text(15, 255, ` Received for the month of ${date.format("MMMM YYYY")} `)
        doc.setFontSize(8);
        doc.text(100, 255, `${data?.currentPay?.netPayable}`);

        doc.setFontSize(8);
        doc.text(130, 270, "Signature  : _________________")
        doc.save('table.pdf')
    }
    const yearMonthFormatter = (locale, value) =>
        new Intl.DateTimeFormat(locale, {
            year: "numeric",
        }).format(value);



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

    const handleDownload = () => {

        let array = [];
        data.data.map((e) => {
            const newObj = {
                date: e?.salary?.date,
                ...e?.basicInfo,
                ...e?.salary?.Emoulments,
                ...e?.salary?.deductions,
                totalPaid: e?.salary?.totalPaid,
            };
            array.push(newObj);
        });
        console.log("array", array)

        const xlxdata = array
        // [
        //     { name: 'John', age: 25 },
        //     { name: 'Jane', age: 30 },
        //     { name: 'Bob', age: 35 },
        // ];
        generateXLSX(xlxdata);
    }
    return (
        <>
            {
                employees.map((employee, index) => (
                    <TableRow key={employee.id}>
                        <TableCell>
                            <IconButton onClick={() => handleClickOpen(employee.id)}>
                                <LaunchIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>{employee?.basicInfo?.name}</TableCell>
                        <TableCell>{employee?.basicInfo?.email}</TableCell>
                        <TableCell>{employee?.basicInfo?.cnic}</TableCell>
                        <TableCell>{employee?.basicInfo?.accountNo}</TableCell>
                        <TableCell>{employee?.basicInfo?.category}</TableCell>
                        <TableCell>{employee?.basicInfo?.status}</TableCell>
                        <TableCell>
                            <Tooltip title="View Previous Reports">
                                <Button variant="outlined" color="secondary" size="small" onClick={() => handleClickOpenn(employee.id)}>
                                    View
                                </Button>
                            </Tooltip>
                        </TableCell>
                        {/* <Tooltip title="You don't have permission to do this" followCursor> */}
                        {tabValue === 1 && (
                            <TableCell>
                                <Button
                                    disabled={employee?.currentPay?.verified}
                                    onClick={async () => {
                                        try {
                                            await API.get(`/employee/verify/${employee.id}`, {
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                                                }
                                            });
                                            const index = employees.findIndex((em) => em.id === employee.id);
                                            const updatedEmployees = employees;
                                            updatedEmployees[index] = { ...employee, currentPay: { ...employee.currentPay, verified: true } };
                                            setEmployees([...updatedEmployees]);
                                        } catch (error) {
                                            console.log('error', error);
                                        }
                                    }}
                                    variant="outlined"
                                    startIcon={<DomainVerification />}
                                >
                                    {employee?.currentPay?.verified ? 'Verified' : 'Un-verified'}
                                </Button>
                            </TableCell>
                        )}
                        {/* </Tooltip> */}
                        {/* {tabValue === 1 && <TableCell>{employee.verified === 'true' && <Checkbox {...label} disabled checked />}</TableCell>}
                      {tabValue === 1 && <TableCell>{employee.verified === 'false' && <Checkbox {...label} disabled />}</TableCell>} */}
                        <TableCell>
                            <Tooltip title="Edit the Employee">
                                <Button
                                    onClick={() => {
                                        navigate(`/employee/${employee.id}`);
                                       }}
                                >
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title="Download the monthly Report">
                                <Button
                                    startIcon={<DownloadIcon />}
                                    variant="outlined"
                                    color="secondary"

                                    onClick={() => generatePdf(employee?.id)}
                                >
                                    Report
                                </Button>

                                {/* <Button variant="outlined" color="primary" startIcon={<DownloadIcon />}>
                                    <CsvDownload
                                        filename="Employee Monthly Sheet.csv"
                                        data={employees
                                            .map((emp) => {
                                                if (emp.id === employee.id) {
                                                    return {
                                                        ...emp.basicInfo,
                                                        ...{
                                                            ...emp.currentPay.amolument,
                                                            ...emp.deductions,
                                                            netPayable: emp.currentPay.netPayable
                                                        }
                                                    };
                                                }
                                                return null;
                                            })
                                            .filter((em) => em !== null)}
                                        delimiter="          "

                                    >
                                        Report


                                    </CsvDownload>
                                </Button> */}
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))
            }

            <Dialog fullScreen open={open} onClose={handleClose} >
                {/* {console.log(employees.find((employee) => employee.id === employeeId)?.salaries)} */}
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar className="h-32 d-flex justify-between">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h2">
                            {employees.find((employee) => employee.id === employeeId)?.basicInfo?.name}
                        </Typography>
                        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button> */}
                        <div style={{ color: "black", fontSize: "20px", display: 'flex' }} >

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


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date(MM-YYYY)</StyledTableCell>
                                <StyledTableCell align="center">Total Emoulments</StyledTableCell>
                                <StyledTableCell align="center">Total Deductions</StyledTableCell>
                                <StyledTableCell align="center">Net Payable</StyledTableCell>
                                <StyledTableCell align="center">Download CSV</StyledTableCell>
                            </TableRow>
                        </TableHead>


                        {/* <TableBody>
                            {employees
                                .find((employee) => employee.id === employeeId)
                                ?.map((row) => (
                                    <StyledTableRow key={row.month}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.month}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.totalAmolumentValue}</StyledTableCell>
                                        <StyledTableCell align="right">{row.totalDeductionValue}</StyledTableCell>
                                        <StyledTableCell align="right">{row.netPayableValue}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody> */}

                        {loading ?
                            <MoonLoader
                                color={color}
                                loading={loading}
                                size={50}
                                cssOverride={
                                    {
                                        position: "absolute",
                                        left: "45%",
                                        marginTop: "10%"
                                    }
                                }

                            />

                            : data?.data?.length > 0 ?

                                (<TableBody>


                                    {data?.data?.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                {row?.salary?.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" font="larger">
                                                {parseInt(row?.salary?.Emoulments?.basicPay) +
                                                    parseInt(row?.salary?.Emoulments?.chairmanAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.conPetAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.entertainment) +
                                                    parseInt(row?.salary?.Emoulments?.healthProfnlAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.houseRent) +
                                                    parseInt(row?.salary?.Emoulments?.medicalAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.nonPracticingAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.personalAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.qualificationAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.rTWardenAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.seniorPostAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.socialSecuirtyBenefit) +
                                                    parseInt(row?.salary?.Emoulments?.specialHealthCareAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.specialReliefAllowance) +
                                                    parseInt(row?.salary?.Emoulments?.tTAllowance)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {parseInt(row?.salary?.deductions?.accomadationCharges) +
                                                    parseInt(row?.salary?.deductions?.benevolentFund) +
                                                    parseInt(row?.salary?.deductions?.busCharges) +
                                                    parseInt(row?.salary?.deductions?.convRecovery) +
                                                    parseInt(row?.salary?.deductions?.conveyanceAllowance) +
                                                    parseInt(row?.salary?.deductions?.disableAllowance) +
                                                    parseInt(row?.salary?.deductions?.eidAdvance) +
                                                    parseInt(row?.salary?.deductions?.gIP) +
                                                    parseInt(row?.salary?.deductions?.gPFSubscription) +
                                                    parseInt(row?.salary?.deductions?.groupInsurance) +
                                                    parseInt(row?.salary?.deductions?.houseRentR) +
                                                    parseInt(row?.salary?.deductions?.incomeTax) +
                                                    parseInt(row?.salary?.deductions?.integratedAllowance) +
                                                    parseInt(row?.salary?.deductions?.recEidAdvance) +
                                                    parseInt(row?.salary?.deductions?.recGPF) +
                                                    parseInt(row?.salary?.deductions?.sSB) +
                                                    parseInt(row?.salary?.deductions?.shortDays) +
                                                    parseInt(row?.salary?.deductions?.speciialIncentive) +
                                                    parseInt(row?.salary?.deductions?.tSAFund) +
                                                    parseInt(row?.salary?.deductions?.uniTTAllowance) +
                                                    parseInt(row?.salary?.deductions?.waterCharges)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row?.salary?.totalPaid}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="outlined"
                                                    color="secondary"
                                                    onClick={() => individualHandler(row)}
                                                >
                                                    Download Excel file
                                                </Button>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                                )

                                : <Typography
                                    style={{
                                        position: "absolute",
                                        left: "40%",
                                        marginTop: "10%",
                                        color: "crimson"
                                    }}
                                    sx={{ ml: 2, flex: 1 }} variant="h2"
                                >No Record found</Typography>


                        }
                    </Table>
                </TableContainer>
            </Dialog>



        </>
    );
};

export default EmployeeTableData;






    // const pdfGenerator = () => {
    //     return employees.map((employee) => [
    //             if (emp.id === employee.id) {
    //         return {
    //             ...emp.basicInfo,
    //             ...{
    //                 ...emp.currentPay.amolument,
    //                 ...emp.deductions,
    //                 netPayable: emp.currentPay.netPayable
    //             }
    //         };
    //     }
    //     return null;
    //  ],


    //         );
    // }


    // const datafun = (index) => {
    //     let a = employees
    //         .find((employee) => employee.id === index)
    //     // .map((sal, ind) => {
    //     //     if (ind === index) {
    //     //         return {
    //     //             ...sal.amolument, ...sal.deductions, netPayable: sal.netPayable
    //     //         }
    //     //     }
    //     //     return undefined
    //     // })
    //     // .filter((em) => em !== undefined)
    //     console.log("id", a)
    //     return a
    // }
