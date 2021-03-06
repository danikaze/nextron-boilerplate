import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '@components/Link';

const useStyles = makeStyles((theme: Theme) => {
  // tslint:disable: no-magic-numbers
  return createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  });
});

/*
 * To be removed in the real app,
 * this just tests that all the constants are accessible
 */
function printBuildConstants() {
  // tslint:disable: no-any object-literal-shorthand no-console
  const data: { [key: string]: any } = {
    GLOBAL_EXAMPLE: GLOBAL_EXAMPLE,
    GLOBAL_SECRET_EXAMPLE: GLOBAL_SECRET_EXAMPLE,
    BUILD_ID: BUILD_ID,
    IS_SERVER: IS_SERVER,
    IS_PRODUCTION: IS_PRODUCTION,
    PACKAGE_NAME: PACKAGE_NAME,
    PACKAGE_VERSION: PACKAGE_VERSION,
    COMMIT_HASH: COMMIT_HASH,
    COMMIT_HASH_SHORT: COMMIT_HASH_SHORT,
  };

  if (IS_SERVER) {
    data.RENDERER_SERVER_EXAMPLE = RENDERER_SERVER_EXAMPLE;
    data.RENDERER_SERVER_SECRET_EXAMPLE = RENDERER_SERVER_SECRET_EXAMPLE;
  } else {
    data.RENDERER_CLIENT_EXAMPLE = RENDERER_CLIENT_EXAMPLE;
    data.RENDERER_CLIENT_SECRET_EXAMPLE = RENDERER_CLIENT_SECRET_EXAMPLE;
  }

  console.table(data);
}

const Home = () => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  printBuildConstants();

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          with Nextron
        </Typography>
        <img src="/images/logo.png" />
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Super Secret Password
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
