import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Stack, Alert, Button, Snackbar, IconButton } from '@mui/material';

import config from 'src/sections/configServer';

const ImageUpload = ({ sendImage }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);

    const onSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleUpload = async () => {
        if (!imagePreview) return;
        setUploading(true);

        try {
            const publicId = `your_public_id_${Date.now()}`;
            const response = await axios.post(`${config.serverUrl}/test-api-image-upload`, {
                imageUrl: imagePreview,
                publicId,
            });

            if (response.status === 200) {
                setUploading(false);
                setUploadSuccess(true);
                sendImage(response.data.secure_url); // Assuming cloudinary response contains secure_url
            } else {
                setUploading(false);
                setUploadError('Image upload failed');
            }
        } catch (error) {
            setUploading(false);
            setUploadError(error.message);
        }
    };

    return (
        <div>
            <Stack sx={{ alignContent: 'center' }}>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onSelectFile}
                    style={{ display: 'none' }}
                />
                <div className="image-placeholder">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" style={{ maxHeight: '200px', marginBottom: '10px' }} />
                    ) : (
                        <div className="placeholder-icon">
                            <IconButton size="large" onClick={() => fileInputRef.current.click()}>
                                <AddAPhotoIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    )}
                </div>
                {imagePreview && (
                    <Button onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                )}
            </Stack>
            <Snackbar
                open={uploadSuccess}
                autoHideDuration={6000}
                onClose={() => setUploadSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success">Image uploaded successfully!</Alert>
            </Snackbar>
            {uploadError && <Alert severity="error">{uploadError}</Alert>}
        </div>
    );
};

ImageUpload.propTypes = {
    sendImage: PropTypes.func.isRequired,
};

export default ImageUpload;