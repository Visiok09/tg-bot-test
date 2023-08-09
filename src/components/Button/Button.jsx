import React from 'react';
import Style from './Button.module.css';

const Button = (props) => {
  return <button {...props} className={Style.button} />;
};

export default Button;
