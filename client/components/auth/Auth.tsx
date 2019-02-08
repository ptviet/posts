import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../lib/Queries';

const Auth = (props: any) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => {
      if (payload.loading || payload.error) {
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress color='primary' />
          </div>
        );
      }
      if (payload.data) {
        return props.children(payload);
      }
      return null;
    }}
  </Query>
);

Auth.propTypes = {
  children: PropTypes.func.isRequired
};

export default Auth;
