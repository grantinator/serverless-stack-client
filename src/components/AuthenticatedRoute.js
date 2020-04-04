import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, appProps, ... rest }) {
    /* This function takes a component C, and appProps which contains auth status.
        if The user is authenticated, then render the passed in component. Otherwise,
        redirect to login page */ 
    return (
        <Route
            {...rest}
            render={props =>
                appProps.isAuthenticated
                ? <C {...props} {...appProps} />
                : <Redirect
                    to={`/login?redirect=${props.location.pathname}$props.location.search}`}
                />}
            />
        );
}