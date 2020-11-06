import React, {useCallback} from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from './CarsFilter.styles'
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Colors, Manufacturers} from "../../interfaces/cars";
import Grid from "@material-ui/core/Grid";

export const CarsFilter = ({ colors, manufacturer, color, manufacturers, isFetching, onChange }: {
    colors: Colors,
    manufacturers: Manufacturers,
    isFetching: boolean,
    onChange: (filter: { [key: string]: string }) => void,
    manufacturer: string, color: string
}) => {
    const classes = useStyles()
    const handleChange = useCallback((event: React.ChangeEvent<{ value: unknown, name?: string }>) => {
        const { value, name } = event.target
        onChange({ [name as string]: value as string })
    }, [onChange])

    return <Grid className={classes.container} container spacing={2} direction="row" alignItems="stretch" justify="center">
            <Grid item>
                <InputLabel id="color-label">Color:</InputLabel>
                <Select
                    labelId="color-label"
                    id="color"
                    name="color"
                    defaultValue={color}
                    onChange={handleChange}
                    input={<Input />}
                    autoWidth={true}
                    disabled={isFetching}
                >
                    <MenuItem value={''} style={{ color: 'silver' }}>
                        Select none
                    </MenuItem>
                    {
                        colors && colors.map(color=><MenuItem key={color} value={color}>
                            <div className={classes.selectInput}>
                                <Paper elevation={6} className={classes.carColor} style={{ backgroundColor: color }} />
                                <Typography>{color}</Typography>
                            </div>
                        </MenuItem>)
                    }
                </Select>
                    </Grid>
            <Grid item>
                <InputLabel id="color-label">Manufacture:</InputLabel>
                <Select
                    labelId="manufacturer-label"
                    id="manufacturer"
                    name="manufacturer"
                    defaultValue={manufacturer}
                    onChange={handleChange}
                    input={<Input />}
                    autoWidth={true}
                    disabled={isFetching}
                >
                    <MenuItem value={''} style={{ color: 'silver' }}>
                        Select none
                    </MenuItem>
                    {
                        manufacturers && manufacturers.map(( { name })=><MenuItem key={name} value={name}>
                            <div className={classes.selectInput}>
                                <Typography>{name}</Typography>
                            </div>
                        </MenuItem>)
                    }
                </Select>
            </Grid>
        </Grid>
}