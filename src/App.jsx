import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <ToastContainer position='top-center'/>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/add" Component={AddEdit} />
          <Route path="/update/:id" Component={AddEdit} />
          <Route path="/view/:id" Component={View} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

