// .\src/components/common/Typography.tsx
import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

interface Props extends TypographyProps {
  children: React.ReactNode;
}

const Typography: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <MuiTypography {...rest}>
      {children}
    </MuiTypography>
  );
};

export default Typography;