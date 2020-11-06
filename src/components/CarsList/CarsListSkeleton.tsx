import React from 'react'
import { useStyles } from './CarsList.styles'
import {CarItemSkeleton} from "../CarItem/CarItemSkeleton";

export const CarsListSkeleton = () => {
    const classes = useStyles();
    const cars = Array.from(Array(10).keys())
    return <ul className={classes.list}>
            {
                cars.map((_, i) => <li key={i}>
                    <CarItemSkeleton />
                </li>)
            }
        </ul>
}