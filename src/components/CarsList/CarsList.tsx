import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useFetch} from "../../hooks";
import {getCarsData, getColors, getManufactures } from "../../api/cars";
import {CarFilter} from "../../interfaces/api";
import Pagination from '@material-ui/lab/Pagination';
import { CarItem, CarsFilter } from '../'
import {Car} from "../../interfaces/cars";
import { useStyles } from './CarsList.styles'
import { CarsListSkeleton } from "./CarsListSkeleton";

export const CarsList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({})
    const [ { isFetching: fetchingCars,  data: { cars, totalPageCount } }, fetchData ] = useFetch(getCarsData)
    const [ { isFetching: fetchingColors, data: { colors }}, fetchColors] = useFetch(getColors)
    const [ { isFetching: fetchingManufactures, data: { manufacturers }}, fetchManufactures ] = useFetch(getManufactures)
    const isFetching = useMemo(()=> fetchingCars || fetchingColors || fetchingManufactures, [
        fetchingCars, fetchingColors, fetchingManufactures
    ])
    const classes = useStyles();
    const getData = useCallback((filers: CarFilter)=>{
        return fetchData({query: filers })
    }, [ fetchData ])
    useEffect(()=> {
        fetchColors()
        fetchManufactures()
    }, [ fetchColors, fetchManufactures ])
    useEffect(()=>{
        getData({
            page: currentPage,
            ...filters
        })
    }, [ getData, filters, currentPage ])

    const handlePaginationChange = useCallback((_, page)=>{
        setCurrentPage(page )
    }, [setCurrentPage])
    const handleFilterChange = useCallback((filters)=>{
        setCurrentPage(1)
        setFilters(filters)
    }, [ setFilters, setCurrentPage ])
    return <section className={classes.wrapper}>
        <CarsFilter onChange={handleFilterChange} colors={colors} manufacturers={manufacturers} isFetching={isFetching}/>
            { isFetching ? <CarsListSkeleton />:
                (
                    <ul className={classes.list}>
                        {
                            cars && cars.map((car: Car) => <li key={car.stockNumber}>
                                <CarItem {...car}/>
                            </li>)
                        }
                    </ul>

                )
            }
        <Pagination disabled={isFetching} count={totalPageCount}  color="primary" onChange={handlePaginationChange}/>
    </section>
}