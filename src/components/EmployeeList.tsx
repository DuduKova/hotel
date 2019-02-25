import {forIn, forOwn, get, groupBy, omit, orderBy} from 'lodash';
// @ts-ignore
import moment from 'moment';
import * as React from "react";
import {connect} from "react-redux";
import {IBooking, IEmployee} from 'src/store/types';
import {getBookings} from '../store/actions';

interface IMyComponentProps {
    bookings: IBooking[];
    getBookings: any;
}

class EmployeeList extends React.Component<IMyComponentProps, []> {

    public renderList() {
        // @ts-ignore
        const formattedList: IEmployee[] = getLeadingEmployees(omit(groupBy(this.props.bookings, 'employee.id'), undefined));
        return formattedList.map(employee => {
            return (
                <div className="row no-gutters mb-3" style={divStyle} key={employee.id}>
                        <div className='col-4'>
                            <img src={employee.profileImageUrl} className="rounded-circle float-left" alt='hahah'/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{employee.firstName} {employee.lastName.charAt(0).toUpperCase()}.</h5>
                                <p className="small">{employee.totalHours} hours</p>
                            </div>
                        </div>
                </div>
            )
        })
    }

    public componentDidMount(): void {
        this.props.getBookings();
    }

    public render() {
        if (!this.props.bookings.length) {
            return <div>Loading...</div>
        }
        return <div>
            <h3 className='mb-5'>Employee stats</h3>
            {this.renderList()}
        </div>;
    }
}

const getLeadingEmployees = (bookings: any) => {
    moment.defaultFormat = "DD-MM-YYYY";
    const formattedArr: any[] = [];

    forIn(bookings, (employeeDeals) => {
        forOwn(employeeDeals, (deal) => {
            if (!employeeDeals.totalHours) {
                employeeDeals.totalHours = 0;
            }
            const x = moment(deal.checkInDate, moment.defaultFormat);
            const y = moment(deal.checkOutDate, moment.defaultFormat);
            employeeDeals.totalHours += moment.duration(y.diff(x)).asHours();
        });
        const employee = {
            id: get(employeeDeals, '0.employee.id'),
            firstName: get(employeeDeals, '0.employee.firstName'),
            lastName: get(employeeDeals, '0.employee.lastName'),
            profileImageUrl: get(employeeDeals, '0.employee.profileImageUrl'),
            totalHours: get(employeeDeals, 'totalHours'),
        };
        formattedArr.push(employee);
    });

    return orderBy(formattedArr, ['totalHours'], ['desc']).slice(0, 3);
};

const divStyle = {
    width: '40%',
    border: 'none'
};


const mapStateToProps = (state: any) => {
    return {bookings: state.bookings};
};

export default connect(mapStateToProps, {getBookings})(EmployeeList);
