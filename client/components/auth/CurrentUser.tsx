import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../lib/Queries";

const CurrentUser = (props: any) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => {
      if (payload.error) {
        return (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress color="primary" />
          </div>
        );
      }
      return props.children(payload);
    }}
  </Query>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default CurrentUser;
