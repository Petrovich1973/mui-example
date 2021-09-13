import React from 'react'
import {
    BrowserRouter as Router,
    Switch as SwitchRoute,
    Route,
    Redirect
} from "react-router-dom";
import themeDefault from './themes/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import AppBar from './components/AppBar'
import {ThemeProvider} from "@material-ui/core/styles"
import CustomComponent from "./components/CustomComponent";
import Home from "./pages/Home"
import Users from "./pages/Users";
import Work from "./pages/Work";

export default function App() {

    return (
        <ThemeProvider theme={themeDefault}>
            <CssBaseline/>
            <Router>
                <Container maxWidth="lg">
                    <AppBar/>
                    <CustomComponent/>
                    <SwitchRoute>
                        <Route exact path="/">
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Redirect to="/home" />
                        </Route>
                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route path="/users/:user">
                            <Work/>
                        </Route>
                        <Route path="/reports">

                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                    </SwitchRoute>
                </Container>
            </Router>
        </ThemeProvider>
    )
}
