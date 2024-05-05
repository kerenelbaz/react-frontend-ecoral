import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    
    e.preventDefault();
     // Perform validation
     let isValid = true;

     // Email validation
     if (!userEmail.trim()) {
       setEmailError('Email is required');
       isValid = false;
     } else if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
       setEmailError('Invalid email address');
       isValid = false;
     } else {
       setEmailError('');
     }
 
     // Password validation
     if (!password.trim()) {
       setPasswordError('Password is required');
       isValid = false;
     } else {
       setPasswordError('');
     }
 
     // Submit the form if valid
  if (isValid) {
    fetch(`https://proj.ruppin.ac.il/cgroup11/test2/tar1/api/User/login?email=${userEmail}`, {
      method: 'POST',
      body: JSON.stringify({ password }), // Sending password as JSON object
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        router.push('/');
      })
      .catch((error) => {
        console.error('Error during login fetch:', error);
        // Set error message based on error type
        if (error instanceof TypeError) {
          // Network error
          setEmailError('Network error occurred, please try again later.');
        } else {
          // Other errors
          setEmailError('One or more fields are not correct, please try again.');
          setPasswordError('One or more fields are not correct, please try again.');
        }
      });
    }
  };

  const renderForm = (
    
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" 
                    label="Email address" 
                    onChange={(e) => setUserEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}/>

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!passwordError}
            helperText={passwordError}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          
        >
          Login
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
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <RouterLink to="/register" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </RouterLink>
          </Typography>

          

          <Divider sx={{ my: 3 }}/>
          

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
