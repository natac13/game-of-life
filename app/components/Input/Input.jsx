import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
} from 'react-bootstrap';

import style from './style.scss';
/**
 * Based on https://github.com/erikras/redux-form/issues/2282#issuecomment-270170347
 * @param {[type]} props [description]
 */
function Input(props) {
  const {
    input,
    label,
    type,
    meta: { error, warning, touched },
    addon,
  } = props;
  console.log('input props', input, props)

  const wrapperClass = classnames({
    [style.wrapper]: true,
    [props.className]: !!props.className,
  });

  // validation state of the input component
  const validationState = touched && (error && 'error') || (warning && 'warning') || null;
  let message;
  if (touched && (error || warning)) {
    message = <span className="help-block">{ error || warning }</span>;
  }

  return (
    <section className={wrapperClass}>
      <FormGroup controlId={input.name} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
        <FormControl
          type={type}
          { ...input }
        />
        {addon && <InputGroup.Addon>{addon}</InputGroup.Addon>}
        <FormControl.Feedback />
        { message }
        </InputGroup>
      </FormGroup>
    </section>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  addon: PropTypes.string,
};

export default Input;
