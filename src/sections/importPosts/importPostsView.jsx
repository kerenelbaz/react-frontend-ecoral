import React, { useState  , useEffect} from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppTwoTone';

import './importPostsStyle.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ImportPostsView() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [postsAboutDiving, setPostsAboutDiving] = useState([]);
  const [postsNumber, setPostsNumber] = useState(0);
  const [divinPostsNumber, setDivinPostsNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');




  useEffect(() => {
    if (divinPostsNumber > 0) {
      const sendDivingPostsToServer = async () => {
        try {
          const fetchPromises = postsAboutDiving.map(async ( post, index) => {
            const postToSend={
              AR: post.AR,
              date: post.date , 
              diveSite: post.diveSite , 
              imageLocation: post.imageLocation , 
              objectGroup: post.objectGroup , 
              specie: post.specie , 
              time: post.time , 
              linkURL: post.linkURL , 
              video: post.video , 
            };

            const divingResponse = await fetch('http://localhost:8000/api/pendings_dives', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postToSend),
            });
            if (!divingResponse.ok) {
              throw new Error('Failed to send diving post');
            }
          });
          await Promise.all(fetchPromises);
          setOpen(true);
        } catch (error) {
          console.error('Error sending diving posts:', error.message);
          setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
      };
      sendDivingPostsToServer();
    }
  }, [postsAboutDiving , divinPostsNumber ]);

  const handleClose = () => {
    setOpen(false);
    setCode('');
  };

  const handleImport = async (event) => {
    event.preventDefault();
    setLoading(true); // Start showing the loading indicator
    setErrorMessage('');

    try {
      // checking if the required field is not empty
      if (!code) {
        setLoading(false); // Stop showing the loading indicator
        return;
      }

      const response = await fetch('http://kirilldevs.pythonanywhere.com/api/html-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: code,
      });

      if (!response.ok) {
        setLoading(false); // Stop showing the loading indicator
        throw new Error('Failed to import data'); // Handle server errors
      }

      // If response is OK
      // setOpen(true);
      const data = await response.json();
      console.log(data.data);
      setPostsNumber(data.data.length);
      const releventPosts = data.data.filter(
        (post) => !Object.prototype.hasOwnProperty.call(post, 'no data')
      );
      console.log(releventPosts);
      setPostsAboutDiving(releventPosts);
      setDivinPostsNumber(releventPosts.length);
    } catch (error) {
      console.error('Error importing data:', error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Stop showing the loading indicator after response is received
    }
  };

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="importContainer">
      <h1>Import Data From Social Media Posts</h1>
      <br />

      <form onSubmit={handleImport}>
        <div>
          <p className="p">Paste HTML Code:</p>
          <textarea className="codeField" value={code} onChange={handleChange} />
        </div>
        {loading && ( // Show the progress indicator only when loading is true
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <LinearProgress />
          </Box>
        )}
        <br />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <div className="importButton">
          <Button
            size="large"
            type="submit"
            variant="outlined"
            endIcon={<GetAppTwoToneIcon />}
            disabled={loading} // Disable the button while loading
          >
            import
          </Button>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Data Imported Successfully</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {postsNumber} posts were found, {divinPostsNumber} of them about diving. Currently,
              they are awaiting admin approval.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
