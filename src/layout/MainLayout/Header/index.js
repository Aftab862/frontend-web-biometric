import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, FormControl, Typography } from '@mui/material';
import '../../../index.css';
// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from 'store/actions';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const theme = useTheme();
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const form = useRef()
    const [status, setstatus] = useState('')

    setTimeout(() => {
        setstatus(localStorage.getItem("status"))
    }, 3000);
    useEffect(() => {
    }, [status]);


    const handleLogout = async () => {
        // console.log('Logout');
        localStorage.removeItem('IdToken');
        localStorage.removeItem('rcet-userId');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('status');


        dispatch(Actions.logout());
        navigate('/');
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>


            {/* header search */}
            {/* <SearchSection /> */}
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {

                status == "False" ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="/biometric">
                            <h3 className="blink">Verification Required</h3>
                        </Link>

                    </Box>
                ) : (
                    <Box sx={{ flexGrow: 1 }}>
                        <p className="dontblink">
                            {currentMonth} {currentDate.getDate()}, {currentYear}
                        </p>
                    </Box>
                )

            }
            {/* notification & profile */}
            {/* <NotificationSection /> */}
            {/* <ProfileSection /> */}
            <div class="dropdown">
                <button class="dropdown-toggle">{localStorage.getItem('username')}</button>
                <ul class="dropdown-menu">
                    <li>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>


        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;