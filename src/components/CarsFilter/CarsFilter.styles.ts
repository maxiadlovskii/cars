import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    carColor: ({
        width: 25,
        height: 25,
        borderRadius: '50%',
        marginRight: theme.spacing(1)
    }),
    selectInput: {
        display: 'flex',
        padding: theme.spacing(1)
    },
    container: {
        height: 70,
        boxSizing: 'border-box'
    }
}));