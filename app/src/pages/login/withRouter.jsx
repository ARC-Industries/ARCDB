import { useNavigate } from "react-router";
import React from "react";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();

    return (
        <WrappedComponent
            {...props}
            {...{ navigate }}    
        />
    );
};

export default withRouter;