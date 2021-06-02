import React from 'react'
import { Button as MyButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiFormControl-root': {
            textTransform: 'none'
        }
    }
}))

const Button = (props) => {
    const { children, color, variant, onClick, className, ...other } = props
    const classes = useStyles()

    return (
        <MyButton
            className={classes.root + ' ' + (className || '')}
            variant={variant || 'contained'}
            color={color || 'default'}
            onClick={onClick}
            {...other}>
            { children}
        </MyButton >
    )
}

export default Button
