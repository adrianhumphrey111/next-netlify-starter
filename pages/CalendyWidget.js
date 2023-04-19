import React, {useEffect} from 'react'
import styled from 'styled-components';

const StyledCalendyWidget = styled.div`
  position: absolute;
  display: ${props => props.show ? "flex" : "none"};
  z-index: 999;
  top: 250px;
`

const CalendyWidget = ({showCalendyWidget, handleLeadSubmit}) => {
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
  
    return (
      <StyledCalendyWidget show={showCalendyWidget}>
        <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/adrianhumphrey374/30min"
        style={{ minWidth: '320px', height: '630px' }}
        ></div>
      </StyledCalendyWidget>
    );
  }
export default CalendyWidget