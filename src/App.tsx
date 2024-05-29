import React from 'react';
import './App.css';
import ChildrenList from './components/ChildrenList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import useFetchChildren from './hooks/useFetchChildren';

function App() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN || '';
  const groupId = process.env.REACT_APP_GROUP_ID || '';
  const institutionId = process.env.REACT_APP_INSTITUTION_ID || '';
  const today = moment().format('dddd, MMMM Do YYYY');

  const { children, loading, error } = useFetchChildren(accessToken, groupId, institutionId);

  return (
    <div className="p-16 bg-slate-100 min-h-screen">
      <div>
      <h1 className="text-2xl font-bold mb-8 text-center">Nursery Attendance</h1>
      <span className="text-l font-bold flex justify-end my-4">{today}</span>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ChildrenList children={children} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;