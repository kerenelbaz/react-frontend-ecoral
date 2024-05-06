import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// eslint-disable-next-line arrow-body-style
export default function ImageDialog ({ open, onClose, fileLink }) {

     
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogContent>
            <img
             src={fileLink}
             alt="Large Avatar" 
             style={{ maxWidth: '100%', maxHeight: '100%' }} 
            />
        </DialogContent>
        </Dialog>
    );
};

ImageDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    fileLink: PropTypes.string
  };
