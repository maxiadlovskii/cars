import React, { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useFetch, useQuery } from "../../hooks";
import { getCarsData, getColors, getManufactures } from "../../api/cars";
import { CarFilter } from "../../interfaces/api";
import { CarItem, CarsFilter } from "..";
import { Car } from "../../interfaces/cars";
import { useStyles } from "./CarsList.styles";
import { CarsListSkeleton } from "./CarsListSkeleton";
import { Query } from "../../interfaces/states";

export const CarsList: React.FC = () => {
  const classes = useStyles();
  const {
    query: { p = 1, manufacturer = "", color = "" },
    addQuery,
  } = useQuery();

  const [currentPage, setCurrentPage] = useState(Number(p));
  const [filters, setFilters] = useState<CarFilter>({ manufacturer, color });

  const [
    {
      isFetching: fetchingCars,
      data: { cars, totalPageCount },
    },
    fetchData,
  ] = useFetch(getCarsData);
  const [
    {
      isFetching: fetchingColors,
      data: { colors },
    },
    fetchColors,
  ] = useFetch(getColors);
  const [
    {
      isFetching: fetchingManufactures,
      data: { manufacturers },
    },
    fetchManufactures,
  ] = useFetch(getManufactures);

  const isFetching = useMemo(
    () => fetchingCars || fetchingColors || fetchingManufactures,
    [fetchingCars, fetchingColors, fetchingManufactures]
  );

  const getData = useCallback(
    (filers: Query) => {
      fetchData({ query: filers });
    },
    [fetchData]
  );

  const handlePaginationChange = useCallback(
    (_, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleFilterChange = useCallback(
    (updatedFilters) => {
      setCurrentPage(1);
      setFilters(updatedFilters);
    },
    [setFilters, setCurrentPage]
  );

  useEffect(() => {
    fetchColors();
    fetchManufactures();
  }, [fetchColors, fetchManufactures]);

  useEffect(() => {
    getData({
      page: `${currentPage}`,
      ...filters,
    });
  }, [getData, filters, currentPage]);

  useEffect(() => {
    addQuery({
      p: `${currentPage}`,
      manufacturer: filters.manufacturer,
      color: filters.color,
    });
  }, [filters, currentPage, addQuery]);

  return (
    <section className={classes.wrapper}>
      <CarsFilter
        onChange={handleFilterChange}
        colors={colors}
        manufacturers={manufacturers}
        isFetching={isFetching}
      />
      {isFetching ? (
        <CarsListSkeleton />
      ) : (
        <ul className={classes.list}>
          {cars &&
            cars.map(
              ({
                manufacturerName,
                modelName,
                pictureUrl,
                fuelType,
                color: carColor,
                stockNumber,
                mileage,
              }: Car) => (
                <li key={stockNumber}>
                  <CarItem
                    stockNumber={stockNumber}
                    mileage={mileage}
                    fuelType={fuelType}
                    color={carColor}
                    manufacturerName={manufacturerName}
                    modelName={modelName}
                    pictureUrl={pictureUrl}
                  />
                </li>
              )
            )}
        </ul>
      )}
      <Pagination
        page={currentPage}
        disabled={isFetching}
        count={totalPageCount}
        color="primary"
        onChange={handlePaginationChange}
      />
    </section>
  );
};
