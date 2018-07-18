import React from 'react';

// redux
import { connect } from 'react-redux';

// react-router
import { Route, Redirect, withRouter, } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authReducer, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authReducer.user.isLoggedIn ? (
				<React.Fragment>
					<Component {...props} />
				</React.Fragment>
			) : (
					<React.Fragment>
						<Redirect
							to={{
								pathname: "/",
								state: { from: props.location }
							}}
						/>
					</React.Fragment>
				)
		}
	/>
);

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));