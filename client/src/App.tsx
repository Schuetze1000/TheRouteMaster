import React from 'react';
import Login from './pages/login/login';

function App() {
  return (
    <div className="w-full h-screen flex flex-cols text-center">
        <div className="w-1/8 bg-slate-200 h-full p-4 hidden md:flex flex-col">
          <div className="px-4">
          
          </div>
          <div className="justify-stretch py-5 grid grid-cols-1 gap-3 my-auto">
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Tutorials
            </div>
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Components
            </div>
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Contact
            </div>
          </div>
          <div>
            FOOTER
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 w-1/2 mx-auto h-1/2">
          <div className="text-4xl pt-10">HELLO WORLD</div>
          <Login/>
          <div className="block">
          <button className="bg-slate-100 shadow-md px-4 py-3"> Get started</button></div>
        </div>
     </div>
  );  
}

export default App;