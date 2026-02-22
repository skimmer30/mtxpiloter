import { useState } from 'react'
import './App.css'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { red, green, blue, yellow } from '@mui/material/colors';

function Piloter() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [log, setLog] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(10);

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // check device supports browser speech recognition
  if ( !window.SpeechRecognition ) {

    return (

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
             Speech Recognition not supported on this device
          </Typography>
        </CardContent>
      </Card>

    )

  }

  // check device supports browser speech recognition
  if ( !window.speechSynthesis ) {

    return (

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
             Speech Synthesis not supported on this device
          </Typography>
        </CardContent>
      </Card>

    )

  }

  // 
  // start recognition
  //
  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = true;
  recognition.lang = 'en-US'; // Set the language


  //
  // speech synthesis
  //
  const synth = window.speechSynthesis;

  // Add an event listener for the 'result' event
  recognition.addEventListener('result', (event) => {

    // Extract the transcript from the event object
    const transcript = Array.from(event.results) .map(result => result[0]) .map(result => result.transcript) .join('');

    setInput ( transcript );

    let utterance = new SpeechSynthesisUtterance( "Roger that " + transcript );
    // Optional: Configure pitch, rate, language, etc.
    utterance.pitch = 1.0; 
    utterance.rate = 1.0;

    // Speak the text
    synth.cancel();
    synth.speak(utterance);

    setOutput ( "Roger that " + transcript );

  });

  recognition.addEventListener('error', (event) => {
    // console.log('Speech recognition service error');
  });

  recognition.addEventListener('end', (event) => {
  });


  // Start the speech recognition service
  recognition.start();


  return (

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
           <strong>Controller:</strong> {input}
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
           <strong>Pilot:</strong> {output}
        </Typography>
      </CardContent>
    </Card>

  )

}

export default Piloter
