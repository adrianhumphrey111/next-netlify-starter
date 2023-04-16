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

  const handleSubmit = data => {
    play()
    setShowLeadGenForm(false);
    console.log(data);
  } 

  return (
    <div className="container">
      <StyledContainer>
        <StyledReactPlayer onProgress={onProgress} playing={isPlaying} url='https://player.vimeo.com/external/479429612.hd.mp4?s=429fdb1ec3becc4a77f0eacc567f1e6dc830564e&profile_id=174' />
        <LeadGenFormStyled showLeadGenForm={showLeadGenForm} handleSubmit={handleSubmit}/>
        <div>
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
        </div>
      </StyledContainer>

      
    </div>
  )
}
