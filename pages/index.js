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


const StyledLeadForm = styled.form`
  position: absolute;
  display: ${props => props.show ? "flex" : "none"}
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

  const LeadGenForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      play()
      setShowLeadGenForm(false);
      console.log(data);
    } 
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <StyledLeadForm show={showLeadGenForm} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />
        
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" />
      </StyledLeadForm>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        
        <ReactPlayer onProgress={onProgress} playing={isPlaying} url='https://player.vimeo.com/external/479429612.hd.mp4?s=429fdb1ec3becc4a77f0eacc567f1e6dc830564e&profile_id=174' />
        <div>
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
        </div>
         <LeadGenForm/>
      </main>

      <Footer />
    </div>
  )
}
