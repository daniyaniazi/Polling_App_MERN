import React, { Fragment } from "react";
import { connect } from "react-redux";
import store from "../store";


const ErrorMessage = ({ error }) => {

    return (< Fragment >
        {
            error && <div className={error.message !== null ? "ErrorMessage" : "noError"}>{error.message}</div>
        }
    </Fragment >)
};

export default connect((store) =>
    ({ error: store.error })
)(ErrorMessage)