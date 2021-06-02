import React, { useState, useEffect } from 'react'
import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import Form from '../layouts/Form'
import { Button, Select, Input } from '../controls'
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { roundTo2DecimalPoints } from '../utils';
import Popup from '../layouts/Popup';
import OrderList from './OrderList';
import Notification from '../layouts/Notification'

const useStyles = makeStyles(theme => ({
    adornment: {
        "& .MuiTypography-root": {
            color: '#f3b33d',
            fontWeight: "bolder",
            fontSize: '1.5rem'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d'
        }
    }
}))

const OrderForm = (props) => {

    const { values, setValues, setErrors, resetFormControls, errors, handleInputChange } = props
    const classes = useStyles()
    const [customerList, setCustomerList] = useState([])
    const [orderListVisibility, setOrderListVisibility] = useState(false)
    const [orderId, setOrderId] = useState(0)
    const [notify, setNotify] = useState({ isOpen: false })
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll().then((res) => {
            console.log(res.data)
            let customerList = res.data.map((item, key) => ({
                id: item.customerID,
                title: item.customerName
            }))
            customerList = [{ id: 0, title: 'Select' }].concat(customerList)
            setCustomerList(customerList)
        }).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.foodItemPrice)
        }, 0)
        setValues({ ...values, gTotal: roundTo2DecimalPoints(gTotal) })
    }, [JSON.stringify(values.orderDetails)])

    const validateForm = () => {
        let temp = {}
        temp.customerId = values.customerId != 0 ? "" : "This Field is required"
        temp.pMethod = values.pMethod != 'none' ? "" : "This Field is required"
        temp.orderDetails = values.orderDetails.length != 0 ? "" : "This Field is required"
        setErrors({ ...temp })
        return Object.values(temp).every(x => x === '')
    }

    const submitOrder = e => {
        e.preventDefault()
        if (validateForm()) {
            createAPIEndpoint(ENDPOINTS.ORDER).create(values).then((res) => {
                resetFormControls()
                setNotify(({ isOpen: true, message: 'New order is created ' }))
            }).catch((err) => console.log(err))
        }
    }
    useEffect(() => {
        if (orderId == 0) resetFormControls()
        else { }
        // createAPIEndpoint(ENDPOINTS.ORDER).fetchById(orderId).then(res => {
        //     // setValues(res.data)
        //     // console.log(res)
        // }).catch(err => console.log(err))
    }, [orderId])

    const resetForm = () => {
        resetFormControls()
    }
    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container >
                    <Grid item xs={6} >
                        <Input
                            // disabled
                            label="Order Number"
                            name="orderNumber"
                            value={values.orderNumber}
                            className={classes.adornment}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >#</InputAdornment>
                            }}
                        />
                        <Select
                            label='customer'
                            name='customerId'
                            value={values.customerId}
                            onChange={handleInputChange}
                            options={customerList}
                            error={errors.customerId}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Select
                            label='Payment Method'
                            name='pMethod'
                            error={errors.pMethod}
                            value={values.pMethod}
                            onChange={handleInputChange}
                            options={[
                                { id: 'none', title: 'Select' },
                                { id: 'Cash', title: 'Cash' },
                                { id: 'Card', title: 'Card' },
                            ]}
                        />
                        <Input
                            // disabled
                            label="Grand Total"
                            name="gTotal"
                            value={values.gTotal}
                            className={classes.adornment}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >$</InputAdornment>
                            }}
                        />
                        <ButtonGroup className={classes.submitButtonGroup} >
                            <MuiButton
                                size='large'
                                type='submit'
                                endIcon={<RestaurantMenuIcon />}>

                                Submit
                        </MuiButton>
                            <MuiButton
                                size='small'
                                onClick={resetForm}
                                startIcon={<ReplayIcon />} />
                        </ButtonGroup>
                        <Button size="large"
                            startIcon={<ReorderIcon />}
                            onClick={() => { setOrderListVisibility(true) }}
                        >Orders</Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup
                title='List of Orders'
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}
            >
                <OrderList {...{ setOrderId, setOrderListVisibility }} />
            </Popup>
            <Notification {...{ notify, setNotify }} />
        </>
    )
}

export default OrderForm
