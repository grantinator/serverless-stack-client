import React from "react";
import { Route, Redirect } from "react-router-dom";


function querystring(name, url = window.location.href) {
    /* Method takes in the querystring param want to read and returns it */
    name = name.replace(/[[]]/g, "\$&");

    const regex = new RegExp("[$&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
    /* Check to ensure that the user is not authenticated before rendering the component
    The redirect component sends the user back to the homepage */
    const redirect = querystring("redirect");

    return (
        <Route
            {...rest}
            render={props => 
                !appProps.isAuthenticated
                ? <C {...props} {...appProps} />
                : <Redirect 
                    to={redirect === "" || redirect === null ? "/" : redirect}
                    />}
            />
    );
}