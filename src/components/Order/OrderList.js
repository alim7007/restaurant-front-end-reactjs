import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import Table from '../layouts/Table'
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

const OrderList = (props) => {
    const { setOrderId, setOrderListVisibility } = props
    const [orderList, setorderList] = useState([])

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll().then(res => {
            setorderList(res.data)
        }).catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id)
        setOrderListVisibility(false)
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order No</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Payed with</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderList.map(item => (
                    <TableRow key={item.orderMasterId}>
                        <TableCell onClick={e => showForUpdate(item.orderMasterId)}>{item.orderNumber}</TableCell>
                        <TableCell onClick={e => showForUpdate(item.orderMasterId)}>{item.customerId}</TableCell>
                        <TableCell onClick={e => showForUpdate(item.orderMasterId)}>{item.pMethod}</TableCell>
                        <TableCell onClick={e => showForUpdate(item.orderMasterId)}>{item.gTotal}</TableCell>
                        <TableCell><DeleteOutlineTwoToneIcon color='secondary' /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrderList
