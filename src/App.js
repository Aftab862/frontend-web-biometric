import { useSelector } from 'react-redux';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// Auth Protected HOD
import AuthProtected from 'config/AuthProtected';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <AuthProtected>

                            <Routes />
                        </AuthProtected>
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </>

    );
};

export default App;
