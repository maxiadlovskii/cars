import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useImageLoader } from '../../hooks'
import { useStyles } from './Image.styles'

export const Image = ({ src, width }: { src: string, width?: number | string}) => {
    const [isLoaded] = useImageLoader(src);
    const classes = useStyles({ isLoaded, src, width })

    return <div className={classes.image} >{
        !isLoaded && <Skeleton className={classes.loader} animation="wave" variant="rect" />
    }</div>
};