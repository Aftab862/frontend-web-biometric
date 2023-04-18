

import API from '../../API/api';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Alert, AlertTitle, AppBar, Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Toolbar, Tooltip, Typography } from "@mui/material";
import { height } from "@mui/system";

import ReactJsAlert from "reactjs-alert"
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';


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
            height: "60dvh ",
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
      const [allowanceName, setallowanceName] = useState("");
      let [loading, setLoading] = useState(false);
      let [color, setColor] = useState("#36d7b7");

      const [alertstatus, setalertstatus] = useState(false)
      const [alertmsg, setalertmsg] = useState()


      const submithandler = async (e) => {
            e.preventDefault();
            setLoading(true)
            const params = {
                  allowanceName
            };
            try {
                  var res = await API.patch("/employee/new-allowance", { params }, {
                        headers: {
                              Authorization: `Bearer ${localStorage.getItem('IdToken')}`,
                              'Content-Type': 'application/json'
                        }
                  })
                  setLoading(false)
                  setalertstatus(true)
                  setalertmsg(res?.data?.message)
                  setallowanceName("")
            } catch (error) {
                  setLoading(false)
                  setalertstatus(true)
                  setalertmsg("Allowance Already Added")
                  setallowanceName("")

            }

      }

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
                  <AppBar className="mt-1" position="static">
                        <Toolbar className="h-32">
                              <Typography variant="h2" className={classes.title}>
                                    <div className="text-white">Add New Allowance</div>
                              </Typography>
                        </Toolbar>
                  </AppBar>

                  <form className={classes.container} onSubmit={submithandler}>
                        <TextField

                              required
                              label="Allownce Name"
                              type="text"
                              value={allowanceName}
                              onChange={(e) => setallowanceName(e.target.value)}
                              // onChange={handleInputChange}
                              placeholder="Dont Use Space"
                              // inputProps={{ maxLength: 4 }}
                              className={classes.error}
                        />

                        <div className={classes.error}>

                              {/* <TextField
                                    required
                                    id="input-field-3"
                                    label="Allowance Value"
                                    className={classes.textField}
                                    margin="normal"
                                    // size="small"
                                    onChange={(e) => setallowanceValue(Number(e.target.value))}
                                    type="number"
                              /> */}

                        </div>

                        <Button type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
                              Submit
                        </Button>
                  </form>

            </>

      );
}

