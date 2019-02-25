// @ts-ignore
import React from 'react';

const EmployeeItem = ({employee , leadingStyle}: any) => {
return (
    <div className={leadingStyle}>
    <div className="row no-gutters mb-3">
        <div className='col-1'>
            <img src={employee.profileImageUrl} className="rounded-circle float-left" alt='hahah'/>
        </div>
        <div className="col-3">
            <h5>{employee.firstName} {employee.lastName.charAt(0).toUpperCase()}.</h5>
            <p className="small">{employee.totalHours} hours.</p>
        </div>
    </div>
    </div>
)
};

export default EmployeeItem;
