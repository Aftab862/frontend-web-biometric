// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //

const chartData = {
    type: 'area',
    height: 95,
    options: {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        tooltip: {
            fixed: {
                enabled: true
            },
            x: {
                show: true
            },
            y: {
                title: 'Ticket '
            },
            marker: {
                show: true
            }
        }
    },
    series: [
        {
            data: [10000, 20000, 30000, 40000, 50000]
        }
    ]
};

export default chartData;
