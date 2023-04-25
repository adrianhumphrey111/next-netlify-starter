
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components'
import axios from 'axios';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
const LeadGenFormStyled = dynamic(() => import('./LeadGenForm'), { ssr: false });
const CalendyWidget = dynamic(() => import('./CalendyWidget'), { ssr: false });

const StyledReactPlayer = styled(ReactPlayer)`

`

const UnmuteButton = styled.button`
  position: absolute;
  top: 75px;
  left: 10px;
  background-color: blue;
  border: 2px solid black;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 12px 24px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  &:hover {
    background-color: darkblue;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;


const StyledThumbnail = styled.img`
  height: 85vh;
`

const VideoPlayerContainer = styled.div`
  position: relative;
`;


const VIDEO_URL = "https://adrianhumphrey374.wistia.com/medias/p3gk97qit5"


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLeadGenForm, setShowLeadGenForm] = useState(false)
  const [showCalendyWidget, setShowCalendyWidget] = useState(false)
  const [controls, setControls] = useState(true)
  const [hasPausedAt26, setHasPausedAt26] = useState(false);
  const [hasPausedAt308, setHasPausedAt308] = useState(false);
  const [isMuted, setIsMuted] = useState(true)

  useEffect( () => {
    function isCalendlyEvent(e) {
      return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
    };
     
    window.addEventListener("message", function(e) {

      if (e.data.action === 'parentUnMuteAction') {
        // Handle the button click from the parent window
        console.log('Button clicked in the parent window');
        setIsMuted(false)
      }

      if (e.data.action === 'parentPlayAction') {
        // Handle the button click from the parent window
        console.log('Button clicked in the parent window play');
        setIsPlaying(true)
      }

      if(isCalendlyEvent(e)) {
        /* Example to get the name of the event */
        console.log("Event name:", e.data.event);
        
        /* Example to get the payload of the event */
        console.log("Event details:", e.data.payload);

        if(e.data.event.includes("calendly.event_scheduled")){
          console.log("we schedule an event")
          setShowCalendyWidget(false)
          setIsPlaying(true)

          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-11137285033/5sTLCNm9mZoYEKn31b4p',
                'event_callback': callback
            });
            return false;
          }

          gtag_report_conversion()
        }
      }
    });
  }, [])

  const play = () => setIsPlaying(true)
  
  const pause = () => setIsPlaying(false)

  const unmute = () => {
    setIsMuted(false)
  }
 
  const onProgress = ({playedSeconds}) => {
    if(!hasPausedAt26 && playedSeconds >= 25){
      // pause the video and show the form in the video
      setControls(false)
      setIsPlaying(false);
      setShowLeadGenForm(true);
      setHasPausedAt26(true);
    }

    if(!hasPausedAt308 && playedSeconds >= 308){
      // pause the video and show the form in the video
      setIsPlaying(false);
      setShowCalendyWidget(true);
      setHasPausedAt308(true);
    }
    
  }

  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters from the input string
    const digitsOnly = phone.replace(/\D/g, '');
  
    // Check if the phone number starts with '1' and has 11 digits (country code + 10 digits)
    // Or if the phone number has 10 digits (assuming the country code is not provided)
    if ((digitsOnly.length === 11 && digitsOnly.startsWith('1')) || digitsOnly.length === 10) {
      // Add the country code if it's not provided
      const formattedNumber = digitsOnly.length === 11 ? '+' + digitsOnly : '+1' + digitsOnly;
  
      return formattedNumber;
    } else {
      // If the phone number is not valid, return an error message
      return 'Invalid phone number';
    }
  }

  const handleLeadSubmit = async data => {
    const validatedNumber = validatePhoneNumber(data.phoneNumber);
    try {
      function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof(url) != 'undefined') {
            window.location = url;
          }
        };
        gtag('event', 'conversion', {
            'send_to': 'AW-11137285033/5sTLCNm9mZoYEKn31b4p',
            'event_callback': callback
        });
        return false;
      }
      gtag_report_conversion()
      await axios.post("https://zapier-webservice.onrender.com/register",  {
              "full_name": data.name,
              "email": data.email,
              "phone_number": validatedNumber
      })
    }catch(e){
      console.log(e)
    }finally {
      setShowLeadGenForm(false);
      play()
      console.log(data);
    }
  } 

  return (
    <div className="container">
        <button className='unmute-button' onClick={() => unmute()}>Unmute</button>
        <StyledReactPlayer 
          onClick={() => play()} 
          onProgress={onProgress} 
          playing={isPlaying} 
          muted={isMuted} 
          controls={controls}
          url={VIDEO_URL} 
          width='100%'
          height='100vh'
          light={<StyledThumbnail src='/thumbnail.jpg' alt='Thumbnail' />}/>
        <LeadGenFormStyled showLeadGenForm={showLeadGenForm} handleLeadSubmit={handleLeadSubmit}/>
        <CalendyWidget showCalendyWidget={showCalendyWidget}/>
        
    </div>
  )
}
