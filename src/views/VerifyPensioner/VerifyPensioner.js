/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import pic from 'assets/images/user.png';
import verified from 'assets/images/verified.webp';
import { makeStyles } from '@mui/styles';

import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles({
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});
function VerifyPensioner() {
    const classes = useStyles();


    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
        useAuth0();
    const callFrameRef = useRef(null);
    let callFrame = null;

    const startMeeting = async () => {
        if (!callFrame) {
            callFrame = DailyIframe.createFrame({
                url: 'https://aftabahmad.daily.co/SAroom',
                iframeStyle: {
                    position: "absolute",
                    width: "76%",
                    height: "100vh",
                    top: "50%",
                    right: "3%"
                },
            });
            callFrameRef.current = callFrame;

            await callFrame.join();

            // Add event listeners for meeting events
            callFrame.on('left-meeting', () => {
                console.log('User left the meeting');
                endMeeting();
            });
        }
    };

    const endMeeting = () => {
        if (callFrame) {
            callFrame.destroy();
            callFrame = null;
            callFrameRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            endMeeting();
        };
    }, []);

    const startButtonHandler = () => {
        startMeeting();
    };

    const endButtonHandler = () => {
        endMeeting();
    };

    if (isAuthenticated) {
        return (
            <>
                <AppBar className="mt-4" position="static">
                    <Toolbar className="h-32">
                        <Typography variant="h2">
                            <div className="text-white"> Verification Complete</div>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="flex justify-center items-center pt-16">

                    <Card className="justify-center w-96">
                        <CardActionArea>
                            <CardMedia component="img" height="60" image={verified} alt="green iguana" />
                        </CardActionArea>

                        <CardActions>

                            <Button
                                size="small"
                                color="primary"
                                onClick={() => logout({ returnTo: "https://frontend-web-biometric.vercel.app/verify" })}
                            >
                                Again  Verification
                            </Button>

                        </CardActions>
                    </Card>
                </div>
            </>
        );
    } else
        return (
            <>

                <AppBar className="mt-4" position="static">
                    <Toolbar className="h-32">
                        <Typography variant="h2">
                            <div className="text-white"> Pensioner Verification</div>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="flex justify-center items-center pt-16">
                    <Card className="justify-center w-96">
                        <CardActionArea>
                            <CardMedia component="img" height="60" image={pic} alt="green iguana" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Biometric Verification
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click the below button for Verification
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>

                            <Button
                                size="small"
                                color="primary"
                                onClick={loginWithRedirect}
                            >
                                Verify
                            </Button>

                        </CardActions>
                    </Card>
                </div>
            </>
        )
}

export default VerifyPensioner;
