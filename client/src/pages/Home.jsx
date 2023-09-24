import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Home(){
    const navigate=useNavigate();
    return(
      <>
      {window.location.replace("https://vriksha-vision-map.netlify.app")}
      </>
    )
}

export default Home;