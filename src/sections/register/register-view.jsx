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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Select,MenuItem,InputLabel,FormControl,FormHelperText } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');

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
     } else if ( !/^(?=.*[A-Z]).{4,12}$/.test(password)) {
        setPasswordError('Password must be 4-12 long and include at least one uppercase letter');
        isValid = false;
     } else if(password !== confirmPassword){
        setPasswordError("Passwords do not match");
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
       setConfirmPasswordError(''); 
       setPasswordError('');
     }

     // Full name validation

     if(!fullName.trim()){
        setFullNameError('Full name is required');
        isValid = false;
     } else if(!/^[A-Za-z]+(?: [A-Za-z'-]+)+$/.test(fullName)){
        setFullNameError('Full name is not a valid name');
        isValid = false;
     } else {
        setFullNameError('');
     }

     // Gender Validation
     if(!gender){
      setGenderError('Gender is required');
      isValid = false;
     } else {
        setGenderError('');
     }

    // Date validation
    const currentDate = new Date();
    if (birthDate > currentDate) {
      console.log("curr", currentDate)
      console.log("input", birthDate)
      
      setBirthDateError("Date of birth cannot be in the future.");
      console.log(birthDateError)

      isValid = false; 
    } else {
      setBirthDateError('');
    }

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentDay = currentDate.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age -= 1;
    }

    // Check if the person is under 18 years old
    if(!age){
      setBirthDateError("You should insert your birth date");
      isValid = false;
    }else if (age < 18) {
      
      setBirthDateError("Person is under 18 years old");
      console.log(birthDateError)
      isValid = false;
    } else if (age > 120) {
      setBirthDateError("person cant be older than 120 age");
      isValid = false;
    } else {
      setBirthDateError('');
    }
 
     // Submit the form if valid
     if (isValid) {

      const userToAdd = {
        email: userEmail,  
        password,          
        name: fullName,              
        gender,            
        birthDate          
      };
      
      console.log(userToAdd);
       // Your form submission logic here
       console.log('Form submitted');
       fetch(`https://localhost:7215/api/User/registration`,{
          method: 'POST',
          body: JSON.stringify(userToAdd),
          headers: new Headers({'Content-type': 'application/json; charset=UTF-8'
        })
       })
       .then(res =>{
          console.log('res = ', res);
          return res.json()
        })
        .then(
          (result) =>{
            console.log('fetch POST = ', result);
            
            router.push('/login');
        },
        (error) =>{
          console.log("err POST=", error);
        });
        
       
     }
  };

  const handleDateChange = (newDate) =>{
    console.log(newDate.toDate());
    // const newDate = new Date(event.target.birthDate.value);
    setBirthDate(newDate.toDate());
  }

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
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
          <TextField name="fullName" 
                    label="Full Name" 
                    onChange={(e) => setFullName(e.target.value)}
                    error={!!fullNameError}
                    helperText={fullNameError}
          />
          <FormControl error={!!genderError} fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select 
                    name="gender"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {genderError && <FormHelperText>{genderError}</FormHelperText>}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            
              <DatePicker label="Birth Date"
                          name='birthDate'
                          format='DD/MM/YYYY' 
                          
                          onChange={handleDateChange}
                          slotProps={{
                            textField:{
                              error: birthDateError,
                              helperText: birthDateError && 'Invalid Birth Date'
                            }
                          }}
              />
            
          </LocalizationProvider>   
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
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Sign up to ECORAL</Typography>

          
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
