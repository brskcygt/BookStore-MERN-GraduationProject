import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@mui/material';


export const TextInputWithController = (props) =>
  (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: {
          onChange: onFormChange,
          value,
          ...fieldFormProps
        } = {},
        fieldState: {
          error
        } = {
          error: props.error
        }
      }) => (
        <FormControl>
          <TextField
            placeholder={props.placeholder}
            label={props.label}
            error={!!error}
            // eslint-disable-next-line react/prop-types
            onChange={props.parseInt ? (e) => {
              if (Number.isNaN(+e.target.value)) return onFormChange(e.target.value);
              if (e.target.value === '') return onFormChange(e.target.value);
              return onFormChange(+e.target.value);
            } : onFormChange}
            disabled={props.disabled}
            multiline={(props.maxRows > 0 || props.minRows > 0 || props.row > 0) && true}
            rows=""
            maxRows={props.maxRows}
            minRows={props.minRows}
            id={props.id}
              // label={props.label}
            readOnly={props.readOnly}
            type={props.type}
            onKeyDown={props.onKeyDown}
            // value={props.value || ''}
            inputProps={props.inputProps}
            {...(props.value && { value: props.value })}
            {...(props.control ? fieldFormProps : {})}
            {...props.InputProps}
            {...props.reference ? { ref: props.reference } : {}}
          />
          <FormHelperText
            error={!!error}
          >{error?.message ?? props.helperText}
          </FormHelperText>
        </FormControl>
      )}
    />

  );

TextInputWithController.propTypes = {
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node
  }),
  control: PropTypes.any,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  indicate: PropTypes.bool,
  name: PropTypes.string,
  onChangeValue: PropTypes.func,
  reference: PropTypes.any,
  row: PropTypes.number,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  rules: PropTypes.oneOfType([PropTypes.shape({
    required: PropTypes.bool
  }), PropTypes.any]),
  size: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  onKeyDown: PropTypes.func,
  // label: PropTypes.string,
  style: PropTypes.object,
  titleOnBorder: PropTypes.bool,
  noFullWidth: PropTypes.bool,
  inputProps: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.any
};

TextInputWithController.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  row: 0,
  maxRows: 0,
  minRows: 0,
  title: '',
  type: 'text',
  value: null,
  size: 'small',
  InputProps: {},
  indicate: false,
  name: '',
  defaultValue: '',
  control: false,
  rules: {},
  onChangeValue: () => {},
  reference: '',
  placeholder: '',
  readOnly: false,
  onKeyDown: () => {},
  // label: '',
  style: {},
  titleOnBorder: false,
  noFullWidth: false,
  inputProps: {},
  className: '',
  id: ''
};
