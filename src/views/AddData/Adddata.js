// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import DataTable from 'react-data-table-component';


// function Adddata() {

//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);

//   // process CSV data
//   const processData = dataString => {
//     const dataStringLines = dataString.split(/\r\n|\n/);
//     const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

//     const list = [];
//     for (let i = 1; i < dataStringLines.length - 1; i++) {
//       const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
//       if (headers && row.length == headers.length) {
//         const obj = {};
//         for (let j = 0; j < headers.length; j++) {
//           let d = row[j];
//           if (d.length > 0) {
//             if (d[0] == '"')
//               d = d.substring(1, d.length - 1);
//             if (d[d.length - 1] == '"')
//               d = d.substring(d.length - 2, 1);
//           }
//           if (headers[j]) {
//             obj[headers[j]] = d;
//           }
//         }

//         // remove the blank rows
//         if (Object.values(obj).filter(x => x).length > 0) {
//           list.push(obj);
//         }
//       }
//     }

//     // prepare columns list from headers
//     const columns = headers.map(c => ({
//       name: c,
//       selector: c,

//     }));
//     console.log("list ", list)
//     console.log("colums j", columns)

//     setData(list);
//     setColumns(columns);
//   }

//   // handle file upload
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       /* Parse data */
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: 'binary' });
//       /* Get first worksheet */
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       /* Convert array of arrays */
//       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

//       processData(data);
//     };
//     reader.readAsBinaryString(file);
//   }

//   return (
//     <div>
//       <h3>Read CSV file in React -</h3>
//       <input
//         type="file"
//         accept=".csv,.xlsx,.xls"
//         onChange={handleFileUpload}
//       />
//       {
//         data &&
//         < DataTable
//           pagination
//           highlightOnHover
//           columns={columns}
//           data={data}
//         />
//       }

//     </div>
//   );
// }

// export default Adddata;


import API from '../../API/api';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Alert, AlertTitle, AppBar, Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Toolbar, Tooltip, Typography } from "@mui/material";
import { height } from "@mui/system";
import ReactjsAlert from 'reactjs-alert';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "65px",
    background: "ghostwhite"
  },
  button: {
    width: 200,
    background: "royalblue"
  },
  textField: {
    width: 200,
    margin: 15,
    fontWeight: "lighter"
  },
}));

export default function Adddata() {
  const classes = useStyles();
  const [isAgreed, setIsAgreed] = useState(false);
  const [Allowance, setAllowance] = useState("");
  const [department, setDepartment] = useState("");
  const [alertstatus, setalertstatus] = useState(false)
  const [alertmsg, setalertmsg] = useState()
  const [value, setvalue] = useState();
  const [rangeFrom, setrangeFrom] = useState();
  const [rangeTo, setrangeTo] = useState();

  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  };
  function handleToggle() {
    setOpen(true);
  };


  const navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault();
    handleToggle()
    let reqObj = {}
    reqObj.allowanceType = Allowance;
    reqObj.department = department;
    reqObj.allowancevalue = value
    reqObj.rangeFrom = rangeFrom
    reqObj.rangeTo = rangeTo


    try {
      var res = API.patch("employee/updateall", reqObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('IdToken')}`
        }
      });
      if (res) {
        setalertstatus(true)
        setalertmsg("Allowance updated")
        setTimeout(() => {
          handleClose()
          navigate("/dashboard")
        }, 2000);
      }
    } catch (error) {
      console.log("error", error)
    }
  }




  return (
    <>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="secondary" />
      </Backdrop>


      <ReactjsAlert
        status={alertstatus}   // true or false
        type="info"   // success, warning, error, info
        title={alertmsg}   // title you want to display
        Close={() => setalertstatus(false)}   // callback method for hide
      />

      <AppBar className="mt-4" position="static">
        <Toolbar className="h-32">
          <Typography variant="h2" className={classes.title}>
            <div className="text-white">Add New Allowance</div>
          </Typography>
        </Toolbar>
      </AppBar>

      <form className={classes.container} onSubmit={submithandler}>
        <FormControl className={classes.textField} required>
          <InputLabel >Select Allowance</InputLabel>
          <Select value={Allowance} onChange={(e) => setAllowance(e.target.value)}>
            <MenuItem value="houseRent">Home Rent</MenuItem>
            <MenuItem value="medicalAllowance">Medical Allowance</MenuItem>
            <MenuItem value="qualificationAllowance">Qualification Allowance</MenuItem>
            <MenuItem value="chairmanAllowance">Chairman Allowance</MenuItem>
            <MenuItem value="conPetAllowance">Con Pet Allowance</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="healthProfnlAllowance">Health Profnl Allowance</MenuItem>
            <MenuItem value="personalAllowance">Personal Allowance</MenuItem>
            <MenuItem value="specialReliefAllowance">Special Relief Allowance</MenuItem>
          </Select>
        </FormControl>

        {/* {Allowance ? <FormControl className={classes.textField} required>
          <InputLabel >Select Departmnet</InputLabel>
          <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <MenuItem value="Computer Science">Cs Department</MenuItem>
            <MenuItem value="Electrical Engineering">EE Department</MenuItem>
            <MenuItem value="Machenical Engineering">ME Department</MenuItem>
          </Select>
        </FormControl> : null} */}

        {Allowance ?
          <TextField
            required
            id="input-field-3"
            label="Scale range from"
            className={classes.textField}
            margin="normal"
            // size="small"
            onChange={(e) => setrangeFrom(e.target.value)}
            type="number"
          /> : null}

        {rangeFrom ?
          <TextField
            required
            id="input-field-3"
            label="Scale range to"
            // size="small"
            className={classes.textField}
            margin="normal"
            onChange={(e) => setrangeTo(e.target.value)}
            type="number"
          /> : null}
        {rangeTo ?
          <TextField
            required
            id="input-field-3"
            label="Amount"
            className={classes.textField}
            margin="normal"
            onChange={(e) => setvalue(e.target.value)}
            type="number"
          /> : null}

        {/* <Checkbox
          id="checkbox-1"
          label="Checkbox 1"
          className={classes.textField}
          margin="normal"
        />
        <Typography variant="h2" className={classes.title}>
          <div className="text-white"></div>
        </Typography> */}
        {/* <div style={{ width: "20rem" }}> */}

        {/* <FormControl required>
          <InputLabel >Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel>Age</InputLabel>
          <Select value={age} onChange={(e) => setAge(e.target.value)}>
            <MenuItem value="under 18">Under 18</MenuItem>
            <MenuItem value="18-24">18-24</MenuItem>
            <MenuItem value="25-34">25-34</MenuItem>
            <MenuItem value="35-44">35-44</MenuItem>
            <MenuItem value="45+">45+</MenuItem>
          </Select>
        </FormControl>
      </div> */}

        <Button type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
          Submit
        </Button>
      </form>
    </>

  );
}
