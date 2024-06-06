import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from '../firebase';
import {  useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    const db = getDatabase();
    get(ref(db, `contacts/${id}`)).then((snapshot)=>{
      if(snapshot.exists()){
        setUser({...snapshot.val()});
      }else{
        setUser({})
      }
    })
  },[id]);
  console.log("User", user)

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header" style={{backgroundColor:"#4284f5"}}>
          <strong style={{color:"white"}}>
            Student Contact Details
          </strong>
        </div>
        <div className="card-body" style={{textAlign:"center"}}>
          <strong>ID:</strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br/>
          <br/>
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br/>
          <br/>
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <div className="col-4 offset-4 text-center mt-3">
              <Link to="/">
                <button className='btn btn-secondary' style={{backgroundColor:"#4284f5",}}>Go Back</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default View