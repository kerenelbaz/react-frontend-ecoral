/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

// import Logo from 'src/components/logo';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RestorePassView({email}) {
  const theme = useTheme();

  const router = useRouter();

  const [insertData, setInsertData] = useState({
    pass: '',
    passAgain: '',
    errors: {
      pass: false,
      passAgain: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    const isValid = true;
    

    console.log(email);

    // Password validation
    if (!insertData.pass.trim()) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          pass: 'Passwords are Required',
          passAgain: 'Passwords are Required',
        },
      }));
      return;
    }
    setInsertData((prevFormData) => ({
      ...prevFormData,
      errors: {
        ...prevFormData.errors,
        pass: '',
        passAgain: '',
      },
    }));

    if (insertData.pass !== insertData.passAgain) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          pass: 'Passwords dont match',
          passAgain: 'Passwords dont match',
        },
      }));
      return;
    }

    // // Submit the form if valid
    if (isValid) {
      fetch(`https://proj.ruppin.ac.il/cgroup11/test2/tar1/api/User/${email}`, {
        method: 'PUT',
        body: JSON.stringify(insertData.pass), // Sending password as JSON object
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          window.location.href = '/';
          return res.json();
        })
        .then((result) => {
          window.location.href = '/';
        })
        .catch((error) => {
          // console.error('Error during login fetch:', error);
          // // Set error message based on error type
          // if (error instanceof TypeError) {
          //   // Network error
          //   setEmailError('Network error occurred, please try again later.');
          // } else {
          //   // Other errors
          //   setEmailError('One or more fields are not correct, please try again.');
          //   setPasswordError('One or more fields are not correct, please try again.');
          // }
        });
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) =>
            setInsertData((prevFormData) => ({
              ...prevFormData,
              pass: e.target.value,
              errors: {
                pass: '',
                passAgain: '',
              },
            }))
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!insertData.errors.pass}
          helperText={insertData.errors.pass}
        />

        <TextField
          name="passwordAgain"
          label="Repeat Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) =>
            setInsertData((prevFormData) => ({
              ...prevFormData,
              passAgain: e.target.value,
              errors: {
                pass: '',
                passAgain: '',
              },
            }))
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!insertData.errors.passAgain}
          helperText={insertData.errors.passAgain}
        />
      </Stack>
      <br />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Update
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
          <Typography variant="h4">Update Your Password</Typography>

          <Divider sx={{ my: 3 }} />

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

RestorePassView.propTypes = {
  email: PropTypes.string,
};
