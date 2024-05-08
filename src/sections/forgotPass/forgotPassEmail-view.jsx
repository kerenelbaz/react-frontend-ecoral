import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import emailjs from '@emailjs/browser';


// ----------------------------------------------------------------------

export default function ForgotPassEmailView() {
  const theme = useTheme();

  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState('');


  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://proj.ruppin.ac.il/cgroup11/test2/tar1/api/User/email?email=${email}`, {
      method: 'GET',
      body: null,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((result) => {
        emailjs.sendForm('service_nl3uy7m', 'template_kaxaqke', e.target, 'HuHxQVmUk_UHuY6V9')
        if (result.email && result.email === email) {
          // emailjs.sendForm('service_nl3uy7m', 'template_kaxaqke', e.target, 'HuHxQVmUk_UHuY6V9')
          // window.location.href = '/';
        } else {
          console.log("wrong email");
        }
      })
      .catch((error) => {
        console.error('Error during send fetch:', error);
        // Set error message based on error type
        if (error instanceof TypeError) {
          // Network error
          setEmailError('Network error occurred, please try again later.');
        }
      });
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email_to"
          id="emailTo"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
      </Stack>
      <br id='host' value="http://localhost:3030/"/>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Send
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Enter Email</Typography>

          <Divider sx={{ my: 3 }} />

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
