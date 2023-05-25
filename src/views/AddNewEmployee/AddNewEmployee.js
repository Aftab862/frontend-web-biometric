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
import API from '../../API/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import ReactJsAlert from "reactjs-alert"
import { Alert } from '@mui/material';
import { MoonLoader } from 'react-spinners';
const useStyles = makeStyles((theme) => ({
    btn: {
        marginRight: theme.spacing(4)
    },
    title: {
        flexGrow: 1
    },
}));




const AddNewEmployee = () => {
    const classes = useStyles();
    const params = useParams();

    const [alertstatus, setalertstatus] = useState(false)
    const [alertmsg, setalertmsg] = useState()
    const [BasicPay, setBasicPay] = useState(0);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#36d7b7");

    const [employee, setEmployee] = useState({
        basicInfo: {
            name: '',
            email: '',
            password: 12345678,
            cnic: "",
            pageNo: '',
            accountNo: '',
            department: '',
            scale: "",
            experience: '',
            type: '',
            designation: '',
            category: '',
            status: '',
            stg: "",
            increment: "",
            initialpay: '',

        },
        salaries: [],
        currentPay: {
            date: moment().format('DD-MM-YYYY'),
            verified: "True",
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
                specialReliefAllowance: 0,
                adhocReliefAllowance: 0,
                conveyanceAllowance: 0,
                uniTeachingAllowance: 0,
                ssbAllowance: 0,
                specialIncentiveAllowance: 0,
                darenessAllowance: 0,
                disableAllowance: 0,
                extraAllowance: 0,
                totalAmoluments: 0

            },
            deductions: {
                incomeTax: 0,
                gPFSubscription: 0,
                recGPF: 0,
                houseRentR: 0,
                waterCharges: 0,
                shortDays: 0,
                convRecovery: 0,
                houseBuildingAdvance: 0,
                tSAFund: 0,
                benevolentFund: 0,
                groupInsurance: 0,
                eidAdvance: 0,
                busCharges: 0,
                extraCausalLeaves: 0,
                tradeTax: 0,
                electricityCharges: 0,
                gIP: 0,
                carScooterAdvance: 0,
                accomadationCharges: 0,
                otherCharges: 0,
                totalDeductions: 0,
            },
            netPayable: 0
        }
    });
    const navigate = useNavigate();


    useEffect(() => {
        if (params.id) {
            setLoading(true)
            const fetchData = async () => {
                try {
                    console.log("i am add new employe component")

                    let api = API.get(`/employee/${params.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                        }
                    });
                    let response = await api;
                    // let api = `https://tender-gear-cod.cyclic.app/api/employee/${params.id}`
                    // console.log("your api", api)
                    // await fetch(api, {
                    //     headers: {
                    //         Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    //     }
                    // })
                    //     .then(response => response.json())
                    //     .then(data => setEmployee(data))
                    //     .catch(error => alert.error(error));

                    setEmployee(response.data);
                    console.log("Resposne", response.data)
                    setLoading(false)
                } catch (error) {
                    console.log('error', error);
                }
            };
            fetchData();
        }
        // setEmployee({
        //     ...employee,
        //     currentPay: {
        //         ...employee.currentPay,
        //         // amolument: { ...employee?.currentPay?.amolument?, basicPay: employee?.basicInfo?.initialpay + (employee?.basicInfo?.increment * employee?.basicInfo?.stg)},
        //         netPayable: netPayableValue
        //     }
        // });

    }, [params.id]);




    console.log('employee data->', employee);

    const employeeHandler = (e, type) => {

        // console.log('r', e.target.value);

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
            setEmployee({ ...employee, basicInfo: { ...employee?.basicInfo, experience: e.target.value } });
        } else if (type === 'type') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, type: e.target.value } });
        } else if (type === 'designation') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, designation: e.target.value } });
        } else if (type === 'category') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, category: e.target.value } });
        } else if (type === 'status') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, status: e.target.value } });
        } else if (type === 'stg') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, stg: parseInt(e.target.value) } });

        } else if (type === 'increment') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, increment: parseInt(e.target.value) } });
        } else if (type === 'initialpay') {
            setEmployee({ ...employee, basicInfo: { ...employee.basicInfo, initialpay: parseInt(e.target.value) } });
        }
        // else if (type === 'basicPay') {
        //     setEmployee({
        //         ...employee,
        //         currentPay: {
        //             ...employee.currentPay,
        //             amolument: { ...employee?.currentPay?.amolument?, basicPay: e.target.value !== NaN ? parseInt(e.target.value) : 0 }
        //         }
        // });
        // }
        else if (type === 'nonPracticingAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, nonPracticingAllowance: parseInt(e.target.value) }
                }
            });

        }

        else if (type === 'adhocReliefAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, adhocReliefAllowance: parseInt(e.target.value) }
                }
            });

        }


        else if (type === 'disableAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, disableAllowance: parseInt(e.target.value) }
                }
            });

        }


        else if (type === 'conveyanceAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, conveyanceAllowance: parseInt(e.target.value) }
                }
            });

        }
        else if (type === 'uniTeachingAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, uniTeachingAllowance: parseInt(e.target.value) }
                }
            });

        }
        else if (type === 'ssbAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, ssbAllowance: parseInt(e.target.value) }
                }
            });

        }
        else if (type === 'specialIncentiveAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, specialIncentiveAllowance: parseInt(e.target.value) }
                }
            });

        }
        else if (type === 'darenessAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, darenessAllowance: parseInt(e.target.value) }
                }
            });

        }


















































        else if (type === 'specialHealthCareAllowance') {
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

        }
        else if (type === 'tTAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, tTAllowance: parseInt(e.target.value) }
                }
            });
        }

        else if (type === 'extraAllowance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, extraAllowance: parseInt(e.target.value) }
                }
            });
        }






        else if (type === 'medicalAllowance') {
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
        }
        else if (type === 'houseBuildingAdvance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, houseBuildingAdvance: parseInt(e.target.value) }
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
        }
        else if (type === 'extraCausalLeaves') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, extraCausalLeaves: parseInt(e.target.value) }
                }
            });
        } else if (type === 'tradeTax') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, tradeTax: parseInt(e.target.value) }
                }
            });
        }
        else if (type === 'electricityCharges') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, electricityCharges: parseInt(e.target.value) }
                }
            });
            // }
            //  else if (type === 'disableAllowance') {
            //     setEmployee({
            //         ...employee,
            //         currentPay: {
            //             ...employee.currentPay,
            //             deductions: { ...employee.currentPay.deductions, disableAllowance: parseInt(e.target.value) }
            //         }
            //     });
        } else if (type === 'otherCharges') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, otherCharges: parseInt(e.target.value) } }
            });
        } else if (type === 'gIP') {
            setEmployee({
                ...employee,
                currentPay: { ...employee.currentPay, deductions: { ...employee.currentPay.deductions, gIP: parseInt(e.target.value) } }
            });
        } else if (type === 'carScooterAdvance') {
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    deductions: { ...employee.currentPay.deductions, carScooterAdvance: parseInt(e.target.value) }
                }
            });
        } else if (type === 'accomadationCharges') {

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
        employee?.basicInfo?.initialpay + (employee?.basicInfo?.increment * employee?.basicInfo?.stg) +
        employee?.currentPay?.amolument?.chairmanAllowance +
        employee?.currentPay?.amolument?.conPetAllowance +
        employee?.currentPay?.amolument?.conveyanceAllowance +
        employee?.currentPay?.amolument?.healthProfnlAllowance +
        employee?.currentPay?.amolument?.disableAllowance +
        employee?.currentPay?.amolument?.extraAllowance +
        employee?.currentPay?.amolument?.darenessAllowance +
        employee?.currentPay?.amolument?.specialIncentiveAllowance +
        employee?.currentPay?.amolument?.ssbAllowance +
        employee?.currentPay?.amolument?.uniTeachingAllowance +
        employee?.currentPay?.amolument?.adhocReliefAllowance +
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
        employee?.currentPay?.amolument?.entertainment +
        employee?.currentPay?.amolument?.tTAllowance;
    // console.log('totalAmolmentValue', totalAmolumentValue);
    // same for total deduction
    let totalDeductionValue =
        employee?.currentPay?.deductions?.incomeTax +
        employee?.currentPay?.deductions?.gPFSubscription +
        employee?.currentPay?.deductions?.recGPF +
        employee?.currentPay?.deductions?.houseRentR +
        employee?.currentPay?.deductions?.waterCharges +
        employee?.currentPay?.deductions?.shortDays +
        employee?.currentPay?.deductions?.convRecovery +
        employee?.currentPay?.deductions?.houseBuildingAdvance +
        employee?.currentPay?.deductions?.tSAFund +
        employee?.currentPay?.deductions?.benevolentFund +
        employee?.currentPay?.deductions?.groupInsurance +
        employee?.currentPay?.deductions?.eidAdvance +
        employee?.currentPay?.deductions?.busCharges +
        employee?.currentPay?.deductions?.extraCausalLeaves +
        employee?.currentPay?.deductions?.tradeTax +
        employee?.currentPay?.deductions?.electricityCharges +
        // emplo?yee.current?Pay.deducti?ons.disableAllowance +
        employee?.currentPay?.deductions?.otherCharges +
        employee?.currentPay?.deductions?.gIP +
        employee?.currentPay?.deductions?.carScooterAdvance +
        employee?.currentPay?.deductions?.accomadationCharges;

    let netPayableValue = parseInt(totalAmolumentValue) - parseInt(totalDeductionValue);



    const add = async () => {
        let api;

        if (employee?.basicInfo?.name.length < 3) {
            setalertstatus(true)
            setalertmsg("please enter valid Name ")
        }
        else if (employee?.basicInfo?.password.length < 6) {
            setalertstatus(true)
            console.log("password-<", employee?.basicInfo?.password.length)
            setalertmsg("Password length must be grater than 6 character")
        }


        else if (employee?.basicInfo?.email.length < 3) {
            setalertstatus(true)
            setalertmsg("please enter valid email ")
        }

        else if (employee?.basicInfo?.accountNo < 2) {
            setalertstatus(true)
            setalertmsg("Please Enter Valid AccountNo: ")
        }
        else if (!employee?.basicInfo?.category) {
            setalertstatus(true)
            setalertmsg("Employee Catagory is Required")
        }
        else if (employee?.basicInfo?.cnic < 3) {
            setalertstatus(true)
            setalertmsg("please enter valid CNIC ")
        }
        else if (!employee?.basicInfo?.department) {
            setalertstatus(true)
            setalertmsg("Department is Required")
        }
        else if (!employee?.basicInfo?.designation) {
            setalertstatus(true)
            setalertmsg("Designation is Required")
        }
        else if (employee?.basicInfo?.experience < 1) {
            setalertstatus(true)
            setalertmsg("Experience Must be greater than 0")

        }
        else if (employee?.basicInfo?.increment < 1) {
            setalertstatus(true)
            setalertmsg("Increment is Required")
        }

        else if (employee?.basicInfo?.initialpay < 1) {
            setalertstatus(true)
            setalertmsg("InitialPay is Required")

        }
        else if (employee?.basicInfo?.name.length < 3) {
            setalertstatus(true)
            setalertmsg("please enter valid Name ")
        }
        else if (employee?.basicInfo?.pageNo < 1) {
            setalertstatus(true)
            setalertmsg("PageNo is Required")
        }

        else if (employee?.basicInfo?.scale < 1) {
            setalertstatus(true)
            setalertmsg("Scale is Required")
        }

        else if (employee?.basicInfo?.stg < 1) {
            setalertstatus(true)
            setalertmsg("STG is Required")
        }
        else if (!employee?.basicInfo?.type) {
            setalertstatus(true)
            setalertmsg("Type is Required")
        }
        else if (!employee?.basicInfo?.status) {
            setalertstatus(true)
            setalertmsg("Status is Required")

        }

        else {
            setLoading(true)
            // let obj = {};
            // obj.Emoulments = employee.currentPay.amolument;
            // obj.deductions = employee.currentPay.deductions;
            // obj.totalPaid = netPayableValue;
            // obj.date = moment().format('YYYY');

            const reqObj = {
                ...employee,
                // salaries: [...employee.salaries, { obj }],
            }

            if (params.id) {
                console.log("latest", employee.currentPay)
                api = API.patch(`/employee/${params.id}`, reqObj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    }
                });
            } else {

                api = API.post('/employee/add', reqObj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('IdToken')}`
                    }
                });
            }
            try {
                console.log('else part', netPayableValue);
                console.log('else part', reqObj);

                const response = await api;
                if (response) navigate(`/viewemployees`);
                console.log('response', response);
            } catch (error) {
                setalertstatus(true)
                setalertmsg("Email Already Added ")
                setTimeout(() => {
                    setLoading(false)
                    // navigate(`/viewemployees`);
                }, 2000);

            }
        }
    };


    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

            processData(data);
        };
        reader.readAsBinaryString(file);
    }





    useEffect(() => {
        if (employee?.basicInfo?.initialpay > 0 && employee?.basicInfo?.stg > 0 && employee?.basicInfo?.initialpay > 0) {
            console.log("inside 3")
            setEmployee({
                ...employee,
                currentPay: {
                    ...employee.currentPay,
                    amolument: { ...employee.currentPay.amolument, basicPay: employee?.basicInfo?.initialpay + (employee?.basicInfo?.increment * employee?.basicInfo?.stg) }
                }
            });
        }
        else if (employee?.basicInfo?.initialpay > 0 && employee?.basicInfo?.increment > 0) {
            console.log("inside 2")
            setBasicPay(employee?.basicInfo?.initialpay + employee?.basicInfo?.increment)
        }
        else if (employee?.basicInfo?.initialpay > 0) {
            console.log("inside 1")
            setBasicPay(employee?.basicInfo?.initialpay)
        }

    }, [netPayableValue])



    useEffect(() => {
        setEmployee(prevEmployee => {
            const updatedCurrentPay = {
                ...prevEmployee.currentPay,
                netPayable: netPayableValue,
                amolument: {
                    ...prevEmployee.currentPay.amolument,
                    totalAmoluments: totalAmolumentValue,
                },
                deductions: {
                    ...prevEmployee.currentPay.deductions,
                    totalDeductions: totalDeductionValue,
                },
            };
            const updatedEmployee = {
                ...prevEmployee,
                currentPay: updatedCurrentPay,
            };
            return updatedEmployee;
        });
    }, [netPayableValue, totalAmolumentValue, totalDeductionValue])



    // useEffect(() => {
    //     setEmployee(employee => ({
    //         ...employee, currentPay: {
    //             ...employee.currentPay,
    //             netPayable: netPayableValue
    //         }
    //     }));
    // }, [netPayableValue])


    // useEffect(() => {
    //     setEmployee({
    //         ...employee,
    //         currentPay: {
    //             ...employee.currentPay,
    //             amolument: { ...employee.currentPay.amolument, totalAmoluments: totalAmolumentValue }
    //         }
    //     });

    // }, [netPayableValue])

    // useEffect(() => {

    //     setEmployee({
    //         ...employee,
    //         currentPay: {
    //             ...employee.currentPay,
    //             deductions: { ...employee.currentPay.deductions, totalDeductions: totalDeductionValue }
    //         }
    //     });
    // }, [netPayableValue])

    return (
        <>


            <MoonLoader
                color={color}
                loading={loading}
                size={50}
                cssOverride={
                    {
                        margin: "auto auto",
                        borderColor: "red",
                    }
                }

            />
            <ReactJsAlert

                status={alertstatus}   // true or false
                type="info"   // success, warning, error, info
                title={alertmsg}   // title you want to display
                Close={() => setalertstatus(false)}   // callback method for hide
            />
            <AppBar className="mt-4" position="static">
                <Toolbar className="h-32">
                    <Typography variant="h2" className={classes.title}>
                        <div className="text-white">{params.id ? 'Save & Commit' : 'Add New Employee'}</div>
                    </Typography>
                    <Tooltip title={params.id ? 'Update Data' : 'Add Employee'}>
                        <Button
                            disabled={employee?.currentPay?.netPayable < 0}
                            onClick={add}
                            size="medium"
                            className="bg-blue-800 text-white hover:bg-blue-800 hover:text-white m-4"
                        >
                            {params.id ? 'Update Data' : 'Add Employee'}
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
                                value={employee?.basicInfo?.name}
                                onChange={(e) => employeeHandler(e, 'name')}
                                id="name"
                                type="text"
                                placeholder="Enter Full Name"
                                required
                                label="Name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.email}
                                onChange={(e) => employeeHandler(e, 'email')}
                                id="email"
                                type="email"
                                required
                                placeholder="Enter Valid Email"
                                label="Email"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.password}
                                onChange={(e) => employeeHandler(e, 'password')}
                                id="password"
                                type="text"
                                placeholder="Set User password"
                                required
                                label="Password"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                inputProps={{
                                    maxLength: 13
                                }}
                                InputProps={{}}
                                fullWidth
                                value={employee?.basicInfo?.cnic}
                                onChange={(e) => employeeHandler(e, 'cnic')}
                                id="cnic"
                                type="number"
                                placeholder="Enter 13-digit CNIC"
                                required
                                label="CNIC"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.pageNo}
                                onChange={(e) => employeeHandler(e, 'pageNo')}
                                id="PageNo"
                                required
                                type="number"
                                label="PageNo"
                                placeholder="Enter Records Page Number"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                inputProps={{
                                    maxLength: 14
                                }}
                                InputProps={{}}
                                fullWidth
                                value={employee?.basicInfo?.accountNo}
                                onChange={(e) => employeeHandler(e, 'accountNo')}
                                id="account"
                                required
                                type="text"
                                label="Account Number"
                                placeholder="Enter 14-digit Bank Account Number"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.scale}
                                onChange={(e) => employeeHandler(e, 'scale')}
                                id="scale"
                                required
                                type="number"
                                label="Scale"
                                placeholder="Enter Employee's Pay Scale"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.experience}
                                onChange={(e) => employeeHandler(e, 'experience')}
                                id="experience"
                                required
                                type="number"
                                label="Experience(in years)"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.designation}
                                required
                                onChange={(e) => employeeHandler(e, 'designation')}
                                id="Designation"
                                type="text"
                                label="Designation"
                                variant="standard"
                                placeholder="Enter Employee's Designation"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.initialpay}
                                required
                                onChange={(e) => employeeHandler(e, 'initialpay')}
                                id="initialpay"
                                type="number"
                                label="Initial Basic Pay"
                                variant="standard"
                                placeholder="Enter Employee's Initial Basic Pay"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.increment}
                                required
                                onChange={(e) => employeeHandler(e, 'increment')}
                                id="increment"
                                type="number"
                                label="Increment"
                                variant="standard"
                                placeholder="Enter Employee's Increment"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.basicInfo?.stg}
                                required
                                onChange={(e) => employeeHandler(e, 'stg')}
                                id="stg"
                                type="number"
                                label="Stg"
                                variant="standard"
                                placeholder="Enter Employee's stg"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="department-id">Department</InputLabel>
                                <Select
                                    labelId="department-id-label"
                                    id="department"
                                    required
                                    value={employee?.basicInfo?.department}
                                    onChange={(e) => employeeHandler(e, 'department')}
                                    label="Department"
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
                                    value={employee?.basicInfo?.type}
                                    required
                                    onChange={(e) => employeeHandler(e, 'type')}
                                    id="type"
                                    label="Type"
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
                                    value={employee?.basicInfo?.category}
                                    onChange={(e) => employeeHandler(e, 'category')}
                                    label="employeeCategory"
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
                                    value={employee?.basicInfo?.status}
                                    onChange={(e) => employeeHandler(e, 'status')}
                                    label="status"
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
                                value={employee?.basicInfo?.initialpay + (employee?.basicInfo?.increment * employee?.basicInfo?.stg)}
                                // onChange={(e) => {
                                //     console.log('event->', e.target.value);
                                //     // employeeHandler(e, 'basicPay');
                                // }}
                                // id="basicPay"
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
                                value={employee?.currentPay?.amolument?.nonPracticingAllowance}
                                onChange={(e) => employeeHandler(e, 'nonPracticingAllowance')}
                                id="nonPracticingAllowance"
                                required
                                type="number"
                                label="Non-Practicing Allowance"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.adhocReliefAllowance}
                                onChange={(e) => employeeHandler(e, 'adhocReliefAllowance')}
                                id="adhocReliefAllowance"
                                required
                                type="number"
                                label="Adhoc Relief Allowance"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.conveyanceAllowance}
                                onChange={(e) => employeeHandler(e, 'conveyanceAllowance')}
                                id="conveyanceAllowance"
                                required
                                type="number"
                                label="Conveyance Allowance"
                                variant="standard"
                            />
                        </Grid>


                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.uniTeachingAllowance}
                                onChange={(e) => employeeHandler(e, 'uniTeachingAllowance')}
                                id="uniTeachingAllowance"
                                required
                                type="number"
                                label="Univ. Tech. Teaching Allowance "
                                variant="standard"
                            />
                        </Grid>


                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.ssbAllowance}
                                onChange={(e) => employeeHandler(e, 'ssbAllowance')}
                                id="ssbAllowance"
                                required
                                type="number"
                                label="S.S.B Allowance "
                                variant="standard"
                            />
                        </Grid>




                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.specialIncentiveAllowance}
                                onChange={(e) => employeeHandler(e, 'specialIncentiveAllowance')}
                                id="pecialIncentiveAllowance"
                                required
                                type="number"
                                label="Special Incentive Allowance For RCET, Regular Faculty"
                                variant="standard"
                            />
                        </Grid>



                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.darenessAllowance}
                                onChange={(e) => employeeHandler(e, 'darenessAllowance')}
                                id="darenessAllowance"
                                required
                                type="number"
                                label="Dareness Allowance"
                                variant="standard"
                            />
                        </Grid>


                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.disableAllowance}
                                onChange={(e) => employeeHandler(e, 'disableAllowance')}
                                id="disableAllowance"
                                required
                                type="number"
                                label="Disable Allowance"
                                variant="standard"
                            />
                        </Grid>






















                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.specialHealthCareAllowance}
                                onChange={(e) => employeeHandler(e, 'specialHealthCareAllowance')}
                                id="specialHealthCareAllowance"
                                required
                                type="number"
                                label="Special Health Care Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.healthProfnlAllowance}
                                onChange={(e) => employeeHandler(e, 'healthProfnlAllowance')}
                                id="healthProfnlAllowance"
                                required
                                type="number"
                                label="Health Profnl Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.houseRent}
                                onChange={(e) => employeeHandler(e, 'houseRent')}
                                id="houseRent"
                                required
                                type="number"
                                label="House Rent"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.conPetAllowance}
                                onChange={(e) => employeeHandler(e, 'conPetAllowance')}
                                id="conPetAllowance"
                                required
                                type="number"
                                label="Con Pet Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.qualificationAllowance}
                                onChange={(e) => employeeHandler(e, 'qualificationAllowance')}
                                id="qualificationAllowance"
                                required
                                type="number"
                                label="Qualification Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.entertainment}
                                onChange={(e) => employeeHandler(e, 'entertainment')}
                                id="entertainment"
                                required
                                type="number"
                                label="Entertainment"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.personalAllowance}
                                onChange={(e) => employeeHandler(e, 'personalAllowance')}
                                id="personalAllowance"
                                required
                                type="number"
                                label="Personal Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.tTAllowance}
                                onChange={(e) => employeeHandler(e, 'tTAllowance')}
                                id="tTAllowance"
                                required
                                type="number"
                                label="TT Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.medicalAllowance}
                                onChange={(e) => employeeHandler(e, 'medicalAllowance')}
                                id="medicalAllowance"
                                required
                                type="number"
                                label="Medical Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.socialSecuirtyBenefit}
                                onChange={(e) => employeeHandler(e, 'socialSecuirtyBenefit')}
                                id="socialSecuirtyBenefit"
                                required
                                type="number"
                                label="Social Secuirty Benefit"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.seniorPostAllowance}
                                onChange={(e) => employeeHandler(e, 'seniorPostAllowance')}
                                id="seniorPostAllowance"
                                required
                                type="number"
                                label="Senior Post Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.chairmanAllowance}
                                onChange={(e) => employeeHandler(e, 'chairmanAllowance')}
                                id="chairmanAllowance"
                                required
                                type="number"
                                label="Chairman Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.rTWardenAllowance}
                                onChange={(e) => employeeHandler(e, 'rTWardenAllowance')}
                                id="rTWardenAllowance"
                                required
                                type="number"
                                label="RT-Warden Allowance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.specialReliefAllowance}
                                onChange={(e) => employeeHandler(e, 'specialReliefAllowance')}
                                id="specialReliefAllowance"
                                required
                                type="number"
                                label="Special Relief Allowance"
                                variant="standard"
                            />
                        </Grid>


                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.amolument?.extraAllowance}
                                onChange={(e) => employeeHandler(e, 'extraAllowance')}
                                id="extraAllowance"
                                required
                                type="number"
                                label="Extra Allowance"
                                variant="standard"
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
                                value={employee?.currentPay?.deductions?.incomeTax}
                                onChange={(e) => employeeHandler(e, 'incomeTax')}
                                id="incomeTax"
                                required
                                type="number"
                                label="Income Tax"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.gPFSubscription}
                                onChange={(e) => employeeHandler(e, 'gPFSubscription')}
                                id="gPFSubscription"
                                required
                                type="number"
                                label="GPF Subscription"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.recGPF}
                                onChange={(e) => employeeHandler(e, 'recGPF')}
                                id="recGPF"
                                required
                                type="number"
                                label="rec GPF"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.houseRentR}
                                onChange={(e) => employeeHandler(e, 'houseRentR')}
                                id="houseRentR"
                                required
                                type="number"
                                label="House Rent R"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.waterCharges}
                                onChange={(e) => employeeHandler(e, 'waterCharges')}
                                id="waterCharges"
                                required
                                type="number"
                                label="Water Charges"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.shortDays}
                                onChange={(e) => employeeHandler(e, 'shortDays')}
                                id="shortDays"
                                required
                                type="number"
                                label="Short Days"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.convRecovery}
                                onChange={(e) => employeeHandler(e, 'convRecovery')}
                                id="convRecovery"
                                required
                                type="number"
                                label="Conv-Recovery"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.houseBuildingAdvance}
                                onChange={(e) => employeeHandler(e, 'houseBuildingAdvance')}
                                id="houseBuildingAdvance"
                                required
                                type="number"
                                label="House Building Advance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.tSAFund}
                                onChange={(e) => employeeHandler(e, 'tSAFund')}
                                id="tSAFund"
                                required
                                type="number"
                                label="TSA-Fund"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.benevolentFund}
                                onChange={(e) => employeeHandler(e, 'benevolentFund')}
                                id="benevolentFund"
                                required
                                type="number"
                                label="Benevolent Fund"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.groupInsurance}
                                onChange={(e) => employeeHandler(e, 'groupInsurance')}
                                id="groupInsurance"
                                required
                                type="number"
                                label="Group Insurance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.eidAdvance}
                                onChange={(e) => employeeHandler(e, 'eidAdvance')}
                                id="eidAdvance"
                                required
                                type="number"
                                label="Eid Advance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.busCharges}
                                onChange={(e) => employeeHandler(e, 'busCharges')}
                                id="busCharges"
                                required
                                type="number"
                                label="Bus Charges"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.extraCausalLeaves}
                                onChange={(e) => employeeHandler(e, 'extraCausalLeaves')}
                                id="extraCausalLeaves"
                                required
                                type="number"
                                label="Extra Causal Leaves"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.tradeTax}
                                onChange={(e) => employeeHandler(e, 'tradeTax')}
                                id="tradeTax"
                                required
                                type="number"
                                label="Trade Tax"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.electricityCharges}
                                onChange={(e) => employeeHandler(e, 'electricityCharges')}
                                id="electricityCharges"
                                required
                                type="number"
                                label="Electricity Charges"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.gIP}
                                onChange={(e) => employeeHandler(e, 'gIP')}
                                id="gIP"
                                required
                                type="number"
                                label="GIP"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.carScooterAdvance}
                                onChange={(e) => employeeHandler(e, 'carScooterAdvance')}
                                id="carScooterAdvance"
                                required
                                type="number"
                                label="Car Scooter Advance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.accomadationCharges}
                                onChange={(e) => employeeHandler(e, 'accomadationCharges')}
                                id="accomadationCharges"
                                required
                                type="number"
                                label="Accomadation Charges"
                                variant="standard"
                            />
                        </Grid>

                        {/* <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.totalDeductions}
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
                                value={employee?.currentPay?.deductions?.otherCharges}
                                onChange={(e) => employeeHandler(e, 'otherCharges')}
                                id="otherCharges"
                                required
                                type="number"
                                label="Other Charges"
                                variant="standard"
                            />
                        </Grid>


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

                                Net Payable : {netPayableValue > 0 ? netPayableValue : "undefined"}

                                {netPayableValue < 0 && <p style={{ color: 'red' }}>Net payable should not be in negative</p>}
                            </Typography>
                        </Tooltip>
                        {/* <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                value={employee?.currentPay?.deductions?.netPayable}
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

        </>




    );
};

export default AddNewEmployee;
