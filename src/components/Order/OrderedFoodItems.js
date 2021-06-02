import React from 'react'
import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, makeStyles } from '@material-ui/core'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { roundTo2DecimalPoints } from '../utils';

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#e3e3e3',
        borderRadius: 8,
        "& .MuiButtonBase-root": {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        "& button:nth-child(2)": {
            fontSize: '1.2em',
            color: '#000'
        },
    },
    deleteButton: {
        display: 'none',
        "& .MuiButtonBase-root": {
            color: '#e81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    },
    listRoot: {
        overflow: 'auto'
    }
}))

const OrderedFoodItems = (props) => {
    const { values, setValues, removeFoodItem } = props
    const classes = useStyles()
    let orderedFoodItems = values.orderDetails

    const updateQuantity = (idx, value) => {
        let x = { ...values }
        let foodItem = x.orderDetails[idx]
        if (foodItem.quantity + value > 0) {
            foodItem.quantity += value
            setValues({ ...x })
        }
    }

    return (
        <List className={classes.listRoot}>
            {orderedFoodItems.length == 0 ?
                <ListItem>
                    <ListItemText
                        primary="Please select food items"
                        primaryTypographyProps={{
                            style: {
                                textAlign: 'center',
                                fontStyle: 'italic'
                            }
                        }}
                    />
                </ListItem>
                : orderedFoodItems.map((item, i) => (
                    <Paper key={i} className={classes.paperRoot}>
                        <ListItem>
                            <ListItemText
                                primary={item.foodItemName}
                                primaryTypographyProps={{
                                    component: 'h1',
                                    style: {
                                        fontWeight: '500',
                                        fontSize: '1.2em'
                                    }
                                }}
                                secondary={
                                    <>
                                        <ButtonGroup className={classes.buttonGroup} size='small'>
                                            <Button onClick={e => updateQuantity(i, -1)} >-</Button>
                                            <Button disabled >{item.quantity}</Button>
                                            <Button onClick={e => updateQuantity(i, +1)}>+</Button>
                                        </ButtonGroup>
                                        <span className={classes.totalPerItem}>{'$' + roundTo2DecimalPoints(item.quantity * item.foodItemPrice)}</span>
                                    </>
                                }
                                secondaryTypographyProps={{
                                    component: "div"
                                }}
                            />
                            <ListItemSecondaryAction className={classes.deleteButton} >
                                <IconButton disableRipple onClick={e => removeFoodItem(i, item.orderDetailsId)} >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))
            }
        </List >
    )
}

export default OrderedFoodItems
