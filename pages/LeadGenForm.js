import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'


const StyledLeadForm = styled.div`
  position: absolute;
  display: ${props => props.show ? "flex" : "none"};
  z-index: 999;
  top: 250px;
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

const LeadGenForm = ({showLeadGenForm, handleLeadSubmit}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data, event) => {
        event.preventDefault()
        handleLeadSubmit(data)
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
              {...register("phoneNumber", { required: true })}
            />
          </div>
        
        <Submit type="submit" value='Continue Watching'/>
      </form>
      </StyledLeadForm>
    );
  }
export default LeadGenForm