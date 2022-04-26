import React ,{useState, useEffect} from 'react'
import {baseURL} from './constants'
import "../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { useHistory } from "react-router-dom";


const Videos =({isAuthorized})=>{
  const [finalState, setFinalState] = useState({ data: [], loading: true });
  const [url,setUrl] = useState("")
  const history = useHistory();

  useEffect(() => {
    if(!isAuthorized){
      history.push('/sign-in')
    }
  },[history, isAuthorized])

    useEffect(() => {
        fetch(`${baseURL}/get-videos?moduleType=MODULE_2`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then(res=>res.json())
          .then(data => {
            console.log('Success:', data);
            setFinalState({ data: data,loading:false });
             //history.push('/Dashboard')
             setUrl(data?.[0]?.videoUrl)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
              }
    ,[])
    return <>
    {/* <div style={{width:"100%",backgroundImage:`url(/4.jpg)`,backgroundColor:"white",height:"calc(100vh - 50px)"}}> */}
     <div
      style={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding:'100px'
      }}
    >
      { !finalState?.loading && finalState.data?.length ?
        <div style={{width: "100%", display:"flex", justifyContent:"space-between" ,alignItems: "flex-start",flexDirection:"row"}}>
          
           <div style={{width:"70%", height:"600px"}}><Player
               playsInline
              poster="/assets/poster.png"
              src={`${url}`}
            /></div>
            <div style={{display:"flex", justifyContent:"left" ,alignItems: "flex-start",flexDirection:"column" , margin:"10px", width:"20%"}}>
         {finalState?.data?.map(val=>{
          return (
           <ul class="list-group" style={{width: "100%"}} >
            <li class="list-group-item list-group-item-action" onClick={()=>setUrl(val?.videoUrl)}>{val?.videoTitle}</li>
            </ul>
          )})}
          </div>
             </div>
       :null}
       {finalState?.data && !finalState?.data?.length && !finalState?.loading && <h3 style={{backgroundColor:"transparent"}}>No Videos found trying completing the modules then come back to check </h3>}
    </div>
    {/* </div> */}
    </>
}
export default Videos