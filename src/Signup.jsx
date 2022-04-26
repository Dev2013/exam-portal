import axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const [state, setstate] = useState({
    username: "",
    password: "",
    gender: "",
    dob: "",
    age: "" ,
    motherTongue: "",
    contactNo:"" ,
    grade: "",
    mediumOfInstruction: "",
    parentEducation: "",
    parentAnnualIncome: "",
    active: true,
  });
  const [showAert,setShowAlert] = useState(false)
  const history = useHistory();
  const handleSubmit =(e)=>{
      e.preventDefault();
      axios.post('http://ec2-54-227-175-220.compute-1.amazonaws.com:8080/create-user', {
        ...state,dob:new Date(state.dob),
      })
      .then(function (response) {
        if(response.status===422){
          setShowAlert(true)
        }
        else
       history.goBack()
      })
      .catch(function (error) {
        console.log(error);
        setShowAlert(true)
      });
  }
  return (
    <>
    {showAert &&
      <div class="alert alert-warning alert-dismissible fade show"  style={{marginTop:"55px"}}role="alert">
     <strong>Gaucha!</strong> Something went wrong , username already registered
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> {
       setShowAlert(false)
       }}></button>
   </div>}
   <div style={{backgroundImage:`url(/3.svg)`,backgroundColor:"#318CE7",width:"100%", height:"100%"}}>
    <div className="auth-inner"  >
      <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label for="validationCustom01" class="form-label">
            username
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            value={state.username}
            required
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,username:e.target.value}))}}
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-12">
          <label for="validationCustom02" class="form-label">
           password
          </label>
          <input
            type="password"
            class="form-control"
            id="validationCustom02"
            value={state.password}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,password:e.target.value}))}}
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-12">
          <label for="validationCustomGender" class="form-label">
          Gender
          </label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">
            </span>
            <select class="form-select" id="validationCustomGender" required
             onChange={(e)=>{setstate((prevSate)=>({...prevSate,gender:e.target.value}))}}
             selected={state.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
            <div class="invalid-feedback">Please choose a gender.</div>
          </div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom03" class="form-label">
            Date OF Birth
          </label>
          <input
            type="date"
            class="form-control"
            id="validationCustom03"
            value={state.dob?.toString()}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,dob:e.target.value}))}}
            required
          />
          <div class="invalid-feedback">Please provide a valid DOB.</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom04" class="form-label">
          age
          </label>
          <input
            type="number"
            class="form-control"
            id="validationCustom04"
            value={state.age}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,age:e.target.value}))}}
            required
          />
          <div class="invalid-feedback">Please select a valid age.</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom05" class="form-label">
          MotherTongue
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            value={state.motherTongue}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,motherTongue:e.target.value}))}}
            required
          />
          <div class="invalid-feedback">Please provide a valid Mother Tongue.</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom06" class="form-label">
          Contact Number
          </label>
          <input
            type="number"
            class="form-control"
            id="validationCustom06"
            value={state.contactNo}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,contactNo:e.target.value}))}}
            required
          />
          <div class="invalid-feedback">Please provide a valid ContactNo.</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom07" class="form-label">
          Grade
          </label>
          <select class="form-select" id="validationCustomGender" required
             onChange={(e)=>{setstate((prevSate)=>({...prevSate,grade:e.target.value}))}}
             selected={state.gender}>
            <option value="UKG">UKG</option>
            <option value="LKG">LKG</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <div class="invalid-feedback">Please provide a valid Grade in Form of LKG UKG</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom08" class="form-label">
          mediumOfInstruction
          </label>
          <select class="form-select" id="validationCustom08" required
           selected={state.mediumOfInstruction}
           onChange={(e)=>{setstate((prevSate)=>({...prevSate,mediumOfInstruction:e.target.value}))}}>
            <option value="english">english</option>
            <option value="Hindi">Hindi</option>
          </select>
          <div class="invalid-feedback">Please provide a valid Grade in Form of LKG UKG</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom09" class="form-label">
          Parent Education
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom09"
            value={state.parentEducation}
            onChange={(e)=>{setstate((prevSate)=>({...prevSate,parentEducation:e.target.value}))}}
            required
          />
          <div class="invalid-feedback">Please provide a valid Grade in Form of LKG UKG</div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom10" class="form-label">
          Parent Income
          </label>
          <select class="form-select" id="validationCustomGender" required
             onChange={(e)=>{setstate((prevSate)=>({...prevSate,parentAnnualIncome:e.target.value}))}}
             selected={state.gender}>
            <option value="Under 2.5 Lacs">{'<2.5 lac'}</option>
            <option value="2.5-5 lac">2.5-5 lac</option>
            <option value="5 lac and above">{'>5'}</option>
          </select>
          <div class="invalid-feedback">Please provide a valid Grade in Form of LKG UKG</div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}
