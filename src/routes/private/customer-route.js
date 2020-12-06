import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';

const CustomerPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, userAccountName } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                userAccountName ? (
					<Redirect to="/schedules" />
				) : isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/signin" />
				)
            }
        />
    );
};

CustomerPrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default CustomerPrivateRoute;