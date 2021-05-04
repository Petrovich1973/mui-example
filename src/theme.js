import {red} from '@material-ui/core/colors'
import {createMuiTheme} from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3a4886'
        },
        secondary: {
            main: '#d1ae39'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#f2f2f2'
        }
    }
})

export default theme