import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EmployeeCard from './EmployeeCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import API from '../../../API/api';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [stats, setStats] = useState({})

    useEffect(() => {
        // if (!localStorage.getItem('IdToken')) {
        //     navigate('/login');
        // }
        setLoading(false);

        const view = async () => {
            // try {
            //     const res = await API.get('/employee/stats', {
            //         headers: {
            //             Authorization: `Bearer ${localStorage.getItem('IdToken')}`
            //         }
            //     });
            //     console.log('response', res.data);
            //     setStats(res.data);
            // } catch (error) {
            //     console.log(error);
            // }
        };
        view();

    }, []);

    return (
        <Grid className="mt-3" container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EmployeeCard count={stats?.totalEmployees} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard count={stats.totalSalaries} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard count={stats.currentEmployees} isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard count={stats.pensioners} isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                   <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> 
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
