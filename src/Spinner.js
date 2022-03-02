import React from 'react'
import spinner from './Ajax-loader.gif'
import styled from 'styled-components'
function Spinner() {
  return (
      <Center>

    <div className='center'>
    <p>Loading...</p>
<img src={spinner} alt="loading"/>

    </div>
      </Center>
  )
}

export default Spinner
const Center = styled.div`
.center{
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img{
width: 200px;
height: 200px;
    }
}
`;