import * as React from 'react';

import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  return (
    <Root>
      <Divider>
        <Chip label="Admin" size="small" />
      </Divider>
    </Root>
  );
}
