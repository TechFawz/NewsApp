import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FirstPage from "./FirstPage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import News from './news';
import { BrowserRouter as Router, Routes, Route, Navigate ,Link} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<FirstPage/>}>
          <Route index element={<Navigate to="login" />}/>
          <Route path="login" element={<LoginPage/>} />
          <Route path="sign_up" element={<CreateAccount/>} />  
          <Route path="account_Create_succuss" element={<Navigate to="/login" />} />  

        </Route>

        <Route path='/news/:id' element={<News/>}/>
       
      </Routes>
    </Router>
  );
}

