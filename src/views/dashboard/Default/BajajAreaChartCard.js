import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/previous-transactions-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({ count }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;
    const orangeDark = theme.palette.secondary[800];



    const dateStr = count?.Date ?? "1-1-1999";
    const [day, monthStr, year] = dateStr.split("-");
    const month = Number(monthStr) - 1; // subtract 1 from month because Date months are 0-indexed

    const dateObj = new Date(year, month, day);
    const formattedDateStr = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // console.log(formattedDateStr); // Output: "April 2023"

    // useEffect(() => {
    //     const newSupportChart = {
    //         ...chartData.options,
    //         colors: [orangeDark],
    //         tooltip: {
    //             theme: 'light'
    //         }
    //     };
    //     ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    // }, [navType, orangeDark]);
    console.log("count", count)
    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                {formattedDateStr??"..."}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {count?.TotalIncome}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Chart {...chartData} /> */}
        </Card>
    );
};

export default BajajAreaChartCard;
