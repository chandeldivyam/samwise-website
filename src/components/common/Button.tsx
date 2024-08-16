// .\src/components/common/Button.tsx
import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <MuiButton {...rest}>
      {children}
    </MuiButton>
  );
};

export default Button;