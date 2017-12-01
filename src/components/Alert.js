import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  return (
    <div className={props.alertStyle}>
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>  
      <strong>    Oops!</strong>  {props.message}
    </div>
  );
}

Alert.propTypes = {
  alertStyle: PropTypes.string,
  message: PropTypes.string
};

export default Alert;