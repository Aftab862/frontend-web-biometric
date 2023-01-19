import React, { useRef, useState } from 'react';
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




