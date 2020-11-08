import React from "react";
import { useStyles } from "./CarsList.styles";
import { CarItemSkeleton } from "../CarItem/CarItemSkeleton";

export const CarsListSkeleton: React.FC = () => {
  const classes = useStyles();
  const cars = Array.from(Array(10).keys());
  return (
    <ul className={classes.list}>
      {cars.map((i) => (
        <li key={`_skeleton_${i}`}>
          <CarItemSkeleton />
        </li>
      ))}
    </ul>
  );
};
