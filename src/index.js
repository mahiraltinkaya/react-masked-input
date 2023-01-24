import React, { cloneElement } from "react";
import useInputMask from "./hooks/useInputMask";
import { PropTypes } from "prop-types";

const MaskedInput = React.forwardRef((props, ref) => {
  const { children, ...others } = props;
  const maskedText = useInputMask();

  return (
    <div>
      {children &&
        cloneElement(props.children, {
          ...others,
          onChange: (e) => {
            others.onChange(maskedText(others.mask, e.target.value));
          },
          value: others.value,
          onFocus: () => {
            if (!others.value) others.onChange(maskedText(others.mask, " "));
          },
        })}

      {!children && (
        <input
          value={others.value}
          {...others}
          onFocus={() => {
            if (!others.value) others.onChange(maskedText(others.mask, " "));
          }}
          onChange={(e) => {
            others.onChange(maskedText(others.mask, e.target.value));
          }}
        ></input>
      )}
    </div>
  );
});

MaskedInput.propTypes = {
  mask: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MaskedInput;

export { useInputMask };
