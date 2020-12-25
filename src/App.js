import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import axios from 'axios';
function App() {
  const [attachment, setattachment] = useState();
  const onFileChange = (event) => {
    const { target:{files}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent;
      setattachment(result);
      console.log(result);
      axios.post('http://127.0.0.1:5000/', {image:{result}}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    reader.readAsDataURL(theFile);
    
  }  
  const onClearPhoto = () => setattachment(null);
  return (
    <div>
      <Button color="primary">Hello World</Button>
      <input type="file" accept="image/*" onChange={onFileChange}/>
      {attachment && (
      <div>
      <img  src={attachment} width="50px" height="50px" />
      <Button onClick={onClearPhoto}>Cancel upload</Button>
      </div>
      
      )}
    </div>
    
  );
}

export default App;
