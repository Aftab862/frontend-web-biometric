// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';
import { getAllowedRoutes } from 'utils/AuthRoles';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    // const role = useSelector((state) => state.user.role);
    const role = localStorage.getItem("role")
    console.log("hello abc", role)
    // var role = "admin"
    // console.log('nav items ---> ', { ...menuItem.items[0], children: getAllowedRoutes(menuItem.items[0].children, [role]) });
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={{ ...item, children: getAllowedRoutes(item.children, [role]) }} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
    return <>{navItems}</>;
};

export default MenuList;
