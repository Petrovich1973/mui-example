import {red} from '@material-ui/core/colors'
import {createTheme } from '@material-ui/core/styles'

// A custom theme for this app
const themeDefault = createTheme({
    palette: {
        type: 'light',
        typography: {
            color: "#689f38",
            fontSize: "24px"
        },
        primary: {
            main: '#52865b',
            contrastText: '#dde4f3'
        },
        secondary: {
            main: '#d1ae39',
            contrastText: '#3d3d3d'
        },
        success: {
            light: '#af8383',
            main: "#7b9c5e",
            dark: '#57ab9d',
            default: '#5a64ab'
        },
        error: {
            main: red.A700
        },
        background: {
            paper: '#ffffff',
            default: '#f2f2f2'
        },
        text: {
            default: '#30de1a',
            main: "#689f38",
            primary: '#232323',
            secondary: '#3f7793'
        }
    }
})

export default themeDefault
