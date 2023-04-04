/* eslint-disable */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import pic from 'assets/images/user.png';
import { useAuth0 } from '@auth0/auth0-react';

function VerifyPensioner() {

    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
        useAuth0();


    if (isAuthenticated) {
        return (
            <div>
                verified
            </div>
        );
    }


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
