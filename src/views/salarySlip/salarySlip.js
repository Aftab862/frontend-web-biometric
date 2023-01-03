/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import ViewEmployees from '../ViewEmployees/ViewEmployees';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EmployeeTableData from 'views/ViewEmployees/EmployeeTableData';
import API from 'API/api';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    btn: {
        marginRight: theme.spacing(4)
    },
    title: {
        flexGrow: 1
    }
}));
const AddNewEmployee = () => {
    const classes = useStyles();
    const params = useParams();
    const { employeeId } = useSelector((state) => state.user);
    const [employee, setEmployee] = useState({
        basicInfo: {
            name: '',
            email: '',
            password: '',
            cnic: 0,
            pageNo: 0,
            accountNo: '',
            department: '',
            scale: 0,
            experience: 0,
            type: '',
            designation: '',
            category: '',
            status: ''
        },
        salaries: [],
        currentPay: {
            date: moment().format('DD-MM-YYYY'),
            verified: false,
            amolument: {
                basicPay: 0,
                nonPracticingAllowance: 0,
                specialHealthCareAllowance: 0,
                healthProfnlAllowance: 0,
                houseRent: 0,
                conPetAllowance: 0,
                qualificationAllowance: 0,
                entertainment: 0,
                personalAllowance: 0,
                tTAllowance: 0,
                medicalAllowance: 0,
                socialSecuirtyBenefit: 0,
                seniorPostAllowance: 0,
                chairmanAllowance: 0,
                rTWardenAllowance: 0,
                specialReliefAllowance: 0
            },
            deductions: {
                incomeTax: 0,
                gPFSubscription: 0,
                recGPF: 0,
                houseRentR: 0,
                waterCharges: 0,
                shortDays: 0,
                convRecovery: 0,
                uniTTAllowance: 0,
                tSAFund: 0,
                benevolentFund: 0,
                groupInsurance: 0,
                eidAdvance: 0,
                busCharges: 0,
                speciialIncentive: 0,

                conveyanceAllowance: 0,
                integratedAllowance: 0,
                disableAllowance: 0,
                sSB: 0,
                gIP: 0,
                recEidAdvance: 0,
                accomadationCharges: 0,
                verified: 'true'
            },
            netPayable: 0
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`/employee/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    }
                });
                setEmployee({ ...res.data });
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, []);

    console.log('employee Data->', employee);

    const [flag, setFlag] = useState(false);

    console.log('employee data->', employee);

    const employeeHandler = (e, type) => {
        console.log('e', parseInt(e.target.value));
        console.log('r', e.target.value);
        if (type === 'name') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, name: e.target.value } });
        } else if (type === 'email') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, email: e.target.value } });
        } else if (type === 'password') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, password: e.target.value } });
        } else if (type === 'cnic') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, cnic: e.target.value.substring(0, 13) } });
        } else if (type === 'pageNo') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, pageNo: parseInt(e.target.value) } });
        } else if (type === 'accountNo') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, accountNo: e.target.value } });
        } else if (type === 'department') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, department: e.target.value } });
        } else if (type === 'scale') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, scale: e.target.value } });
        } else if (type === 'experience') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, experience: e.target.value } });
        } else if (type === 'type') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, type: e.target.value } });
        } else if (type === 'designation') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, designation: e.target.value } });
        } else if (type === 'category') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, category: e.target.value } });
        } else if (type === 'status') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, status: e.target.value } });
        } else if (type === 'basicPay') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, basicPay: e.target.value !== NaN ? parseInt(e.target.value) : 0 }
                }
            });
        } else if (type === 'nonPracticingAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, nonPracticingAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'specialHealthCareAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, specialHealthCareAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'healthProfnlAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, healthProfnlAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'houseRent') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, amolument: { ...employee.currentPay.amolument, houseRent: parseInt(e.target.value) } }
            });
        } else if (type === 'conPetAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, conPetAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'qualificationAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, qualificationAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'entertainment') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, entertainment: parseInt(e.target.value) }
                }
            });
        } else if (type === 'personalAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, personalAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'tTAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, tTAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'medicalAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, medicalAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'socialSecuirtyBenefit') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, socialSecuirtyBenefit: parseInt(e.target.value) }
                }
            });
        } else if (type === 'seniorPostAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, seniorPostAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'chairmanAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, chairmanAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'rTWardenAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, rTWardenAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'specialReliefAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, specialReliefAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'incomeTax') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, incomeTax: parseInt(e.target.value) }
                }
            });
        } else if (type === 'gPFSubscription') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, gPFSubscription: parseInt(e.target.value) }
                }
            });
        } else if (type === 'recGPF') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, recGPF: parseInt(e.target.value) } }
            });
        } else if (type === 'houseRentR') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, houseRentR: parseInt(e.target.value) }
                }
            });
        } else if (type === 'waterCharges') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, waterCharges: parseInt(e.target.value) }
                }
            });
        } else if (type === 'shortDays') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, shortDays: parseInt(e.target.value) }
                }
            });
        } else if (type === 'convRecovery') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, convRecovery: parseInt(e.target.value) }
                }
            });
        } else if (type === 'uniTTAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, uniTTAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'tSAFund') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, tSAFund: parseInt(e.target.value) } }
            });
        } else if (type === 'benevolentFund') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, benevolentFund: parseInt(e.target.value) }
                }
            });
        } else if (type === 'groupInsurance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, groupInsurance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'eidAdvance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, eidAdvance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'busCharges') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, busCharges: parseInt(e.target.value) }
                }
            });
        } else if (type === 'speciialIncentive') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, speciialIncentive: parseInt(e.target.value) }
                }
            });
        } else if (type === 'conveyanceAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, conveyanceAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'integratedAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, integratedAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'disableAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, disableAllowance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'sSB') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, sSB: parseInt(e.target.value) } }
            });
        } else if (type === 'gIP') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, gIP: parseInt(e.target.value) } }
            });
        } else if (type === 'recEidAdvance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, recEidAdvance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'accomadationChgarges') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, accomadationCharges: parseInt(e.target.value) }
                }
            });
        }
    };

    let totalAmolumentValue =
        employee.currentPay.amolument.basicPay +
        employee.currentPay.amolument.chairmanAllowance +
        employee.currentPay.amolument.conPetAllowance +
        employee.currentPay.amolument.healthProfnlAllowance +
        employee.currentPay.amolument.houseRent +
        employee.currentPay.amolument.medicalAllowance +
        employee.currentPay.amolument.nonPracticingAllowance +
        employee.currentPay.amolument.personalAllowance +
        employee.currentPay.amolument.qualificationAllowance +
        employee.currentPay.amolument.rTWardenAllowance +
        employee.currentPay.amolument.seniorPostAllowance +
        employee.currentPay.amolument.socialSecuirtyBenefit +
        employee.currentPay.amolument.specialHealthCareAllowance +
        employee.currentPay.amolument.specialReliefAllowance +
        employee.currentPay.amolument.entertainment +
        employee.currentPay.amolument.tTAllowance;
    console.log('totalAmolmentValue', totalAmolumentValue);
    // same for total deduction
    let totalDeductionValue =
        employee.currentPay.deductions.gPFSubscription +
        employee.currentPay.deductions.recGPF +
        employee.currentPay.deductions.houseRentR +
        employee.currentPay.deductions.waterCharges +
        employee.currentPay.deductions.shortDays +
        employee.currentPay.deductions.convRecovery +
        employee.currentPay.deductions.uniTTAllowance +
        employee.currentPay.deductions.tSAFund +
        employee.currentPay.deductions.benevolentFund +
        employee.currentPay.deductions.groupInsurance +
        employee.currentPay.deductions.eidAdvance +
        employee.currentPay.deductions.busCharges +
        employee.currentPay.deductions.speciialIncentive +
        employee.currentPay.deductions.conveyanceAllowance +
        employee.currentPay.deductions.integratedAllowance +
        employee.currentPay.deductions.disableAllowance +
        employee.currentPay.deductions.sSB +
        employee.currentPay.deductions.gIP +
        employee.currentPay.deductions.recEidAdvance +
        employee.currentPay.deductions.accomadationCharges;

    let netPayableValue = parseInt(totalAmolumentValue) - parseInt(totalDeductionValue);

    return (
        <div
        // style={{
        //     marginTop: '2%',
        //     marginLeft: '2%',
        //     marginRight: '2%',
        //     marginBottom: '2%'
        // }}
        >
            <AppBar className="mt-4" position="static">
                <Toolbar className="h-32">
                    <Typography variant="h2" className={classes.title}>
                        <div className="text-white">Salary Slip</div>
                    </Typography>
                    <Tooltip title="Download PDF">
                        <Button
                            onClick={() => {
                                console.log('employee => ', employee);

                                const unit = 'pt';
                                const size = 'A4'; // Use A1, A2, A3 or A4
                                const orientation = 'landscape'; // portrait or landscape

                                const marginLeft = 40;
                                const doc = new jsPDF(orientation, unit, size);

                                doc.setFontSize(20);

                                const title = 'Salary Slip';
                                // const headers = [['Name','Email','Account No','Amoluments', 'Deductions', 'NetPayable']];
                                // const data = [
                                //     [   employee.basicInfo?.name,
                                //         employee.basicInfo?.email,
                                //         employee.basicInfo?.accountNo,
                                //         employee.currentPay?.amolument?.basicPay +
                                //             employee?.currentPay?.amolument?.chairmanAllowance +
                                //             employee?.currentPay?.amolument?.conPetAllowance +
                                //             employee?.currentPay?.amolument?.entertainment +
                                //             employee?.currentPay?.amolument?.healthProfnlAllowance +
                                //             employee?.currentPay?.amolument?.houseRent +
                                //             employee?.currentPay?.amolument?.medicalAllowance +
                                //             employee?.currentPay?.amolument?.nonPracticingAllowance +
                                //             employee?.currentPay?.amolument?.personalAllowance +
                                //             employee?.currentPay?.amolument?.qualificationAllowance +
                                //             employee?.currentPay?.amolument?.rTWardenAllowance +
                                //             employee?.currentPay?.amolument?.seniorPostAllowance +
                                //             employee?.currentPay?.amolument?.socialSecuirtyBenefit +
                                //             employee?.currentPay?.amolument?.specialHealthCareAllowance +
                                //             employee?.currentPay?.amolument?.specialReliefAllowance +
                                //             employee?.currentPay?.amolument?.tTAllowance,
                                //         employee?.currentPay?.deductions?.accomadationCharges +
                                //             employee?.currentPay?.deductions?.benevolentFund +
                                //             employee?.currentPay?.deductions?.busCharges +
                                //             employee?.currentPay?.deductions?.convRecovery +
                                //             employee?.currentPay?.deductions?.conveyanceAllowance +
                                //             employee?.currentPay?.deductions?.disableAllowance +
                                //             employee?.currentPay?.deductions?.eidAdvance +
                                //             employee?.currentPay?.deductions?.gIP +
                                //             employee?.currentPay?.deductions?.gPFSubscription +
                                //             employee?.currentPay?.deductions?.groupInsurance +
                                //             employee?.currentPay?.deductions?.houseRentR +
                                //             employee?.currentPay?.deductions?.incomeTax +
                                //             employee?.currentPay?.deductions?.integratedAllowance +
                                //             employee?.currentPay?.deductions?.recEidAdvance +
                                //             employee?.currentPay?.deductions?.recGPF +
                                //             employee?.currentPay?.deductions?.sSB +
                                //             employee?.currentPay?.deductions?.shortDays +
                                //             employee?.currentPay?.deductions?.speciialIncentive +
                                //             employee?.currentPay?.deductions?.tSAFund +
                                //             employee?.currentPay?.deductions?.uniTTAllowance +
                                //             employee?.currentPay?.deductions?.waterCharges,
                                //         employee?.currentPay?.netPayable
                                //     ]
                                // ];

                                const headers = [['Fields', 'Values']];
                                const data = [
                                    ["Name", employee.basicInfo?.name],
                                    ["Email", employee.basicInfo?.email],
                                    ["Account No", employee.basicInfo?.accountNo],
                                    ["Basic Pay", employee.currentPay?.amolument?.basicPay],
                                    ["Chairman Allowance", employee.currentPay?.amolument?.chairmanAllowance],
                                    ["ConPet Allowance", employee.currentPay?.amolument?.conPetAllowance],
                                    ["Entertainment", employee.currentPay?.amolument?.entertainment],
                                    ["Health Prof Allowance", employee?.currentPay?.amolument?.healthProfnlAllowance],
                                    ["House Rent", employee?.currentPay?.amolument?.houseRent],
                                    ["Medical Allowance", employee?.currentPay?.amolument?.medicalAllowance],
                                    ["Non Practicing Allowance", employee?.currentPay?.amolument?.nonPracticingAllowance],
                                    ["Personal Allowance", employee?.currentPay?.amolument?.personalAllowance],
                                    ["Qualification Allowance", employee?.currentPay?.amolument?.qualificationAllowance],
                                    ["RT Warden Allowance", employee?.currentPay?.amolument?.rTWardenAllowance],
                                    ["Senior Post Allowance", employee?.currentPay?.amolument?.seniorPostAllowance],
                                    ["Social Security Benefit", employee?.currentPay?.amolument?.socialSecuirtyBenefit],
                                    ["Special Health Allowance", employee?.currentPay?.amolument?.specialHealthCareAllowance],
                                    ["Special Relief Allowance", employee?.currentPay?.amolument?.specialReliefAllowance],
                                    ["TT Allowance", employee?.currentPay?.amolument?.tTAllowance],
                                    ["Total Emolments",
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
                                        employee?.currentPay?.amolument?.tTAllowance],
                                    ["Accomadation Charges", employee?.currentPay?.deductions?.accomadationCharges],
                                    ["Benevolent Fund", employee?.currentPay?.deductions?.benevolentFund],
                                    ["Bus Charges", employee?.currentPay?.deductions?.busCharges],
                                    ["Conv Recovery", employee?.currentPay?.deductions?.convRecovery],
                                    ["Conveyance Allowance", employee?.currentPay?.deductions?.conveyanceAllowance],
                                    ["Disable Allowance", employee?.currentPay?.deductions?.disableAllowance],
                                    ["Eid Advance", employee?.currentPay?.deductions?.eidAdvance],
                                    ["GIP", employee?.currentPay?.deductions?.gIP],
                                    ["GPF Subscription", employee?.currentPay?.deductions?.gPFSubscription],
                                    ["Group Insurance", employee?.currentPay?.deductions?.groupInsurance],
                                    ["House Rent Deducted", employee?.currentPay?.deductions?.houseRentR],
                                    ["Income Tax", employee?.currentPay?.deductions?.incomeTax],
                                    ["Integrated Allowance", employee?.currentPay?.deductions?.integratedAllowance],
                                    ["Rec Eid Advance", employee?.currentPay?.deductions?.recEidAdvance],
                                    ["Rec GPF", employee?.currentPay?.deductions?.recGPF],
                                    ["SSB", employee?.currentPay?.deductions?.sSB],
                                    ["Short Days", employee?.currentPay?.deductions?.shortDays],
                                    ["Special Incentive", employee?.currentPay?.deductions?.speciialIncentive],
                                    ["TSA Fund", employee?.currentPay?.deductions?.tSAFund],
                                    ["Uni TT Allowance", employee?.currentPay?.deductions?.uniTTAllowance],
                                    ["Water Charges", employee?.currentPay?.deductions?.waterCharges],
                                    ["Total Deductions",
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
                                        employee?.currentPay?.deductions?.waterCharges],

                                    ["Net Payable", employee?.currentPay?.netPayable]
                                ];

                                //     employee.map(                                //         (emp) => (
                                //             emp.currentPay.amolument.chairmanAllowance,
                                //             emp.currentPay.amolument.conPetAllowance,
                                //             emp.currentPay.amolument.entertainment
                                //         )
                                //     )
                                // ];

                                //const data = [12, 33, 56];

                                //const data = employee.map((emp) => [emp.totalAmolumentValue, emp.totalDeductionValue, emp.netPayableValue]);
                                let content = {
                                    startY: 50,
                                    head: headers,
                                    body: data
                                };

                                doc.text(title, marginLeft, 40);
                                doc.autoTable(content);
                                doc.save('Salary-Slip.pdf');
                            }}
                            size="large"
                            className="bg-blue-800 text-white hover:bg-blue-800 hover:text-white"
                        >
                            Download PDF
                        </Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Card>
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Basic Information
                    </Typography>
                    {/* <h1 style={{textAlign: "center", fontWeight:"bold", fontSize: "20px"}} >Basic Information</h1> */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.name}
                                onChange={(e) => employeeHandler(e, 'name')}
                                id="name"
                                type="text"
                                required
                                label="Name"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.email}
                                onChange={(e) => employeeHandler(e, 'email')}
                                id="email"
                                type="email"
                                required
                                label="Email"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.password}
                                onChange={(e) => employeeHandler(e, 'password')}
                                id="password"
                                type="text"
                                required
                                label="Password"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                inputProps={{
                                    maxLength: 13
                                }}
                                InputProps={{}}
                                fullWidth
                                value={employee.basicInfo.cnic}
                                onChange={(e) => employeeHandler(e, 'cnic')}
                                id="cnic"
                                type="number"
                                required
                                label="CNIC"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.pageNo}
                                onChange={(e) => employeeHandler(e, 'pageNo')}
                                id="PageNo"
                                required
                                type="number"
                                label="PageNo"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.accountNo}
                                onChange={(e) => employeeHandler(e, 'accountNo')}
                                id="account"
                                required
                                type="text"
                                label="Account Number"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.scale}
                                onChange={(e) => employeeHandler(e, 'scale')}
                                id="scale"
                                required
                                type="number"
                                label="Scale"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.experience}
                                onChange={(e) => employeeHandler(e, 'experience')}
                                id="experience"
                                required
                                type="number"
                                label="Experience(in years)"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.basicInfo.designation}
                                required
                                onChange={(e) => employeeHandler(e, 'designation')}
                                id="Designation"
                                type="text"
                                label="Designation"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="department-id">Department</InputLabel>
                                <Select
                                    labelId="department-id-label"
                                    id="department"
                                    required
                                    value={employee.basicInfo.department}
                                    onChange={(e) => employeeHandler(e, 'department')}
                                    label="Department"
                                    disabled
                                >
                                    <MenuItem value="Electrical Engineering">(EE)Electrical Engineering</MenuItem>
                                    <MenuItem value="Computer Science">(CS)Computer Science</MenuItem>
                                    <MenuItem value="Machenical Engineering">(ME)Machenical Engineering</MenuItem>
                                    <MenuItem value="Industrial and Manufacturing Enginnering">
                                        (IME)Industrial & Manufacturing Enginnering
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="type-id">Type</InputLabel>
                                <Select
                                    labelId="type-id-label"
                                    value={employee.basicInfo.type}
                                    required
                                    onChange={(e) => employeeHandler(e, 'type')}
                                    id="type"
                                    label="Type"
                                    disabled
                                >
                                    <MenuItem value="Class A">Class A</MenuItem>
                                    <MenuItem value="Class B or C">Class B or C</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="category-id">Employee-Category</InputLabel>
                                <Select
                                    labelId="category-id-label"
                                    id="employeeCategory"
                                    required
                                    value={employee.basicInfo.category}
                                    onChange={(e) => employeeHandler(e, 'category')}
                                    label="employeeCategory"
                                    disabled
                                >
                                    <MenuItem value="Current Employee">Current Employee</MenuItem>
                                    <MenuItem value="Pensioner">Pensioner</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="status-id">Status</InputLabel>
                                <Select
                                    labelId="status-id-label"
                                    id="status"
                                    required
                                    value={employee.basicInfo.status}
                                    onChange={(e) => employeeHandler(e, 'status')}
                                    label="status"
                                    disabled
                                >
                                    <MenuItem value="Alive">Alive</MenuItem>
                                    <MenuItem value="Deceased">Deceased</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Emoluments
                    </Typography>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.basicPay}
                                onChange={(e) => {
                                    console.log('event->', e.target.value);
                                    employeeHandler(e, 'basicPay');
                                }}
                                id="basicPay"
                                required
                                type="number"
                                label="Basic Pay"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.nonPracticingAllowance}
                                onChange={(e) => employeeHandler(e, 'nonPracticingAllowance')}
                                id="nonPracticingAllowance"
                                required
                                type="number"
                                label="Non-Practicing Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.specialHealthCareAllowance}
                                onChange={(e) => employeeHandler(e, 'specialHealthCareAllowance')}
                                id="specialHealthCareAllowance"
                                required
                                type="number"
                                label="Special Health Care Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.healthProfnlAllowance}
                                onChange={(e) => employeeHandler(e, 'healthProfnlAllowance')}
                                id="healthProfnlAllowance"
                                required
                                type="number"
                                label="Health Profnl Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.houseRent}
                                onChange={(e) => employeeHandler(e, 'houseRent')}
                                id="houseRent"
                                required
                                type="number"
                                label="House Rent"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.conPetAllowance}
                                onChange={(e) => employeeHandler(e, 'conPetAllowance')}
                                id="conPetAllowance"
                                required
                                type="number"
                                label="Con Pet Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.qualificationAllowance}
                                onChange={(e) => employeeHandler(e, 'qualificationAllowance')}
                                id="qualificationAllowance"
                                required
                                type="number"
                                label="Qualification Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.entertainment}
                                onChange={(e) => employeeHandler(e, 'entertainment')}
                                id="entertainment"
                                required
                                type="number"
                                label="Entertainment"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.personalAllowance}
                                onChange={(e) => employeeHandler(e, 'personalAllowance')}
                                id="personalAllowance"
                                required
                                type="number"
                                label="Personal Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.tTAllowance}
                                onChange={(e) => employeeHandler(e, 'tTAllowance')}
                                id="tTAllowance"
                                required
                                type="number"
                                label="TT Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.medicalAllowance}
                                onChange={(e) => employeeHandler(e, 'medicalAllowance')}
                                id="medicalAllowance"
                                required
                                type="number"
                                label="Medical Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.socialSecuirtyBenefit}
                                onChange={(e) => employeeHandler(e, 'socialSecuirtyBenefit')}
                                id="socialSecuirtyBenefit"
                                required
                                type="number"
                                label="Social Secuirty Benefit"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.seniorPostAllowance}
                                onChange={(e) => employeeHandler(e, 'seniorPostAllowance')}
                                id="seniorPostAllowance"
                                required
                                type="number"
                                label="Senior Post Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.chairmanAllowance}
                                onChange={(e) => employeeHandler(e, 'chairmanAllowance')}
                                id="chairmanAllowance"
                                required
                                type="number"
                                label="Chairman Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.rTWardenAllowance}
                                onChange={(e) => employeeHandler(e, 'rTWardenAllowance')}
                                id="rTWardenAllowance"
                                required
                                type="number"
                                label="RT-Warden Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.amolument.specialReliefAllowance}
                                onChange={(e) => employeeHandler(e, 'specialReliefAllowance')}
                                id="specialReliefAllowance"
                                required
                                type="number"
                                label="Special Relief Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={parseInt(totalAmolumentValue)}
                                label="Total Amoluments"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Deductions
                    </Typography>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.incomeTax}
                                onChange={(e) => employeeHandler(e, 'incomeTax')}
                                id="incomeTax"
                                required
                                type="number"
                                label="Income Tax"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.gPFSubscription}
                                onChange={(e) => employeeHandler(e, 'gPFSubscription')}
                                id="gPFSubscription"
                                required
                                type="number"
                                label="GPF Subscription"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.recGPF}
                                onChange={(e) => employeeHandler(e, 'recGPF')}
                                id="recGPF"
                                required
                                type="number"
                                label="rec GPF"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.houseRentR}
                                onChange={(e) => employeeHandler(e, 'houseRentR')}
                                id="houseRentR"
                                required
                                type="number"
                                label="House Rent R"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.waterCharges}
                                onChange={(e) => employeeHandler(e, 'waterCharges')}
                                id="waterCharges"
                                required
                                type="number"
                                label="Water Charges"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.shortDays}
                                onChange={(e) => employeeHandler(e, 'shortDays')}
                                id="shortDays"
                                required
                                type="number"
                                label="Short Days"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.convRecovery}
                                onChange={(e) => employeeHandler(e, 'convRecovery')}
                                id="convRecovery"
                                required
                                type="number"
                                label="Conv-Recovery"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.uniTTAllowance}
                                onChange={(e) => employeeHandler(e, 'uniTTAllowance')}
                                id="uniTTAllowance"
                                required
                                type="number"
                                label="Uni-TT-Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.tSAFund}
                                onChange={(e) => employeeHandler(e, 'tSAFund')}
                                id="tSAFund"
                                required
                                type="number"
                                label="TSA-Fund"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.benevolentFund}
                                onChange={(e) => employeeHandler(e, 'benevolentFund')}
                                id="benevolentFund"
                                required
                                type="number"
                                label="Benevolent Fund"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.groupInsurance}
                                onChange={(e) => employeeHandler(e, 'groupInsurance')}
                                id="groupInsurance"
                                required
                                type="number"
                                label="Group Insurance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.eidAdvance}
                                onChange={(e) => employeeHandler(e, 'eidAdvance')}
                                id="eidAdvance"
                                required
                                type="number"
                                label="Eid Advance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.busCharges}
                                onChange={(e) => employeeHandler(e, 'busCharges')}
                                id="busCharges"
                                required
                                type="number"
                                label="Bus Charges"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.speciialIncentive}
                                onChange={(e) => employeeHandler(e, 'speciialIncentive')}
                                id="speciialIncentive"
                                required
                                type="number"
                                label="Special Incentive"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.conveyanceAllowance}
                                onChange={(e) => employeeHandler(e, 'conveyanceAllowance')}
                                id="conveyanceAllowance"
                                required
                                type="number"
                                label="Conveyance Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.integratedAllowance}
                                onChange={(e) => employeeHandler(e, 'integratedAllowance')}
                                id="integratedAllowance"
                                required
                                type="number"
                                label="Integrated Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.disableAllowance}
                                onChange={(e) => employeeHandler(e, 'disableAllowance')}
                                id="disableAllowance"
                                required
                                type="number"
                                label="Disable Allowance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.sSB}
                                onChange={(e) => employeeHandler(e, 'sSB')}
                                id="sSB"
                                required
                                type="number"
                                label="SSB"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.gIP}
                                onChange={(e) => employeeHandler(e, 'gIP')}
                                id="gIP"
                                required
                                type="number"
                                label="GIP"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.recEidAdvance}
                                onChange={(e) => employeeHandler(e, 'recEidAdvance')}
                                id="recEidAdvance"
                                required
                                type="number"
                                label="Rec Eid Advance"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.accomadationCharges}
                                onChange={(e) => employeeHandler(e, 'accomadationCharges')}
                                id="accomadationCharges"
                                required
                                type="number"
                                label="Accomadation Charges"
                                variant="standard"
                                disabled
                            />
                        </Grid>

                        {/* <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.totalDeductions}
                                onChange={(e) => employeeHandler(e, 'totalDeductions')}
                                id="totalDeductions"
                                required
                                type="number"
                                label="Total Deductions"
                                variant="standard"
                                disabled
                            />
                        </Grid> */}
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={parseInt(totalDeductionValue)}
                                label="Total Deductions"
                                variant="standard"
                                disabled
                            />
                        </Grid>
                        <Tooltip title="Net Payable">
                            <Typography variant="h3" className="my-11 mx-3 " gutterBottom>
                                Net Payable : {netPayableValue}
                                {netPayableValue < 0 && <p style={{ color: 'red' }}>Net payable should not be in negative</p>}
                            </Typography>
                        </Tooltip>
                        {/* <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee.currentPay.deductions.netPayable}
                                onChange={(e) => employeeHandler(e, 'netPayable')}
                                id="netPayable"
                                required
                                type="number"
                                label="Net Payable"
                                variant="standard"
                                
                            />
                        </Grid> */}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddNewEmployee;
