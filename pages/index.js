
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components'

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


const VIDEO_URL = "https://vimeo.com/818887369"


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLeadGenForm, setShowLeadGenForm] = useState(false)
  const [showCalendyWidget, setShowCalendyWidget] = useState(false)
  const [hasPausedAt26, setHasPausedAt26] = useState(false);
  const [hasPausedAt308, setHasPausedAt308] = useState(false);
  const [isMuted, setIsMuted] = useState(true)

  useEffect( () => {
    function isCalendlyEvent(e) {
      return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
    };
     
    window.addEventListener("message", function(e) {
      if(isCalendlyEvent(e)) {
        /* Example to get the name of the event */
        console.log("Event name:", e.data.event);
        
        /* Example to get the payload of the event */
        console.log("Event details:", e.data.payload);

        if(e.data.event.includes("calendly.event_scheduled")){
          console.log("we schedule an event")
          setShowCalendyWidget(false)
          setIsPlaying(true)
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

  const handleLeadSubmit = data => {
    play()
    setShowLeadGenForm(false);
    console.log(data);
  } 

  return (
    <div className="container">
        <button className='unmute-button' onClick={() => unmute()}>Unmute</button>
        <StyledReactPlayer 
          onClick={() => play()} 
          onProgress={onProgress} 
          playing={isPlaying} 
          muted={isMuted} 
          controls={false}
          url={VIDEO_URL} 
          height='100vh'
          light={<StyledThumbnail src='/thumbnail.jpg' alt='Thumbnail' />}/>
        <LeadGenFormStyled showLeadGenForm={showLeadGenForm} handleLeadSubmit={handleLeadSubmit}/>
        <CalendyWidget showCalendyWidget={showCalendyWidget}/>
        
    </div>
  )
}
