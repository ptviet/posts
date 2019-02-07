import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class Error extends React.Component {
  static getInitialProps({ res, err }: any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    // @ts-ignore
    const { statusCode } = this.props;
    return (
      <Typography variant='caption' color='error'>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </Typography>
    );
  }
}
