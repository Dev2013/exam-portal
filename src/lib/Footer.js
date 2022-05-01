import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return <Wrapper>
    <h5>
    <span> BDCOE 
        </span>
      &copy;{new Date().getFullYear()}
      </h5>
      </Wrapper>
}

const Wrapper = styled.footer`
  overflow :hidden ;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:  #18546e;
  text-align: center;
  span {
    color: whitesmoke;
  }
  h5 {
    color: whitesmoke;
    margin: 0.123rem;
    font-weight: normal;
    text-transform: none;
    line-height: 1;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer