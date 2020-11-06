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
    const { query: { urlPage = 1, manufacturer = '', color = '' }, addQuery } = useQuery()
    const [currentPage, setCurrentPage] = useState(Number(urlPage))
    console.log({currentPage})
    const [filters, setFilters] = useState({ manufacturer, color } as { manufacturer: string, color: string })
    const [ { isFetching: fetchingCars,  data: { cars, totalPageCount } }, fetchData ] = useFetch(getCarsData)
    const [ { isFetching: fetchingColors, data: { colors }}, fetchColors] = useFetch(getColors)
    const [ { isFetching: fetchingManufactures, data: { manufacturers }}, fetchManufactures ] = useFetch(getManufactures)
    const isFetching = useMemo(()=> fetchingCars || fetchingColors || fetchingManufactures, [
        fetchingCars, fetchingColors, fetchingManufactures
    ])
    const classes = useStyles();
    const getData = useCallback((filers: CarFilter)=>{
        fetchData({query: filers })
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
        addQuery({ urlPage: page })
        setCurrentPage(page)
    }, [setCurrentPage, addQuery])
    const handleFilterChange = useCallback((filters)=>{
        setCurrentPage(1)
        addQuery({ urlPage: '1', ...filters })
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
        <Pagination page={currentPage} disabled={isFetching} count={totalPageCount}  color="primary" onChange={handlePaginationChange}/>
    </section>
}