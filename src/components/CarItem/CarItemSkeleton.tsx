import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useStyles } from './CarItem.styles'
import Skeleton from '@material-ui/lab/Skeleton';

export const CarItemSkeleton = () => {
    const classes = useStyles();

    return <Card className={classes.root}>
        <CardHeader
            title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
        <CardActions disableSpacing>
            <Skeleton animation="wave" height={10} width="40%" />
        </CardActions>
    </Card>
}