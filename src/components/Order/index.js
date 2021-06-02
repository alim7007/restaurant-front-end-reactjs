import { Grid } from '@material-ui/core'
import React from 'react'
import useForm from '../hooks/useForm'
import OrderForm from './OrderForm'
import SearchFoodItems from './SearchFoodItems'
import OrderedFoodItems from './OrderedFoodItems'

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString()

const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds: "",
    orderDetails: []
})

const Order = () => {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject)

    const addFoodItem = foodItem => {
        let x = {
            orderMasterId: values.orderMasterId,
            orderDatilId: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.price,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values, orderDetails: [...values.orderDetails, x]
        })
    }

    const removeFoodItem = (index, id) => {
        let x = { ...values }
        x.orderDetails = x.orderDetails.filter((_, i) => i != index)
        setValues({ ...x })
    }


    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <OrderForm {...{ values, setValues, setErrors, errors, resetFormControls, handleInputChange }} />
            </Grid>
            <Grid item xs={6}>
                <SearchFoodItems {...{ addFoodItem, orderedFoodItems: values.orderDetails, }} />
            </Grid>
            <Grid item xs={6}>
                <OrderedFoodItems {...{ values, setValues, removeFoodItem }} />
            </Grid>
        </Grid>
    )
}

export default Order
