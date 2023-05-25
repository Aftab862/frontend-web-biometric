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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
      cardContainer: {
            display: 'flex',
            justifyContent: 'space-around',
      },
});
function VerifyPensioner() {
      const classes = useStyles();
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


      return (
            <>

                  <AppBar className="mt-4" position="static">
                        <Toolbar className="h-32">
                              <Typography variant="h2">
                                    <div className="text-white">Video Meet  </div>
                              </Typography>
                        </Toolbar>
                  </AppBar>

                  <Box>
                        <Card className={classes.cardContainer}>

                              <Button className='p-3' onClick={startButtonHandler}>Start Meeting</Button>
                              <Button className='p-3' onClick={endButtonHandler}>End Meeting</Button>

                        </Card>
                  </Box>


            </>

      )
}

export default VerifyPensioner;
