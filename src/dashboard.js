/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Dashboard = ({ isAuthorized }) => {
  const history = useHistory();
  return !isAuthorized ? (
    <Redirect to="/sign-in" />
  ) : (
    // <div style={{width:"100%",backgroundImage:`url(/4.jpg)`,backgroundColor:"white",height:"calc(100vh - 50px)"}}>
    // <div style={{width: "100%" , height:"auto",display: "flex",flexDirection: "row",justifyContent:'space-around',alignItems: 'flex-start',padding:"20px", marginTop:"100px"}}>
    //   <div style={{width: "100%" , height:"auto",display: "flex",flexDirection: "column",justifyContent:'space-around',alignItems: 'center',padding:"20px",gap: "30px"}}>
    <>
      <div style={{paddingTop:'40px'}}><Alert variant={"danger"}>
        Post this tab dont refresh the page or switch tab , otherwise your test
        would be automatically submitted
      </Alert></div>
      <div
        style={{
          width: "100%",
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card cardw-95"
          style={{
            width: "70%",
            height: "200px",
          }}
        >
          <div
            className="card-body card w-100"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h2 className="card-title"> BDCOE Recuritment Drive 2022 </h2>
            <p className="card-text">
              Basic Aptitude questions click on "Take Test" To Proceed !!
            </p>
          </div>
          <button
            href="#"
            type="button"
            className="btn btn-primary"
            style={{ width: "145px", alignSelf: "center", margin: "25px" }}
            onClick={() => history.push("/MCQ/1")}
          >
            Take Test
          </button>
        </div>
      </div>
    </>
  );
  // <div className="card cardw-95" style={{width: "90%", height:"200px"}}>
  // <div className="card-body card w-100" style={{display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems: 'center'}}>
  //   <h5 className="card-title"> Intervention videos</h5>
  //   <p className="card-text">This module provides intervention videos for children facing difficulties in arithmetics skills. Candidate can view videos in their problem areas and improvise their learining outcomes</p>
  // </div>
  // <button href="#"  type="button" className="btn btn-primary" style={{width:"155px",alignSelf:'center', margin:"20px"}} onClick={()=>history.push('/video')}> Watch Videos</button>
  // </div>

  // </div>
  // <div style={{width: "100%" , height:"auto",display: "flex",flexDirection: "column",justifyContent:'space-around',alignItems: 'center',padding:"20px",gap: "30px"}}>
  // <div className="card cardw-95" style={{width: "90%", height:"200px"}}>
  // <div className="card-body card w-100" style={{display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems: 'center'}}>
  //   <h5 className="card-title">Dyscalculia Screening</h5>
  //   <p className="card-text">This module screens a child for dyscalculia , i.e. difficulty in arithmetic skills</p>
  // </div>
  // <button href="#" type="button" className="btn btn-primary" style={{width:"155px",alignSelf:'center', margin:"20px"}} onClick={()=>history.push('/MCQ/2')}>Take Test</button>
  // </div>
  // <div className="card cardw-95" style={{width: "90%", height:"200px"}}>
  // <div className="card-body card w-100" style={{display:"flex",flexDirection:"column", justifyContent:"space-around",alignItems: 'center'}}>
  //   <h5 className="card-title">Report Card</h5>
  //   <p className="card-text">This module gives the report card for each candidates performance in both the modules</p>
  // </div>
  // <button href="#"  type="button" className="btn btn-primary" style={{width:"155px",alignSelf:'center', margin:"20px"}} onClick={()=>history.push('/reports')}>View Results</button>
  // </div>
  // </div>
  // </div>
  // </div>
};
export default Dashboard;
