/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import EmailIcon from '@mui/icons-material/Email';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ClassIcon from '@mui/icons-material/Class';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
// import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Api } from '@mui/icons-material';
// import ViewEmployeesModal from './viewEmployeesModal';
import API from '../../API/api';
import Tabs from '@mui/material/Tabs';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tab from '@mui/material/Tab';
import EmployeeTable from './EmployeeTableData';
import CsvDownload from 'react-json-to-csv';
// import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { DialogContentText, Input, TextField, Tooltip } from '@mui/material';
import MoonLoader from 'react-spinners/MoonLoader';
// import PDF, { Text, AddPage, Line, Image, Html } from 'jspdf-react';
import { jsPDF } from "jspdf";
import * as autoTable from 'jspdf-autotable'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// import TabPanel from '@mui/lab/TabPanel';
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import CsvDownload from 'react-json-to-csv'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    color: "whitesmoke",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    // marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(80),
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

const input = styled(InputBase)(({ theme }) => ({
    //     ::placeholder:{
    //     color: "#909"
    // },
    // color: 'white',
    '&::placeholder': {
        color: 'yellow',
        backgroundColor: "white"
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
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
                        color: (theme) => theme.palette.grey[500]
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
    onClose: PropTypes.func.isRequired
};

const downloadCsvHeandler = (employee) => { };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function ViewEmployees() {
    // const head = [['Name', 'Email', 'CNIC', 'Account No', 'Employee Catagory']];
    // const body = [(data = [employees.filter((emp) => emp.id === employee.id)])];
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#36d7b7");

    const [data, showData] = useState({});
    const [employeeData, setemployeeData] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [Comit, setCommit] = useState();
    const [openComit, setOpenComit] = React.useState(false);

    const handleChange = (newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await API.get('/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    }
                });
                // console.log('response', res.data);
                setemployeeData(res.data.results);
                setLoading(false)
            } catch (error) {
                alert("Connection Error")
            }
        };
        fetchData();
        if (employeeData.length != 0) setLoading(false)

    }, [setemployeeData]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        // eslint-disable-next-line no-const-assign
        const employeedata = employeeData.find((e) => e.id === id);
        showData(employeedata);
    };
    // console.log(employeeData);
    const handleClose = () => {
        setOpen(false);
    };

    const [searchText, setSearchText] = useState('');





    function generateXLSX(xlxdata) {
        const worksheet = XLSX.utils.json_to_sheet(xlxdata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const xlsxBuffer = XLSX.write(workbook, { type: 'buffer' });
        const fileName = 'EmployeesData.xlsx';
        saveAs(new Blob([xlsxBuffer], { type: 'application/octet-stream' }), fileName);
    }
    const handleDownload = () => {
        let array = [];
        employeeData.map((e) => {
            if (tabValue === 0 && e?.basicInfo?.category === 'Current Employee') {
                const newObj = {
                    ...e?.basicInfo,
                    ...e?.currentPay?.amolument,
                    ...e?.currentPay?.deductions,
                    netPayable: e?.currentPay?.netPayable,
                };
                array.push(newObj);
            } else if (tabValue === 1 && e?.basicInfo?.category === 'Pensioner') {
                const newObj = {
                    ...e?.basicInfo,
                    ...e?.currentPay?.amolument,
                    ...e?.currentPay?.deductions,
                    netPayable: e?.currentPay?.netPayable,
                };
                array.push(newObj);

            }
        }).filter((em) => em !== undefined)
        console.log(array)
        const xlxdata = array
        generateXLSX(xlxdata);
    }







    // console.log(
    //     'dummy test->',
    //     employeeData
    //         .map((ed) => {
    //             if (tabValue === 0 && ed?.basicInfo?.category === 'Current Employee') {
    //                 return {
    //                     ...ed.basicInfo,
    //                     ...{ ...ed.currentPay.amolument, ...ed.deductions, netPayable: ed.currentPay.netPayable }
    //                 };
    //             } else if (tabValue === 1 && ed?.basicInfo?.category === 'Pensioner') {
    //                 return {
    //                     ...ed.basicInfo,
    //                     ...{ ...ed.currentPay.amolument, ...ed.deductions, netPayable: ed.currentPay.netPayable }
    //                 };
    //             }
    //         })
    //         .filter((em) => em !== undefined)
    // );


    // function download_DIVPdf(divid) {
    //     var pdf = new jsPDF('p', 'pt', 'letter');
    //     var pdf_name = 'PostMode-' + om + '.pdf';
    //     // source can be HTML-formatted string, or a reference
    //     // to an actual DOM element from which the text will be scraped.
    //     htmlsource = $('#' + divid)[0];

    //     specialElementHandlers = {
    //         // element with id of "bypass" - jQuery style selector
    //         '#bypassme': function (element, renderer) {
    //             // true = "handled elsewhere, bypass text extraction"
    //             return true;
    //         }
    //     };
    //     margins = {
    //         top: 80,
    //         bottom: 60,
    //         left: 40,
    //         width: 522
    //     };

    //     pdf.fromHTML(
    //         htmlsource, // HTML string or DOM elem ref.
    //         margins.left, // x coord
    //         margins.top,
    //         {
    //             // y coord
    //             width: margins.width, // max width of content on PDF
    //             elementHandlers: specialElementHandlers
    //         },

    //         function (dispose) {
    //             pdf.save(pdf_name);
    //         },
    //         margins
    //     );
    // }
    var totalPayable = 0;
    const pdfGenerator = () => {
        return employeeData.map((employee) => [
            employee?.basicInfo?.name,
            // employee?.basicInfo?.email,
            employee?.basicInfo?.cnic,
            employee?.basicInfo?.accountNo,
            employee?.basicInfo?.category,
            // employee?.basicInfo?.status,
            employee.currentPay?.amolument?.totalAmoluments,

            // employee.currentPay?.amolument?.basicPay +
            // employee?.currentPay?.amolument?.chairmanAllowance +
            // employee?.currentPay?.amolument?.conPetAllowance +
            // employee?.currentPay?.amolument?.conveyanceAllowance +
            // employee?.currentPay?.amolument?.healthProfnlAllowance +
            // employee?.currentPay?.amolument?.disableAllowance +
            // employee?.currentPay?.amolument?.extraAllowance +
            // employee?.currentPay?.amolument?.darenessAllowance +
            // employee?.currentPay?.amolument?.specialIncentiveAllowance +
            // employee?.currentPay?.amolument?.ssbAllowance +
            // employee?.currentPay?.amolument?.uniTeachingAllowance +
            // employee?.currentPay?.amolument?.adhocReliefAllowance +
            // employee?.currentPay?.amolument?.houseRent +
            // employee?.currentPay?.amolument?.medicalAllowance +
            // employee?.currentPay?.amolument?.nonPracticingAllowance +
            // employee?.currentPay?.amolument?.personalAllowance +
            // employee?.currentPay?.amolument?.qualificationAllowance +
            // employee?.currentPay?.amolument?.rTWardenAllowance +
            // employee?.currentPay?.amolument?.seniorPostAllowance +
            // employee?.currentPay?.amolument?.socialSecuirtyBenefit +
            // employee?.currentPay?.amolument?.specialHealthCareAllowance +
            // employee?.currentPay?.amolument?.specialReliefAllowance +
            // employee?.currentPay?.amolument?.entertainment +
            // employee?.currentPay?.amolument?.tTAllowance,

            // employee?.currentPay?.deductions?.incomeTax +
            // employee?.currentPay?.deductions?.gPFSubscription +
            // employee?.currentPay?.deductions?.recGPF +
            // employee?.currentPay?.deductions?.houseRent +
            // employee?.currentPay?.deductions?.waterCharges +
            // employee?.currentPay?.deductions?.shortDays +
            // employee?.currentPay?.deductions?.convRecovery +
            // employee?.currentPay?.deductions?.houseBuildingAdvance +
            // employee?.currentPay?.deductions?.tSAFund +
            // employee?.currentPay?.deductions?.benevolentFund +
            // employee?.currentPay?.deductions?.groupInsurance +
            // employee?.currentPay?.deductions?.eidAdvance +
            // employee?.currentPay?.deductions?.busCharges +
            // employee?.currentPay?.deductions?.extraCausalLeaves +
            // employee?.currentPay?.deductions?.tradeTax +
            // employee?.currentPay?.deductions?.electricityCharges +
            // employee?.currentPay?.deductions?.otherCharges +
            // employee?.currentPay?.deductions?.gIP +
            // employee?.currentPay?.deductions?.carScooterAdvance +
            // employee?.currentPay?.deductions?.accomadationCharges,

            employee?.currentPay?.deductions?.totalDeductions,
            employee?.currentPay?.netPayable,
            totalPayable = totalPayable + employee?.currentPay?.netPayable,
        ],
        );
    }


    const ComitSalarRecord = async () => {
        setOpenComit(false)
        let arrayOfObjects = new Array();
        // console.log("employee", employeeData)

        employeeData.map((e, index) => {
            let obj = {};
            obj.Emoulments = e.currentPay.amolument;
            obj.deductions = e.currentPay.deductions;
            obj.totalPaid = e.currentPay.netPayable;
            obj.basicInfo = e.basicInfo,
                obj.year = moment().format('YYYY');
            obj.date = moment().format('DD-MM-YYYY');
            arrayOfObjects[index] = {
                id: e.id,
                // Salary: e?.salaries[e?.salaries.length - 1] ?? null,
                Salary: obj
            };
        })
        setLoading(true)
        let PaySlip = {};
        pdfGenerator()
        PaySlip.Date = moment().format('DD-MM-YYYY');
        PaySlip.Data = arrayOfObjects;
        PaySlip.TotalIncome = totalPayable;
        console.log("payslip", PaySlip)
        try {
            let a = await API.post('/employee/comit', PaySlip, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                }
            });

            alert("Successfully Committed")
            setTimeout(() => {
                setLoading(false)
                totalPayable = 0
            }, 2000);

        } catch (error) {
            alert("Connection Error")
        }
    }



    const handleClickOpenCommitDial = () => {
        setOpenComit(true);

    };

    const handleCloseComit = () => {
        setOpenComit(false);
    };



    return (
        <>



            {(

                <Dialog
                    open={openComit}
                    onClose={handleCloseComit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="fs-6">
                            Are you sure you want to Commit the record?.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseComit}>Disagree</Button>
                        <Button onClick={ComitSalarRecord} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            )}





            <div className="h-full w-full">
                <AppBar className="mt-4" position="static">
                    <Toolbar className="h-32 d-flex justify-between">
                        <Typography variant="h2">
                            <div className="text-white">Employees</div>
                        </Typography>
                        <Tooltip title="Search by CNIC" >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <TextField
                                    label="Search by CNIC"
                                    onChange={(event) => {
                                        setSearchText(event.target.value);
                                    }}
                                    // style={{ color: 'white' }}
                                    InputLabelProps={{

                                        style: {
                                            color: 'grey'
                                        }
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Tooltip>
                        {/* <Button variant="contained" className="float-right">
                        <CsvDownload data={employeeData} />
                    </ Button> */}
                    </Toolbar>
                </AppBar>

                {/* <TabList onChange={handleChange}>
                <Tab label="Working" value={0} />
                <Tab label="Pansioner" value={1} />
            </TabList> */}
                <div className="d-flex justify-content-between mt-2 ">
                    <Tabs value={tabValue} onChange={(e, newVal) => handleChange(newVal)}>
                        <Tab label="Working" />
                        <Tab label="Pensioner" />
                    </Tabs>
                    <ButtonGroup variant="text">
                        <Button onClick={handleClickOpenCommitDial} variant="outlined"
                            color="success">
                            Save&Commit
                        </Button>
                        <Button variant="outlined" color="primary"
                            onClick={handleDownload}
                        >
                            Download Excel

                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                const unit = 'pt';
                                const size = 'A4'; // Use A1, A2, A3 or A4
                                const orientation = 'landscape'; // portrait or landscape

                                // const marginLeft = 40;
                                const doc = new jsPDF();

                                doc.setFontSize(20);

                                const title = 'RACHNA COLLEGE OF ENGINEERING & TECHNOLOGY, GUJRANWALA';
                                const headers = [
                                    [
                                        'Name',
                                        // 'Email',
                                        'CNIC',
                                        'Account No',
                                        'Category',
                                        // 'Status',
                                        'Total Amolument',
                                        'Total Deduction',
                                        'NetPayable'
                                    ]
                                ];

                                const data = pdfGenerator()
                                // const headers = [
                                //     ['Name', totalPayable],
                                //     ['Email', totalPayable]
                                // ]

                                let content = {
                                    startY: 40,
                                    head: headers,
                                    columnStyles: { theme: 'plain' },
                                    body: data,

                                };


                                doc.setFontSize(16);
                                doc.text(10, 18, 'RACHNA COLLEGE OF ENGINEERING & TECHNOLOGY, GUJRANWALA')
                                doc.setFontSize(12);
                                doc.text(30, 25, '(A Constituent College of University of Engineering & Technology, Lahore.)')
                                // doc.text(title, 10, 25);
                                doc.setFontSize(12);
                                doc.text(14, 38, `Date : ${moment().format('DD-MM-YYYY')}`)

                                doc.setFontSize(12);
                                doc.text(14, 200, `NET Payable AMOUNT  : ${totalPayable}`)

                                doc.setFontSize(12);
                                doc.text(130, 200, "Signature  : _________________")




                                doc.autoTable(content);
                                doc.save('employees.pdf');

                            }}
                        >
                            Download PDF
                        </Button>
                    </ButtonGroup>
                </div>

                {/* <Paper> */}


                {loading ?
                    <MoonLoader
                        color={color}
                        loading={loading}
                        size={60}
                        cssOverride={
                            {
                                margin: "3rem auto",
                                borderColor: "red",
                            }
                        }

                    />

                    :

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} className="mt-2" id="emp-table">
                            <TableHead className="bg-gray-900">
                                <TableRow>
                                    <TableCell className="text-gray-200">Open</TableCell>
                                    <TableCell className="text-gray-200">Name</TableCell>
                                    <TableCell className="text-gray-200">Email</TableCell>
                                    <TableCell className="text-gray-200">CNIC</TableCell>
                                    <TableCell className="text-gray-200">Account No</TableCell>
                                    <TableCell className="text-gray-200">Employee Category</TableCell>
                                    <TableCell className="text-gray-200">Status</TableCell>
                                    <TableCell className="text-gray-200">Previous Salaries</TableCell>
                                    {tabValue === 1 && <TableCell className="text-gray-200">Meeting Invite</TableCell>}
                                    {tabValue === 1 && <TableCell className="text-gray-200">Verified</TableCell>}

                                    <TableCell className="text-gray-200">Edit</TableCell>
                                    <TableCell className="text-gray-200">Monthly Report</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {/* <TabPanel value={tabValue} index={0}> */}
                                {
                                    employeeData &&
                                    <EmployeeTable
                                        employees={employeeData.filter((em) => {
                                            if (tabValue === 0 && em.basicInfo.category === 'Current Employee') {
                                                return em;
                                            } else if (tabValue === 1 && em.basicInfo.category === 'Pensioner') {
                                                return em;
                                            }
                                        })
                                            .filter((employee) => {
                                                if (searchText === '') {
                                                    return employee;
                                                }
                                                else if (employee.basicInfo.cnic.toLowerCase().includes(searchText.toLowerCase())) {
                                                    return employee;
                                                }
                                                else if (employee.basicInfo.department.toLowerCase().includes(searchText.toLowerCase())) {
                                                    return employee;
                                                }
                                                // searchText === '' ? employee : employee.basicInfo.cnic.toLowerCase().includes(searchText.toLowerCase())
                                            }
                                            )
                                        }
                                        handleClickOpen={handleClickOpen}
                                        setEmployees={setemployeeData}
                                        tabValue={tabValue}
                                    />
                                }


                                {/* </TabPanel> */}
                                {/* {employeeData
                            .filter((employee) =>
                                searchText === '' ? employee.name : employee.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>
                                        <LaunchIcon className="cursor-pointer" onClick={() => handleClickOpen(employee.id)} />
                                    </TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.cnic}</TableCell>
                                    <TableCell>{employee.accountNo}</TableCell>
                                    <TableCell>{employee.category}</TableCell>
                                </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>

                        {/* <ReactHTMLTableToExcel
                className="btn btn-info"
                table="emp-table"
                filename="Emp Excel File"
                sheet="Sheet"
                buttonText="Export of Excel"

                /> */}
                        {/* </Paper> */}
                    </TableContainer>
                }

                <div>
                    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" maxWidth="sm" fullWidth open={open}>
                        <BootstrapDialogTitle className="font-bold text-2xl" onClose={handleClose}>
                            {data?.basicInfo?.name}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>Name: {data?.basicInfo?.name}</Typography>
                            <Typography gutterBottom>Email: {data?.basicInfo?.email}</Typography>
                            <Typography gutterBottom>Scale: {data?.basicInfo?.scale}</Typography>
                            <Typography gutterBottom>Experience: {data?.basicInfo?.experience}</Typography>
                            <Typography gutterBottom>Designation: {data?.basicInfo?.designation}</Typography>
                            <Typography gutterBottom>Department: {data?.basicInfo?.department}</Typography>
                            <Typography gutterBottom>Type: {data?.basicInfo?.type}</Typography>
                            <Typography gutterBottom>Category: {data?.basicInfo?.category}</Typography>
                            {/* <Typography gutterBottom>
                            EMAIL: {data.email}
                        </Typography>
                        <Typography gutterBottom>
                            EMAIL: {data.email}
                        </Typography>
                        <Typography gutterBottom>
                            EMAIL: {data.email}
                        </Typography> */}
                            <Typography gutterBottom>
                                CNIC: {data?.basicInfo?.cnic}
                            </Typography>
                            <Typography gutterBottom>
                                Account No: {data?.basicInfo?.accountNo}
                            </Typography>
                            <Typography gutterBottom>
                                Employee Category: {data?.basicInfo?.category}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            </div>
        </>


    );
}
export default ViewEmployees;
