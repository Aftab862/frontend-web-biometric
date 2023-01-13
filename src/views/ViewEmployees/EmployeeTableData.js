import React, { useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CsvDownload from 'react-json-to-csv';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
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


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import API from 'API/api';

const EmployeeTableData = ({ employees, setEmployees, handleClickOpen, tabValue }) => {
    console.log('employees', employees);
    const data = employees[0]?.salaries[0]
    console.log("salary", data)
    const [employeeId, setEmployeeId] = useState(null);
    const navigate = useNavigate();


    const openPreviousReportHandler = (id) => {
        navigate(`/PreviousTableData/${id}`);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // const properties = { header: 'Acme' };
    // const head = [['ID', 'Name', 'Catageory']];
    // const body = [
    //     employees.map(
    //         (employee) => (
    //             [1, employee.name, employee.category], [2, employee.name, employee.category], [3, employee.name, employee.category]
    //         )
    //     )
    // ];

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [open, setOpen] = useState(false);
    const handleClickOpenn = (id) => {
        setEmployeeId(id);
        setOpen(true);
        // const empData = empData.find((e) => e.id === id);
    };

    const handleClose = () => {
        setOpen(false);
        setEmployeeId(null);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
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
    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} >
                {/* {console.log(employees.find((employee) => employee.id === employeeId)?.salaries)} */}
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar className="h-32 d-flex justify-between">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h2" component="div">
                            {employees.find((employee) => employee.id === employeeId)?.basicInfo?.name}
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button> */}
                    </Toolbar>
                </AppBar>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date(MM-YYYY)</StyledTableCell>
                                <StyledTableCell align="right">Total Emoulments</StyledTableCell>
                                <StyledTableCell align="right">Total Deductions</StyledTableCell>
                                <StyledTableCell align="right">Net Payable</StyledTableCell>
                                <StyledTableCell align="right">Download CSV</StyledTableCell>
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
                        <TableBody>
                            {employees
                                .find((employee) => employee.id === employeeId)
                                ?.salaries?.map((row, index) => (
                                    <StyledTableRow key={row.date}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.date}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {parseInt(row.amolument?.basicPay) +
                                                parseInt(row.amolument?.chairmanAllowance) +
                                                parseInt(row.amolument?.conPetAllowance) +
                                                parseInt(row.amolument?.entertainment) +
                                                parseInt(row.amolument?.healthProfnlAllowance) +
                                                parseInt(row.amolument?.houseRent) +
                                                parseInt(row.amolument?.medicalAllowance) +
                                                parseInt(row.amolument?.nonPracticingAllowance) +
                                                parseInt(row.amolument?.personalAllowance) +
                                                parseInt(row.amolument?.qualificationAllowance) +
                                                parseInt(row.amolument?.rTWardenAllowance) +
                                                parseInt(row.amolument?.seniorPostAllowance) +
                                                parseInt(row.amolument?.socialSecuirtyBenefit) +
                                                parseInt(row.amolument?.specialHealthCareAllowance) +
                                                parseInt(row.amolument?.specialReliefAllowance) +
                                                parseInt(row.amolument?.tTAllowance)}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {parseInt(row.deductions?.accomadationCharges) +
                                                parseInt(row.deductions?.benevolentFund) +
                                                parseInt(row.deductions?.busCharges) +
                                                parseInt(row.deductions?.convRecovery) +
                                                parseInt(row.deductions?.conveyanceAllowance) +
                                                parseInt(row.deductions?.disableAllowance) +
                                                parseInt(row.deductions?.eidAdvance) +
                                                parseInt(row.deductions?.gIP) +
                                                parseInt(row.deductions?.gPFSubscription) +
                                                parseInt(row.deductions?.groupInsurance) +
                                                parseInt(row.deductions?.houseRentR) +
                                                parseInt(row.deductions?.incomeTax) +
                                                parseInt(row.deductions?.integratedAllowance) +
                                                parseInt(row.deductions?.recEidAdvance) +
                                                parseInt(row.deductions?.recGPF) +
                                                parseInt(row.deductions?.sSB) +
                                                parseInt(row.deductions?.shortDays) +
                                                parseInt(row.deductions?.speciialIncentive) +
                                                parseInt(row.deductions?.tSAFund) +
                                                parseInt(row.deductions?.uniTTAllowance) +
                                                parseInt(row.deductions?.waterCharges)}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.netPayable}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button   variant="outlined"
                                                color="secondary">
                                            <CsvDownload
                                              
                                                title="Download CSV"
                                                filename="previous_data.csv"
                                                // data={employees.find((employee, index) => (employee.id === employeeId)?.salaries[index])}
                                                data={
                                                    employees
                                                        .find((employee) => employee.id === employeeId).salaries
                                                        .map((sal, ind) => {
                                                            if (ind === index) {
                                                                return {
                                                                    ...sal.amolument, ...sal.deductions, netPayable: sal.netPayable
                                                                }
                                                            }
                                                            return undefined
                                                        })
                                                        .filter((em) => em !== undefined)
                                                }
                                            >
                                                Download
                                                
                                            </CsvDownload>
                                            </Button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
            {/* <React.Fragment>
                <PDF properties={properties} preview={true}>
                    <Text x={35} y={25} size={40}>
                        Octonyan loves jsPDF
                    </Text>
                    <Image src={OctoCatImage} x={15} y={40} width={180} height={180} />
                    <AddPage />
                    <Table head={head} body={body} />
                    <AddPage format="a6" orientation="l" />
                    <Text x={10} y={10} color="red">
                        Sample
                    </Text>
                </PDF>
            </React.Fragment> */}

            {
                employees.map((employee) => (
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
                                <IconButton
                                    onClick={() => {
                                        navigate(`/employee/${employee.id}`);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title="Download the monthly Report">
                                <Button variant="outlined" color="primary" startIcon={<DownloadIcon />}>
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
                                    >
                                        Report
                                    </CsvDownload>
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    );
};

export default EmployeeTableData;
