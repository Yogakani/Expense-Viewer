import { useLayoutEffect } from 'react';
import './App.css';
import Landing from './landing';

function App() {
  
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#F1FAFC";
  });
  
  
  return (
      <Landing></Landing>
  );
}

export default App;
