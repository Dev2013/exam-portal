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
  ${'' /* max-height : 500px;
  overflow :scroll ; */}
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:  #18546e;
  text-align: center;
  span {
    color: #fff;
  }
  h5 {
    color: #fff;
    margin: 0.123rem;
    font-weight: 100;
    text-transform: none;
    line-height: 1;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer