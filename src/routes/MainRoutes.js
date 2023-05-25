import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { roles } from 'config/roles';
import EditProfile from 'views/EditProfile';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// all pages routing
const AddEmployee = Loadable(lazy(() => import('views/AddNewEmployee/AddNewEmployee')));
const ViewEmployees = Loadable(lazy(() => import('views/ViewEmployees/ViewEmployees')));
const VerifyPensioner = Loadable(lazy(() => import('views/VerifyPensioner/VerifyPensioner')));
const SearchRecords = Loadable(lazy(() => import('views/SearchRecords/SearchRecords')));
const SalarySlip = Loadable(lazy(() => import('views/salarySlip/salarySlip')));
const GpFund = Loadable(lazy(() => import('views/gpFund/gpFund')));
const VideoMeet = Loadable(lazy(() => import('views/VideoMeeting/VideoMeeting')));
const Adddata = Loadable(lazy(() => import('views/AddData/Adddata')));
const AddAllowance = Loadable(lazy(() => import('views/AddAllowance/AddAllowance')));
// ==============================|| MAIN ROUTING ||============================== //
// console.log("roles", roles)



const MainRoutes = {
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            // permission: [roles.admin],
            element: <DashboardDefault />
        },
        {
            path: '/addemployee',
            // permission: [roles.admin],

            element: <AddEmployee />
        },
        {
            path: '/employee',
            // permission: [roles.admin],

            element: <AddEmployee />
        },
        {
            path: '/employee/:id',
            // permission: [roles.admin],

            element: <AddEmployee />
        },
        {
            path: '/viewemployees',
            // permission: [roles.admin],
            element: <ViewEmployees />
        },
        // {
        //     path: '/add-allowance',
        //     // permission: [roles.admin],
        //     element: <AddAllowance />
        // },

        {
            path: '/salary-slip',
            // permission: [roles.employee],

            element: <SalarySlip />
        },

    
        {
            path: '/search-records',
            // permission: [roles.employee],

            element: <SearchRecords />
        },

        {
            path: '/records',
            // permission: [roles.admin],

            element: <GpFund />
        },
        {
            path: '/verifypensionar',
            // permission: [roles.admin],

            element: <VideoMeet />
        },
        {
            path: '/increments',
            element: <Adddata />

        },
        {
            path: '/edit-profile',
            element: <DashboardDefault />

        },
        {
            path: '/biometric',
            element: <VerifyPensioner />
        }

    ]
};

export default MainRoutes;
