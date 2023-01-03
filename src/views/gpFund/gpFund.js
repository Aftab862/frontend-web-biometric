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
import CsvDownload from 'react-json-to-csv';
// import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import data from './data';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const gpFund = () => {
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (newValue) => {
        console.log('newVal', newValue);
        setTabValue(newValue);
    };
    
    return (
        <>
            <AppBar className="mt-4" position="static">
                <Toolbar className="h-32">
                    <Typography variant="h2">
                        <div className="text-white">GP Fund</div>
                    </Typography>
                </Toolbar>
            </AppBar> 
            <div className="d-flex justify-content-between mt-2 ">            
            <Tabs value={tabValue} onChange={(e, newVal) => handleChange(newVal)}>
                    <Tab label="Advance" />
                    <Tab label="Recovery" />
                </Tabs>
                </div>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} className="mt-2" id="gpf-table">
                    <TableHead className="bg-gray-900">
                        <TableRow>
                            <TableCell className="text-gray-200">Name</TableCell>
                            <TableCell className="text-gray-200">Employee Category</TableCell>
                            <TableCell className="text-gray-200">Department</TableCell>
                            <TableCell className="text-gray-200">{tabValue===0? "Advanced GPF": "Recovery GPF"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((employee)=>(
                        <TableRow>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.Category}</TableCell>
                            <TableCell>{employee.Department}</TableCell>
                            <TableCell>{tabValue===0 ?employee.Advanced_GPF: employee.Recovery_GPF}</TableCell>
                        </TableRow>
                    ))

                    }
                    </TableBody>
                    </Table>
                    </TableContainer>

            
        </>
    );
};

export default gpFund;
