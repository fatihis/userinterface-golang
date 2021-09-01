import React from 'react';
import './FormInput.css';
import { Input } from 'antd';

const FormInput = ({ style, placeholder, value, onChange, disabled }) => {
  return (
    <div>
      <Input
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
