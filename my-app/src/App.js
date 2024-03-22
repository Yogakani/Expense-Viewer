import { useLayoutEffect } from 'react';
import './App.css';
import Landing from './landing';
import { Route, Routes } from 'react-router-dom'
import Home from './home';
import Registration from './registration';

function App() {
  
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#F1FAFC";
  });
  
  
  return (
      <>
        <Routes>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/register' element={<Registration></Registration>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </>
  );
}

export default App;
