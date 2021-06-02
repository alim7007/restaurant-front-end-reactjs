import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#e3e3e3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000'
        },
        '& .MuiButtonBase-root': {
            display: 'none',
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
        },

    }
}))


const SearchFoodItems = (props) => {
    const { addFoodItem, orderedFoodItems } = props


    const [foodItems, setFoodItems] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const classes = useStyles()

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll().then(res => {
            setFoodItems(res.data)
            setSearchList(res.data)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...foodItems]
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        })
        setSearchList(x)
    }, [searchKey, orderedFoodItems])

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    className={classes.searchInput}
                    placeholder='Search food items' />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {searchList.map((item, i) => (
                    <ListItem key={i}>
                        <ListItemText
                            primary={item.foodItemName}
                            secondary={"$" + item.price} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={e => addFoodItem(item)}>
                                <PlusOneIcon />
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default SearchFoodItems
