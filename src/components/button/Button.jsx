import React, { memo } from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = memo(
  ({ classStyle = "", onClickButton, children, ...otherProp }) => {
    return (
      <button className={`btn ${classStyle}`} onClick={onClickButton}>
        {children}
      </button>
    );
  }
);

export const OutlineButton = memo(
  ({ classStyle = "", onClickButton, children, ...otherProp }) => {
    return (
      <button className={`btn-outline ${classStyle}`} onClick={onClickButton}>
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  classStyle: PropTypes.string,
  onClickButton: PropTypes.func,
};

export default Button;
