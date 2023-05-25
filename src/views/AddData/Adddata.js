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

    background: "ghostwhite",
    height: "80vh ",
  },
  button: {
    width: 200,
    background: "royalblue",
    margin: "15px 0"
  },
  textField: {
    width: 200,
    marginTop: 10,
    fontWeight: "lighter"
  },
  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  }
}));

export default function Adddata() {
  const classes = useStyles();
  const [isAgreed, setIsAgreed] = useState(false);
  const [Allowance, setAllowance] = useState("");
  const [department, setDepartment] = useState("");
  const [alertstatus, setalertstatus] = useState(false)
  const [alertmsg, setalertmsg] = useState()
  const [value, setvalue] = useState(0);
  const [rangeFrom, setrangeFrom] = useState();
  const [rangeTo, setrangeTo] = useState();
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [isdisabled, setisdisabled] = useState(true)
  const [AllowanceList, setAllowanceList] = useState()
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
    reqObj.allowancevalue = value
    reqObj.rangeFrom = rangeFrom
    reqObj.rangeTo = rangeTo
    reqObj.year = year
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
          navigate("/increments")
        }, 2000);
      }
    } catch (error) {
      console.log("error", error)
    }
  }


  const handleInputChange = (e) => {
    const inputYear = Number(e.target.value);
    setYear(inputYear);
  };



  useEffect(async () => {

    try {
      var res = await API.get("employee/new-allowance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('IdToken')}`
        }
      });
      console.log(res)
      setAllowanceList(res.data)
      // if (res) {
      //   setalertstatus(true)
      //   setalertmsg("Allowance updated")
      //   setTimeout(() => {
      //     handleClose()
      //     navigate("/dashboard")
      //   }, 2000);
      // }
    } catch (error) {
      console.log("error", error)
    }



    if (Allowance.length > 1 && year > 2000 && rangeFrom != undefined && rangeTo != undefined && rangeFrom > 0) {
      console.log("inside if condition", Allowance.length, rangeFrom, rangeTo, year);
      setisdisabled(false)
    }
    else {
      setisdisabled(true)
      console.log("else part")

    }

  }, [rangeTo, rangeFrom, year, Allowance])



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
            <div className="text-white">Allowance Increments</div>
          </Typography>
        </Toolbar>
      </AppBar>

      <form className={classes.container} onSubmit={submithandler}>
        <FormControl className={classes.textField} required>
          <InputLabel >Select Field</InputLabel>


          <Select value={Allowance} onChange={(e) => setAllowance(e.target.value)}>

            {

            AllowanceList &&  AllowanceList?.map((e) => {
                console.log(e)
                return <MenuItem value={e}>{e}</MenuItem>
              })
            }

            {/* <MenuItem value="houseRent">Home Rent</MenuItem>
            <MenuItem value="medicalAllowance">Medical Allowance</MenuItem>
            <MenuItem value="qualificationAllowance">Qualification Allowance</MenuItem>
            <MenuItem value="chairmanAllowance">Chairman Allowance</MenuItem>
            <MenuItem value="conPetAllowance">Con Pet Allowance</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="healthProfnlAllowance">Health Profnl Allowance</MenuItem>
            <MenuItem value="personalAllowance">Personal Allowance</MenuItem>
            <MenuItem value="specialReliefAllowance">Special Relief Allowance</MenuItem> */}
          </Select>
        </FormControl>
        <TextField
          required
          label="Year:"
          type="text"
          value={year}
          onChange={handleInputChange}
          placeholder="YYYY"
          inputProps={{ maxLength: 4 }}
          className={classes.textField}

        />

        <div className={classes.error}>

          <TextField
            required
            id="input-field-3"
            label="Scale range from"
            className={classes.textField}
            margin="normal"
            // size="small"
            onChange={(e) => setrangeFrom(Number(e.target.value))}
            type="text"
            inputProps={{ maxLength: 2 }}

          />
          {rangeFrom > 22 && <p style={{ color: 'red', position: "absolute", right: "-110%", marginLeft: "20px" }}>* Enter Valid Scale Range 1-22</p>}
        </div>
        {/* : null}

        {rangeFrom ? */}
        <div className={classes.error}>
          <TextField
            required
            id="input-field-3"
            label="Scale range to"
            // size="small"
            className={classes.textField}
            margin="normal"
            onChange={(e) => setrangeTo(Number(e.target.value))}
            type="text"
            inputProps={{ maxLength: 2 }}
          />
          {rangeTo > 22 && <p style={{ color: 'red', position: "absolute", right: "-110%" }}>* Enter Valid Scale Range 1-22</p>}
        </div>

        {/* : null}
        {rangeTo ? */}
        <div className={classes.error}>
          <TextField
            required
            id="input-field-3"
            label="Amount"
            className={classes.textField}
            margin="normal"
            onChange={(e) => setvalue(Number(e.target.value))}
            type="text"
            
          />
          {/* <p style={{ color: 'green', position: "absolute", right: "-110%" }}>{value}% Increment will be added</p> */}
        </div>

        {/* : null} */}

        <Button disabled={isdisabled} type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
          Submit
        </Button>
      </form>
    </>

  );
}

