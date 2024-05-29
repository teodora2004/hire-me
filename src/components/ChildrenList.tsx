import React, { useEffect, useState } from 'react';
import Child from './Child';
import { ChildData } from '../interfaces';
import usePagination from '../hooks/usePagination';
import { mapInitialStatuses } from '../utils/utils';

interface ChildrenListProps {
    children: ChildData[];
}

const ChildrenList: React.FC<ChildrenListProps> = ({ children }) => {
    const itemsPerPage = 5;
    const [childrenStatus, setChildrenStatus] = useState<{ [childId: string]: boolean }>({});

    // used a custom hook for pagination
    const { currentItems, paginate, totalPages, currentPage } = usePagination(children, itemsPerPage);

    // keeping check-in status for each child within component's local state
    // to avoid refetching a possibly huge list after each checkin/checkout action
    // synchronized with children props
    useEffect(() => {
        const initialStatuses = mapInitialStatuses(children);
        setChildrenStatus(initialStatuses);
    }, [children]);


    const toggleChildStatus = (childId: string) => {
        setChildrenStatus(prevState => ({
            ...prevState, // keep the immutability of the object
            [childId]: !prevState[childId] // only change the status of the child that has been checked in/out
        }));
    };

    return (
        <>
            <div className="min-h-[30rem]">
                {currentItems.map((child: ChildData) => (
                    <Child
                        key={child.childId}
                        child={child}
                        checkedIn={childrenStatus[child.childId] || false}
                        toggleCheckInOut={() => toggleChildStatus(child.childId)}
                    />
                ))}
            </div>
            {/* pagination buttons */}
            <div className="flex justify-end">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`m-2 py-1 px-3 pointer ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default ChildrenList;