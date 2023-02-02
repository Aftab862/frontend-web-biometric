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
    // console.log('employees', employees);
    const data = employees[0]?.salaries[0]
    // console.log("salary", data)
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
                        <TableBody>
                            {employees
                                .find((employee) => employee.id === employeeId)
                                ?.salaries?.map((row, index) => (
                                    <StyledTableRow key={row?.obj?.date}>

                                        <StyledTableCell component="th" scope="row">
                                            {row?.obj?.date}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" font="larger">
                                            {parseInt(row?.obj?.Emoulments?.basicPay) +
                                                parseInt(row?.obj?.Emoulments?.chairmanAllowance) +
                                                parseInt(row?.obj?.Emoulments?.conPetAllowance) +
                                                parseInt(row?.obj?.Emoulments?.entertainment) +
                                                parseInt(row?.obj?.Emoulments?.healthProfnlAllowance) +
                                                parseInt(row?.obj?.Emoulments?.houseRent) +
                                                parseInt(row?.obj?.Emoulments?.medicalAllowance) +
                                                parseInt(row?.obj?.Emoulments?.nonPracticingAllowance) +
                                                parseInt(row?.obj?.Emoulments?.personalAllowance) +
                                                parseInt(row?.obj?.Emoulments?.qualificationAllowance) +
                                                parseInt(row?.obj?.Emoulments?.rTWardenAllowance) +
                                                parseInt(row?.obj?.Emoulments?.seniorPostAllowance) +
                                                parseInt(row?.obj?.Emoulments?.socialSecuirtyBenefit) +
                                                parseInt(row?.obj?.Emoulments?.specialHealthCareAllowance) +
                                                parseInt(row?.obj?.Emoulments?.specialReliefAllowance) +
                                                parseInt(row?.obj?.Emoulments?.tTAllowance)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {parseInt(row?.obj?.deductions?.accomadationCharges) +
                                                parseInt(row?.obj?.deductions?.benevolentFund) +
                                                parseInt(row?.obj?.deductions?.busCharges) +
                                                parseInt(row?.obj?.deductions?.convRecovery) +
                                                parseInt(row?.obj?.deductions?.conveyanceAllowance) +
                                                parseInt(row?.obj?.deductions?.disableAllowance) +
                                                parseInt(row?.obj?.deductions?.eidAdvance) +
                                                parseInt(row?.obj?.deductions?.gIP) +
                                                parseInt(row?.obj?.deductions?.gPFSubscription) +
                                                parseInt(row?.obj?.deductions?.groupInsurance) +
                                                parseInt(row?.obj?.deductions?.houseRentR) +
                                                parseInt(row?.obj?.deductions?.incomeTax) +
                                                parseInt(row?.obj?.deductions?.integratedAllowance) +
                                                parseInt(row?.obj?.deductions?.recEidAdvance) +
                                                parseInt(row?.obj?.deductions?.recGPF) +
                                                parseInt(row?.obj?.deductions?.sSB) +
                                                parseInt(row?.obj?.deductions?.shortDays) +
                                                parseInt(row?.obj?.deductions?.speciialIncentive) +
                                                parseInt(row?.obj?.deductions?.tSAFund) +
                                                parseInt(row?.obj?.deductions?.uniTTAllowance) +
                                                parseInt(row?.obj?.deductions?.waterCharges)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row?.obj?.totalPaid}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button variant="outlined"
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
                                        delimiter="          "

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
