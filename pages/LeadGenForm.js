import React from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  };
` 

const StyledLeadForm = styled.form`
  position: absolute;
  display: ${props => props.show ? "flex" : "none"};
  z-index: 999;
`

const Container = styled.div `
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 25rem;
  margin: 0 auto;
  background: white;
`

const Title = styled.h1`
  color: black;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.0625rem;
  margin-bottom: 0rem;
`

const Subtitle = styled.h3`
  color: black;
  font-weight: 100;
  text-align: center;
  letter-spacing: 0.0625rem;
  padding: 0 3rem;
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

const Validation = styled.p`
  color: black;
  font-weight: 100;
  font-size: 0.75rem;
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

const LeadGenForm = ({showLeadGenForm}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      play()
      setShowLeadGenForm(false);
      console.log(data);
    } 
  
    console.log(); // watch input value by passing the name of it
  
    return (
      <StyledLeadForm show={showLeadGenForm}>
      <form  onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Input type='text'
              name='name'
              placeholder='Name' {...register("name")} />
        
        {/* include validation with required or other standard HTML validation rules */}
        <Input type='text'
              name='email'
              placeholder='Email' {...register("email", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This fielsd is rehquired</span>}

        <div>
            <Input
              type='text'
              name='phoneNumber'
              placeholder='Phone Number'
            />
          </div>
        
        <Submit type="submit" value='Continue Watching'/>
      </form>
      </StyledLeadForm>
    );
  }
export default LeadGenForm