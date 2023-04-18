import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { Player } from 'video-react';
import { useState } from 'react';
// import ReactPlayer from 'react-player/lazy'
import { useForm } from "react-hook-form";
import dynamic from 'next/dynamic';
import styled from 'styled-components'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
const LeadGenFormStyled = dynamic(() => import('./LeadGenForm'), { ssr: false });

const StyledReactPlayer = styled(ReactPlayer)`

`

const StyledLeadForm = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  flex-direction: column;
  position: absolute;
  background: white;
  z-index: 999;
`

const StyledContainer = styled.div`
    padding: 5rem 0;
    /* flex: 1 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  
`

const Submit = styled.input`
  font-size: 1.3rem;
  background: none;
  color: black;
  width: 75%;
  border-radius: 1.56rem;
  border: 0.0625rem solid black;
  margin: 2.5rem;
  padding: 0.5rem;
  cursor: pointer;
`


const Input = styled.input`
  color: black;
  font-size: 1.125rem;
  background: none;
  border: none;
  border-bottom: 0.0625rem solid black;
  margin: 2.5rem 0;
  width: 90%;
  display: block;
  ::placeholder {
    color: black;
  };
  :focus {
    outline: none;
  };
`

const VIDEO_URL = "https://vimeo.com/818887369"


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLeadGenForm, setShowLeadGenForm] = useState(false)
  const [hasPausedAt10, setHasPausedAt10] = useState(false);

  const play = () => setIsPlaying(true)
  
  const pause = () => setIsPlaying(false)

  const onProgress = ({playedSeconds}) => {
    if(!hasPausedAt10 && playedSeconds >= 3){
      // pause the video and show the form in the video
      setIsPlaying(false);
      setShowLeadGenForm(true);
      setHasPausedAt10(true);
    }
    
  }

  const handleLeadSubmit = data => {
    play()
    setShowLeadGenForm(false);
    console.log(data);
  } 

  return (
    <div className="container">
        <StyledReactPlayer 
          onClick={() => play()} 
          onProgress={onProgress} 
          playing={isPlaying} 
          muted={false} 
          url={VIDEO_URL} 
          height='100vh'
          light={<img src='https://example.com/thumbnail.png' alt='Thumbnail' />}/>
        <LeadGenFormStyled showLeadGenForm={showLeadGenForm} handleLeadSubmit={handleLeadSubmit}/>
        <div>
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
        </div>
    </div>
  )
}
