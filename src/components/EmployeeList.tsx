import {forIn, forOwn, get, groupBy, omit, orderBy} from 'lodash';
// @ts-ignore
import moment from 'moment';
import * as React from "react";
import {connect} from "react-redux";
import {IBooking, IEmployee} from 'src/store/types';
import {getBookings} from '../store/actions';
import EmployeeItem from "./EmployeeItem";

interface IMyComponentProps {
    bookings: IBooking[];
    getBookings: any;
}

class EmployeeList extends React.Component<IMyComponentProps, []> {

    public renderList() {
        // @ts-ignore
        const formattedList: IEmployee[] = getLeadingEmployees(omit(groupBy(this.props.bookings, 'employee.id'), undefined));
        return formattedList.map((employee, index) => {
            if (index < 3) {
                return (
                    <EmployeeItem employee={employee} key={employee.id} leadingStyle={leadingStyle}/>
                )
            }
            return (
                <EmployeeItem employee={employee} key={employee.id}/>
            )
        })
    }

    public componentDidMount(): void {
        this.props.getBookings();
    }

    public render() {
        if (!this.props.bookings.length) {
            return <div className='display-1 text-center'>Loading...</div>
        }
        return <div>
            <h3 className='mb-5 text-white'>Employee stats</h3>
            {this.renderList()}
        </div>;
    }
}

const getLeadingEmployees = (bookings: any) => {
    moment.defaultFormat = "DD-MM-YYYY";
    const formattedArr: IEmployee[] = [];

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

    return orderBy(formattedArr, ['totalHours'], ['desc']);
};

const leadingStyle = 'leading';

const mapStateToProps = (state: any) => {
    return {bookings: state.bookings};
};

export default connect(mapStateToProps, {getBookings})(EmployeeList);
