/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import jsPDF from 'jspdf';
import { Tooltip } from '@mui/material';
// import PDF, { Text, AddPage, Line, Image, Html } from 'jspdf-react';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '&::placeholder': {
        color: 'black'
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

const downloadCsvHeandler = (employee) => {};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function ViewEmployees() {
    // const head = [['Name', 'Email', 'CNIC', 'Account No', 'Employee Catagory']];
    // const body = [(data = [employees.filter((emp) => emp.id === employee.id)])];

    const [data, showData] = useState({});
    const [employeeData, setemployeeData] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (newValue) => {
        console.log('newVal', newValue);
        setTabValue(newValue);
    };
    console.log('employeeData', employeeData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    }
                });
                console.log('response', res.data);
                setemployeeData(res.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        // setemployeeData(data);
    }, []);

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
    console.log(
        'dummy test->',
        employeeData
            .map((ed) => {
                if (tabValue === 0 && ed?.basicInfo?.category === 'Current Employee') {
                    return {
                        ...ed.basicInfo,
                        ...{ ...ed.currentPay.amolument, ...ed.deductions, netPayable: ed.currentPay.netPayable }
                    };
                } else if (tabValue === 1 && ed?.basicInfo?.category === 'Pensioner') {
                    return {
                        ...ed.basicInfo,
                        ...{ ...ed.currentPay.amolument, ...ed.deductions, netPayable: ed.currentPay.netPayable }
                    };
                }
            })
            .filter((em) => em !== undefined)
    );

    return (
        <div className="h-full w-full">
            <AppBar className="mt-4" position="static">
                <Toolbar className="h-32 d-flex justify-between">
                    <Typography variant="h2">
                        <div className="text-white">Employees</div>
                    </Typography>
                    {/* <Tooltip title="Search by CNIC" placement="bottom"> */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(event) => {
                                setSearchText(event.target.value);
                            }}
                            style={{ color: 'black' }}
                            placeholder="Search by CNIC or department"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {/* </Tooltip> */}
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
                    <Button variant="outlined" color="primary">
                        <CsvDownload
                            title="Download CSV"
                            filename="employees.csv"
                            // [{name:"ali",rollNo:"401"}]
                            data={employeeData
                                .map((ed) => {
                                    if (tabValue === 0 && ed?.basicInfo?.category === 'Current Employee') {
                                        return {
                                            ...ed.basicInfo,
                                            ...{ ...ed.currentPay.amolument, ...ed.currentPay.deductions, netPayable: ed.currentPay.netPayable }
                                        };
                                    } else if (tabValue === 1 && ed?.basicInfo?.category === 'Pensioner') {
                                        return {
                                            ...ed.basicInfo,
                                            ...{ ...ed.currentPay.amolument, ...ed.currentPay.deductions, netPayable: ed.currentPay.netPayable }
                                        };
                                    }
                                })
                                .filter((em) => em !== undefined)}
                        >
                            Download CSV
                        </CsvDownload>
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            const unit = 'pt';
                            const size = 'A4'; // Use A1, A2, A3 or A4
                            const orientation = 'landscape'; // portrait or landscape

                            const marginLeft = 40;
                            const doc = new jsPDF(orientation, unit, size);

                            doc.setFontSize(20);

                            const title = 'Current Month Data';
                            const headers = [
                                [
                                    'Name',
                                    'Email',
                                    'CNIC',
                                    'Account No',
                                    'Category',
                                    'Status',
                                    'Total Amolument',
                                    'Total Deduction',
                                    'NetPayable'
                                ]
                            ];
                            const data = employeeData
                                .filter((em) => {
                                    if (tabValue === 0 && em.basicInfo.category === 'Current Employee') {
                                        return em;
                                    } else if (tabValue === 1 && em.basicInfo.category === 'Pensioner') {
                                        return em;
                                    }
                                })
                                .map((employee) => [
                                    employee?.basicInfo?.name,
                                    employee?.basicInfo?.email,
                                    employee?.basicInfo?.cnic,
                                    employee?.basicInfo?.accountNo,
                                    employee?.basicInfo?.category,
                                    employee?.basicInfo?.status,
                                    employee.currentPay?.amolument?.basicPay +
                                        employee?.currentPay?.amolument?.chairmanAllowance +
                                        employee?.currentPay?.amolument?.conPetAllowance +
                                        employee?.currentPay?.amolument?.entertainment +
                                        employee?.currentPay?.amolument?.healthProfnlAllowance +
                                        employee?.currentPay?.amolument?.houseRent +
                                        employee?.currentPay?.amolument?.medicalAllowance +
                                        employee?.currentPay?.amolument?.nonPracticingAllowance +
                                        employee?.currentPay?.amolument?.personalAllowance +
                                        employee?.currentPay?.amolument?.qualificationAllowance +
                                        employee?.currentPay?.amolument?.rTWardenAllowance +
                                        employee?.currentPay?.amolument?.seniorPostAllowance +
                                        employee?.currentPay?.amolument?.socialSecuirtyBenefit +
                                        employee?.currentPay?.amolument?.specialHealthCareAllowance +
                                        employee?.currentPay?.amolument?.specialReliefAllowance +
                                        employee?.currentPay?.amolument?.tTAllowance,
                                    employee?.currentPay?.deductions?.accomadationCharges +
                                        employee?.currentPay?.deductions?.benevolentFund +
                                        employee?.currentPay?.deductions?.busCharges +
                                        employee?.currentPay?.deductions?.convRecovery +
                                        employee?.currentPay?.deductions?.conveyanceAllowance +
                                        employee?.currentPay?.deductions?.disableAllowance +
                                        employee?.currentPay?.deductions?.eidAdvance +
                                        employee?.currentPay?.deductions?.gIP +
                                        employee?.currentPay?.deductions?.gPFSubscription +
                                        employee?.currentPay?.deductions?.groupInsurance +
                                        employee?.currentPay?.deductions?.houseRentR +
                                        employee?.currentPay?.deductions?.incomeTax +
                                        employee?.currentPay?.deductions?.integratedAllowance +
                                        employee?.currentPay?.deductions?.recEidAdvance +
                                        employee?.currentPay?.deductions?.recGPF +
                                        employee?.currentPay?.deductions?.sSB +
                                        employee?.currentPay?.deductions?.shortDays +
                                        employee?.currentPay?.deductions?.speciialIncentive +
                                        employee?.currentPay?.deductions?.tSAFund +
                                        employee?.currentPay?.deductions?.uniTTAllowance +
                                        employee?.currentPay?.deductions?.waterCharges,
                                    employee?.currentPay?.netPayable
                                ]);

                            let content = {
                                startY: 50,
                                head: headers,
                                body: data
                            };

                            doc.text(title, marginLeft, 40);
                            doc.autoTable(content);
                            doc.save('employees.pdf');
                        }}
                    >
                        Download PDF
                    </Button>
                </ButtonGroup>
            </div>

            {/* <Paper> */}
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
                            {tabValue === 1 && <TableCell className="text-gray-200">Verified</TableCell>}
                            <TableCell className="text-gray-200">Edit</TableCell>
                            <TableCell className="text-gray-200">Monthly Report</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* <TabPanel value={tabValue} index={0}> */}
                        <EmployeeTable
                            employees={employeeData
                                .filter((em) => {
                                    if (tabValue === 0 && em.basicInfo.category === 'Current Employee') {
                                        return em;
                                    } else if (tabValue === 1 && em.basicInfo.category === 'Pensioner') {
                                        return em;
                                    }
                                })
                                .filter((employee) =>{
                                    if (searchText === ''){
                                         return employee;
                                    }
                                    else if( employee.basicInfo.cnic.toLowerCase().includes(searchText.toLowerCase())){
                                        return employee;
                                   }
                                   else if( employee.basicInfo.department.toLowerCase().includes(searchText.toLowerCase())){
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
            <div>
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" maxWidth="sm" fullWidth open={open}>
                    {console.log(data)}
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
    );
}
export default ViewEmployees;
