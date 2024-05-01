

import { keyframes } from '@emotion/react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


// Define the keyframes for the rotation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


// ----------------------------------------------------------------------

export default function WelcomeView() {
  

  return (
   
    <Container>
    <Box
      sx={{
        py: 2,
        maxWidth: 480,
        mx: 'auto', // Centers horizontally
        display: 'flex',
        minHeight: '100vh', // Adjust height for vertical centering
        textAlign: 'center',
        alignItems: 'center', // Vertical alignment
        flexDirection: 'column',
        justifyContent: 'center', // Horizontal alignment
      }}
    >
      <Box
        component="img"
        src="assets\images\ecoral-1-removebg.png"
        sx={{
          height: 350,
         
          animation: `${rotate} 10s linear infinite`,
          transformOrigin: 'center'
        }}
      />
    </Box>
  </Container>
   
  );
}
