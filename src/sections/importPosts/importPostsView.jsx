import Button from '@mui/material/Button';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppTwoTone';

import './importPostsStyle.css';

export default function ImportPostsView() {
  return (
    <div className="container1">
      <h1>Import Data From Social Media Posts</h1>
      <br/>

      <form>
        <div>
          <p className='p'>Paste HTML Code:</p>
          <textarea className="codeField"/>
        </div>
        <div className='importButton'><Button size="large" type="submit" variant="outlined" endIcon={<GetAppTwoToneIcon />}>
            import
        </Button></div>
        <br />
      </form>
    </div>
  );
}
