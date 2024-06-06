import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './addEdit.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import fireDb, { getDatabase, ref, set, get,push } from '../firebase';
const intialstate={
    name: "",
    email: "",
    contact: ""
}
const AddEdit = () => {
  const [state, setState] = useState(intialstate);
  const[data,setData]=useState();
  const navigate = useNavigate();
  const{name,email,contact}=state;
  const { id } = useParams();


useEffect(() => {
    const contactsRef = ref(fireDb, 'contacts');
    get(contactsRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData({...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({})
    }
  }, []);

  useEffect(()=>{
    if(id && data){
      setState({...data[id]})
    }else{
      setState({...intialstate});
    }
    return()=>{
      setState({...intialstate});
    }
  },[id,data])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({...prevState, [name]: value }));
  };
  
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };
  const validateContact = (contact) => {
    const regex = /^[0-9]+$/;
    return regex.test(contact);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name ||!validateName(state.name)) {
      toast.error("Please enter a valid name (alphabetic characters only).");
    } else if (!state.email ||!validateEmail(state.email)) {
      toast.error("Please enter a valid email address.");
    } else if (!state.contact ||!validateContact(state.contact)) {
      toast.error("Please enter a valid contact number (numeric characters only).");
    } else {
        if(!id){
            const db = getDatabase();
      const contactsRef = ref(db, 'contacts');
      push(contactsRef, state, (err) => {
        if (err) {
          toast.error(err);
          console.log("error");
        } 
      });
        }
        else{
            const db = getDatabase();
            const contactsRef = ref(db, `contacts/${id}`)
            set(contactsRef, state, (err) => {
                if (err) {
                    toast.error(err);
                }
                else{
                    toast.success("Contact Updated Successfully");
                }
                });
        }
      
      toast.success("Student Saved Successfully");
      setTimeout(() => navigate("/"), 1000);
      console.log("success");
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: '400px',
        alignContent: "center"
      }}>
        <Row className="form-row">
          <Col>
            <label htmlFor="name">Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name...'
              value={state.name || ""} onChange={handleInputChange}
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-row">
          <Col>
            <label htmlFor="email">Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email...'
              value={state.email || ""} onChange={handleInputChange}
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-row">
          <Col>
            <label htmlFor="contact"> Contact</label>
            <input type='number' id='contact' name='contact' placeholder='Your Contact No...'
              value={state.contact || ""} onChange={handleInputChange}
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-row">
          <Col>
            <input type='submit' value={id? "Update":"Save"} onClick={handleSubmit} className="btn btn-primary" />
          </Col>
        </Row>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default AddEdit;