import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useFetch, useQuery} from "../../hooks";
import {getCarsData, getColors, getManufactures } from "../../api/cars";
import {CarFilter} from "../../interfaces/api";
import Pagination from '@material-ui/lab/Pagination';
import { CarItem, CarsFilter } from '../'
import {Car} from "../../interfaces/cars";
import { useStyles } from './CarsList.styles'
import { CarsListSkeleton } from "./CarsListSkeleton";

export const CarsList = () => {
    const classes = useStyles();
    const { query: { p = 1, manufacturer = '', color = '' }, addQuery } = useQuery()

    const [currentPage, setCurrentPage] = useState(Number(p))
    const [filters, setFilters] = useState({ manufacturer, color } as { manufacturer: string, color: string })

    const [ { isFetching: fetchingCars,  data: { cars, totalPageCount } }, fetchData ] = useFetch(getCarsData)
    const [ { isFetching: fetchingColors, data: { colors }}, fetchColors] = useFetch(getColors)
    const [ { isFetching: fetchingManufactures, data: { manufacturers }}, fetchManufactures ] = useFetch(getManufactures)

    const isFetching = useMemo(()=> fetchingCars || fetchingColors || fetchingManufactures, [
        fetchingCars, fetchingColors, fetchingManufactures
    ])

    const getData = useCallback((filers: CarFilter)=>{
        fetchData({query: filers })
    }, [ fetchData ])

    const handlePaginationChange = useCallback((_, page)=>{
        setCurrentPage(page)
    }, [setCurrentPage])

    const handleFilterChange = useCallback((filters)=>{
        setCurrentPage(1)
        setFilters(filters)
    }, [ setFilters, setCurrentPage ])

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

    useEffect(() => {
        addQuery({ p: `${currentPage}`, ...filters })
    }, [ filters, currentPage, addQuery ])

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
        <Pagination page={currentPage} disabled={isFetching} count={totalPageCount}  color="primary" onChange={handlePaginationChange}/>
    </section>
}