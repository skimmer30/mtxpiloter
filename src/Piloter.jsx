import { useState, useRef } from 'react'
import './App.css'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import { red, green, blue, yellow } from '@mui/material/colors';

function Piloter() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [manualStop, setManualStop] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const sayMessage = (message) => {

    let utterance = new SpeechSynthesisUtterance(message);
    // Optional: Configure pitch, rate, language, etc.
    utterance.pitch = 1.0; 
    utterance.rate = 1.0;

    // Speak the text
    synthRef.current.speak(utterance);

  };

  const startRecognition = () => {

     window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

     // check device supports browser speech recognition
     if ( !window.SpeechRecognition ) {
        alert('Speech recognition not supported in this browser');
        return;
     }

     if ( !window.speechSynthesis ) {
        alert('Speech synthesis not supported in this browser');
        return;
     }

     const synth = window.speechSynthesis;
     synthRef.current = synth;

     const recognition = new SpeechRecognition();
     recognition.interimResults = false;
     recognition.continuous = true;
     recognition.lang = 'en-US'; // Set the language
     recognitionRef.current = recognition;

     // Event handler for results
     recognition.onresult = (event) => {
       const speechResult = event.results[0][0].transcript;
       setInput(speechResult);
     };

     // Event handler for the start of speech recognition service
     recognition.onstart = () => {
       console.log('Speech recognition has started');
     };

     // Event handler for errors or end of service
     recognition.onerror = (event) => {
       console.error('Speech recognition error:', event.error);
     };

     recognition.onend = () => {
       console.log('Speech recognition service disconnected');
     }

     // Start the recognition service
     recognition.start();

     sayMessage ( "Listening and ready for talk back" );

  }

  const stopRecognition = () => {

    if ( recognitionRef.current ) {
      console.log ( "Stopping services" );
      recognitionRef.current.stop();
    }

  };


  return (

    <div>
      <ButtonGroup size="small" aria-label="Start/Stop">
        <Button variant="contained" onClick={() => { setManualStop(false); startRecognition(); }} >Start</Button>
      </ButtonGroup>
      <hr />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
             Example Speech: American Airlines climb flight level 2 2 0
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
             <strong>Controller:</strong> {input}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
             <strong>Pilot:</strong> {output}
          </Typography>
        </CardContent>
      </Card>
    </div>

  )

}

export default Piloter
