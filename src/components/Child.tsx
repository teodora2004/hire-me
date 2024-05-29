import React from 'react';
import { ChildData } from '../interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { toast } from 'react-toastify';
import { checkInChild, checkOutChild } from '../api/apiUtil';

interface ChildProps {
  child: ChildData;
  checkedIn: boolean;
  toggleCheckInOut: () => void;
}

const Child: React.FC<ChildProps> = ({ child, checkedIn, toggleCheckInOut }) => {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN || '';

  const checkedTime = moment(child.checkinTime).format('h:mm a');

  // each child manages their interactions to improve component encapsulation
  const handleCheckOut = async () => {
    try {
      const now = new Date();
      await checkOutChild(accessToken, child.childId, now.toISOString());
      toggleCheckInOut();
      toast.success(`${child.name.fullName} has been checked out.`);
    } catch (error) {
      toast.error('Failed to check out.');
      console.error('Error checking out child:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      await checkInChild(accessToken, child.childId, now.toISOString());
      toggleCheckInOut();
      toast.success(`${child.name.fullName} has been checked in.`);
    } catch (error) {
      toast.error(`Failed to check in ${child.name.fullName}.`);
      console.error('Error checking in child:', error);
    }
  };

  return (
    <div className="border p-1 mb-4 flex justify-between items-center">
      <img
        src={child.image}
        alt={`${child.name.fullName}'s profile`}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <h2 className="text-lg font-bold w-60 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {child.name.fullName}
      </h2>
      <div className="mt-2 w-40 flex items-center justify-start">
        <FontAwesomeIcon
          icon={checkedIn ? faCheckCircle : faTimesCircle}
          className={checkedIn ? 'text-green-500 mr-2' : 'text-red-500 mr-2'}
        />
        <span className={checkedIn ? 'text-green-500' : 'text-red-500'}>
          {checkedIn ? 'Present' : 'Not Present'}
        </span>
      </div>
      <div className="w-52">
        {checkedIn && child.checkinTime && <>Checked In at {checkedTime}</>}
      </div>
      <div className="mt-2">
        <button
          onClick={checkedIn ? handleCheckOut : handleCheckIn}
          className={`p-2 rounded w-40 ${checkedIn ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {checkedIn ? 'Check Out' : 'Check In'}
        </button>
      </div>
    </div>
  );
};

export default Child;