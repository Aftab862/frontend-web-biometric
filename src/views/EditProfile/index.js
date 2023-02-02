import React, { useEffect, useRef, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import User1 from '../../assets/images/users/user-round.svg';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: "relative",
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: theme.spacing(1),
    },
    uploadButton: {
        margin: theme.spacing(1),
        fontSize: "1.5ch"
    },
    uploadicon: {
        marginLeft: "20px"
    },
    save: {
        backgroundColor: 'purple',
        marginTop: "12px"
    },
    loader: {
        zIndex: 1100,
        position: "absolute !important",
        left: "55%",
        right: "40%",
        top: " 55%"
    }
}));

export default function EditProfile() {
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const form = useRef();

    const handleFileUpload = (event) => {
        event.preventDefault();
        console.log("called")
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

        }, 2500);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // handle form submission and update the user's profile
        // with the new information
        // after the action is finished, you can set loading to false
        setTimeout(() => {
            setLoading(false);

        }, 2500);

        // handle form submission and update the user's profile
        // with the new information
    };

    return (
        <>

            {
                loading ? (
                    <TailSpin
                        wrapperClass={classes.loader}
                        type="TailSpin"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    // timeout={3000} //3 secs
                    />
                ) :
                    (

                        <form ref={form} className={classes.root} onSubmit={handleSubmit}>
                            <Avatar
                                src={User1}
                                className={classes.avatar}
                            />


                            <input
                                accept="image/*"
                                className={classes.uploadButton}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleProfilePictureChange}
                            />
                            {/* <label htmlFor="contained-button-file"> */}
                            <Button variant="contained" onClick={handleFileUpload} color="primary" component="span" >
                                Upload
                                < CloudUploadIcon className={classes.uploadicon} />
                            </Button>
                            {/* </label> */}
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <TextField
                                id="passwordConfirm"
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                value={passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                            />
                            <Button className={classes.save} variant="contained" color="secondary" type='submit'>
                                Save Changes
                            </Button>
                            <Typography variant='caption' color='error' >
                                {password !== passwordConfirm && "Passwords do not match"}
                            </Typography>
                        </form>
                    )
            }
        </>

    )


}










// import axios from 'axios';
// import { useState } from 'react';

// export default function EditProfile() {
//     const [profilePicture, setProfilePicture] = useState();

//     const handleProfilePictureChange = (event) => {
//         setProfilePicture(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('image', profilePicture);
//         try {
//             const response = await axios.post('/api/image', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log(response.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };


//     return (

//         <form onSubmit={handleSubmit}>
//             <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleProfilePictureChange}
//             />
//             <Button variant="contained" color="primary" type="submit">
//                 Save Changes
//             </Button>
//         </form>
//     );
// }








// Here are the steps and code to create a simple React.js demo project that uses WebAuthn for authentication:

// Create a new React.js project using create - react - app:
// Copy code
// npx create - react - app my - webauthn - demo
// cd my - webauthn - demo
// Install the necessary dependencies:
// Copy code
// npm install--save react - router - dom
// npm install--save @material-ui / core
// Create a new component for the login page:
// Copy code
// src / components / Login.js
// Add the following code to the Login.js file:
// Copy code
// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& > *": {
//             margin: theme.spacing(1),
//             width: "25ch",
//         },
//     },
// }));

// export default function Login() {
//     const classes = useStyles();
//     const [status, setStatus] = useState("");
//     const [username, setUsername] = useState("");

//     const handleLogin = async () => {
//         try {
//             const publicKey = {
//                 rpId: "example.com",
//                 challenge: new Uint8Array(32),
//                 allowCredentials: [{
//                     type: "public-key",
//                     id: new Uint8Array(32),
//                     transports: ["internal"]
//                 }],
//                 userVerification: "required",
//                 timeout: 10000
//             };
//             const credentials = await navigator.credentials.get({ publicKey });
//             const data = {
//                 id: credentials.id,
//                 rawId: credentials.rawId,
//                 response: {
//                     clientDataJSON: credentials.response.clientDataJSON,
//                     authenticatorData: credentials.response.authenticatorData,
//                     signature: credentials.response.signature,
//                     userHandle: credentials.response.userHandle
//                 },
//                 username: username
//             };
//             const response = await fetch("/login", {
//                 method: "POST",
//                 body: JSON.stringify(data)
//             });
//             const json = await response.json();
//             if (json.status === "success") {
//                 setStatus("Login Successful");
//             } else {
//                 setStatus("Login Failed");
//             }
//         } catch (error) {
//             setStatus("Login Failed: " + error);
//         }
//     };

//     return (
//         <div>
//             <form className={classes.root} noValidate autoComplete="off">
//                 <TextField
//                     id="username"
//                     label="Username"
//                     variant="outlined"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </form>
//             <Button variant="contained" color="primary" onClick={handleLogin}>
//                 Login with WebAuthn
//             </Button>
//             <p>{status}</p>


//             continue the remaining code
//             Sure, here is the remaining code to complete the Login.js component:

//             Copy code
//         </div>
//     );
// }
// Create a new component for the registration page:
// Copy code
// src / components / Registration.js
// Add the following code to the Registration.js file:
// Copy code
// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& > *": {
//             margin: theme.spacing(1),
//             width: "25ch",
//         },
//     },
// }));

// export default function Registration() {
//     const classes = useStyles();
//     const [status, setStatus] = useState("");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");

//     const handleRegistration = async () => {
//         try {
//             const publicKey = {
//                 rp: {
//                     name: "Example RP"
//                 },
//                 user: {
//                     id: new Uint8Array([1, 2, 3]),
//                     name: email,
//                     displayName: username
//                 },
//                 challenge: new Uint8Array([1, 2, 3]),
//                 pubKeyCredParams: [{
//                     alg: -7,
//                     type: "public-key"
//                 }]
//             };
//             const credentials = await navigator.credentials.create({ publicKey });
//             const data = {
//                 id: credentials.id,
//                 rawId: credentials.rawId,
//                 response: {
//                     clientDataJSON: credentials.response.clientDataJSON,
//                     attestationObject: credentials.response.attestationObject
//                 },
//                 username: username,
//                 email: email
//             };
//             const response = await fetch("/register", {
//                 method: "POST",
//                 body: JSON.stringify(data)
//             });
//             const json = await response.json();
//             if (json.status === "success") {
//                 setStatus("Registration Successful");
//             } else {
//                 setStatus("Registration Failed");
//             }
//         } catch (error) {
//             setStatus("Registration Failed: " + error);
//         }
//     };

//     return (
//         <div>
//             <form className={classes.root} noValidate autoComplete="off">
//                 <TextField
//                     id="username"
//                     label="Username


// continue the remaining code 
// Sure, here is the remaining code to complete the Registration.js component:

// Copy code
//           variant="outlined"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//         />
//                 <TextField
//                     id="email"
//                     label="Email"
//                     variant="outlined"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </form>
//             <Button variant="contained" color="primary" onClick={handleRegistration}>
//                 Register with WebAuthn
//             </Button>
//             <p>{status}</p>
//         </div>
//     );
// }
// In the src / App.js file, import the Login and Registration components and add them to the routes using react - router - dom:
// Copy code
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Registration from "./components/Registration";

// function App() {
//     return (
//         <Router>
//             <div>
//                 <Route exact path="/" component={Login}


//                     continue the remaining part
//                     Sure, here's the remaining code to complete the App.js file:

//                 Copy code
//         />
//                 <Route path="/register" component={Registration} />
//             </div>
//         </Router>
//     );
// }

// export default App;
// Start the development server by running npm start.The application should now be running on http://localhost:3000.
// Please note that this is just a simple example, in a real - world application, you will have to handle more edge cases and security aspects, also you should use a more complex and a more secure way to generate and store the public / private keys.Additionally, you should also handle the user's session and the communication between the client and the server.

// Also, you should use a real endpoint for the registration and login instead of using the / register and / login that I used in the example.

// You can also use a library like webauthn - js to make it easy to work with WebAuthn.