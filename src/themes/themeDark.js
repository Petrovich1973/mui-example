import {red, purple} from '@material-ui/core/colors'
import {createTheme} from '@material-ui/core/styles'

// A custom theme for this app
const themeDark = createTheme({
    palette: {
        type: 'dark',
        typography: {
            color: "#689f38"
        },
        primary: {
            main: '#252628',
            contrastText: '#a8a8a8'
        },
        secondary: {
            main: '#6b7373',
            contrastText: '#000000'
        },
        success: {
            light: '#e8a8a8',
            main: "#74ff00",
            dark: '#00ffd8',
            default: '#0027ff'
        },
        error: {
            main: red.A400
        },
        background: {
            paper: '#2b2b2b',
            default: '#1f1f1f'
        },
        text: {
            default: '#30de1a',
            main: "#689f38",
            primary: '#ababab',
            secondary: '#26affa'
        }
    },
    overrides: {
        MuiButton: {
            containedPrimary: purple
        }
    },
    props: {
        MuiButton: {
            disableRipple: true,
            variant: "contained"
        }
    }
})

export default themeDark