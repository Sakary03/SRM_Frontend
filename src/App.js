import React from 'react';
import Navbar from './layout/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListUser from './pages/ListUser';
import AddUser from './user/AddUser';
import EditUser from './user/EditUser';
import ViewUser from './user/ViewUser';
import TestUpload from './demo/TestUpload';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/listuser" element={<ListUser />} />
          <Route exact path="/adduser" element={<AddUser />}></Route>
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route path="/test" element={<TestUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
