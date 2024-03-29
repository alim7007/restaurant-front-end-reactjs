import React from 'react'
import { FormControl, InputLabel, Select as MySelect, MenuItem, FormHelperText } from '@material-ui/core'

const Select = (props) => {
    const { name, label, value, variant, onChange, options, error = null } = props

    return (
        <FormControl
            variant={variant || 'outlined'}
            {...error && { error: true }}>
            <InputLabel>{label}</InputLabel>
            <MySelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                    ))
                }
            </MySelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select
