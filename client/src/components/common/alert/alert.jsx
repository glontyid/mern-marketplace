import React from 'react';
import './alert.scss';

const Alert = ({text, activePopup}) => {
  return(
    <div className={activePopup ? 'alert alert__active' : 'alert'}>{text}</div>
  )
}

export default Alert;