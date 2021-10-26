import React from 'react'
import {
    BrowserRouter as Router,
    Switch as SwitchRoute,
    Route,
    Redirect
} from "react-router-dom";
import {ContextApp, initialState, reducerApp} from "./reducer.js";
import themeDefault from './themes/theme'
import themeDark from './themes/themeDark'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import AppBar from './components/AppBar'
import {ThemeProvider} from "@material-ui/core/styles"
import CustomComponent from "./components/CustomComponent";
import Home from "./pages/Home"
import AccessGroups from "./pages/AccessGroups";
import Work from "./pages/Work";
import Demo from "./pages/Demo";

export default function App() {
    const [state, dispatch] = React.useReducer(reducerApp, initialState);

    return (
        <ContextApp.Provider value={{state, dispatch}}>
            <ThemeProvider theme={state.theme ? themeDefault : themeDark}>
                <CssBaseline/>
                <Router>
                    <Container maxWidth="lg">
                        <AppBar/>
                        <CustomComponent/>
                        <SwitchRoute>
                            <Route exact path="/">
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <Redirect to="/groups"/>
                            </Route>
                            <Route exact path="/groups">
                                <AccessGroups/>
                            </Route>
                            <Route path="/groups/:group">
                                <Work/>
                            </Route>
                            <Route path="/reports">
                            </Route>
                            <Route path="/home">
                                <Home/>
                            </Route>
                            <Route path="/demo">
                                <Demo/>
                            </Route>
                        </SwitchRoute>
                    </Container>
                </Router>
            </ThemeProvider>
        </ContextApp.Provider>
    )
}
