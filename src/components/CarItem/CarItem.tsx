import React, {useCallback, useMemo, useState} from 'react'
import {Car} from "../../interfaces/cars";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useStyles } from './CarItem.styles'
import IconButton from '@material-ui/core/IconButton';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SpeedIcon from '@material-ui/icons/Speed';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Image} from "../common/Image";
import {toggleFavorite, isFavorite} from '../../services/favorites'

export const CarItem = ({
                            manufacturerName,
                            modelName,
                            pictureUrl,
                            fuelType,
                            color,
                            stockNumber,
                            mileage: { unit, number }
}: Car) => {
    const [isCarFavorite, setIsCarFavorite] = useState(isFavorite(stockNumber))
    const classes = useStyles({ color });
    const handleFavoriteClick = useCallback(() => {
        toggleFavorite(stockNumber)
        setIsCarFavorite(!isCarFavorite)
    }, [isCarFavorite, stockNumber])

    const favoriteIconColor = useMemo(()=> isCarFavorite ? 'primary' : undefined, [isCarFavorite])
    return <Card className={classes.root} elevation={6}>
        <CardHeader
            title={manufacturerName}
            subheader={`${modelName} (${stockNumber})`}
        />
        <Image src={pictureUrl} width={'100%'}/>
        <CardContent>
            <Grid container direction="row" justify="space-between" alignItems="stretch">
            <Grid item>
                    <ColorLensIcon color="secondary" fontSize={"large"}/>
                    <Paper elevation={6} className={classes.carColor} />
            </Grid>
            <Grid item>
                    <SpeedIcon color="secondary" fontSize={"large"}/>
                    <Typography align="left" variant="h6">{`${number} ${unit}`}</Typography>
            </Grid>
            <Grid item>
                    <LocalGasStationIcon color="secondary" fontSize={"large"}/>
                    <Typography align="left" variant="h6">{fuelType}</Typography>
            </Grid>
            </Grid>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                <FavoriteIcon color={favoriteIconColor}/>
            </IconButton>
        </CardActions>
    </Card>
}