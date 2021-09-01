import React from 'react';
import './FormButton.css';
import { Button } from 'antd';

const FormButton = ({ onClick, children, style }) => {
  return (
    <Button onClick={onClick} style={style}>
      {children}
    </Button>
  );
};

export default FormButton;
