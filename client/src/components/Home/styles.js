import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    background: 'rgba(0, 0, 0, 0.2)',
    border: '2px #DCCA87 solid',
    borderRadius: 4,
    marginBottom: '1rem',
    marginTop: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    background: 'rgba(0, 0, 0, 0.2)',
    border: '2px #DCCA87 solid',
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
