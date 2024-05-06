/* eslint-disable no-unused-vars */
import useEffect from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
// import SettingsIcon from '@mui/icons-material/Settings';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ButtonBase from '@mui/material/ButtonBase';
import { styled, useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'}`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light' ? 'rgba(3, 102, 214, 0.3)' : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: '100%',
  textAlign: 'left',
  paddingBottom: 8,
  color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
  fontWeight: 600,
  '&:hover,&:focus': {
    color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
  },
  '& span': {
    width: '100%',
  },
  '& svg': {
    width: 16,
    height: 16,
  },
}));

export default function GitHubLabel({ onTagsChange, labels }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [value, setValue] = React.useState([labels[1], labels[11]]);
  const [value, setValue] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const [newLabel, setNewLabel] = React.useState({
    name: '',
    // color: `#${Math.random().toString(16).substring(7)}`,
    color: getRandomColor(),
    description: '',
  });
  const theme = useTheme();

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');

    // Ensure brightness by checking the average light value
    const brightness = (parseInt(red, 16) + parseInt(green, 16) + parseInt(blue, 16)) / 3;

    return brightness < 128 ? `#${red}${green}${blue}` : getRandomColor();
  }
  // useEffect(() => {
  //   console.log(tags);
  // }, [tags])

  useEffect(() => {
    onTagsChange(value);
  }, [value, onTagsChange]);

  const handleNewLabel = () => {
    if (
      value.some((e) => e.name === newLabel.name) ||
      labels.some((e) => e.name === newLabel.name)
    ) {
      return;
    }
    if (newLabel.name.trim() && newLabel.color.trim()) {
      // const updatedLabels = [...labels, newLabel];
      setValue([...value, newLabel]);
      setPendingValue([...pendingValue, newLabel]);
      setNewLabel({
        name: '',
        // color: `#${Math.random().toString(16).substring(7)}`,
        color: getRandomColor(),
        description: '',
      });
      console.log(newLabel);
    }
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleRemoveLabel = (labelToRemove) => {
    const newValue = value.filter((label) => label !== labelToRemove);
    setValue(newValue);
    setPendingValue(newValue);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          fontSize: 16,
          alignitems: 'center',
          // justifyContent: 'space-evenly',
        }}
      >
        <div>
          <Button
            disableRipple
            aria-describedby={id}
            onClick={handleClick}
            sx={{
              fontSize: 20,
              // alignitems: 'center',
              // justifyContent: 'space-evenly',
            }}
          >
            <span>
              Tages <AddCircleOutlineIcon fontSize="large" />
            </span>
            {/* <AddCircleOutlineIcon fontSize="large"/> */}
          </Button>
        </div>
        <Box
          sx={{
            alignitems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          {value &&
            value.map((label) => (
              <Box
                key={label.name}
                sx={{
                  width: '33%',
                  mt: '3px',
                  height: 20,
                  padding: '.15em 4px',
                  fontWeight: 600,
                  lineHeight: '15px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
                style={{
                  backgroundColor: label.color,
                  color: theme.palette.getContrastText(label.color),
                }}
                onClick={() => handleRemoveLabel(label)}
              >
                {label.name}
              </Box>
            ))}
        </Box>
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
              <TextField
                label="New Label"
                value={newLabel.name}
                onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                size="small"
                sx={{ mr: 1 }}
              />
              {/* <TextField
                label="Color"
                value={newLabel.color}
                onChange={(e) =>
                  setNewLabel({ ...newLabel, color: e.target.value })
                }
                size="small"
                sx={{ mr: 1 }}
              /> */}
              <TextField
                label="Description"
                value={newLabel.description}
                onChange={(e) => setNewLabel({ ...newLabel, description: e.target.value })}
                size="small"
                sx={{ mr: 1 }}
              />
              <Button variant="contained" onClick={handleNewLabel} size="small">
                Add Label
              </Button>
            </Box>
            <Box
              sx={{
                borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
                padding: '8px 10px',
                fontWeight: 600,
              }}
            >
              Apply labels to this pull request
            </Box>
            <Autocomplete
              open
              multiple
              onClose={(event, reason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event.key === 'Backspace' || event.key === 'Delete') &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li key={option.name} {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      mt: '2px',
                    }}
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                      },
                    }}
                  >
                    {option.name}
                    <br />
                    <span>{option.description}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                </li>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}

GitHubLabel.propTypes = {
  labels: PropTypes.any,
  onTagsChange: PropTypes.func,
};
