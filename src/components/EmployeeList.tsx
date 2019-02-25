import {forOwn, get, groupBy, omit, orderBy} from 'lodash';
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
                <div className="card mb-3" style={divStyle} key={employee.id}>
                    <div className="row no-gutters">
                        <div className='col-4'>
                            <img src={employee.profileImageUrl} className="card-img" alt='hahah'/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{employee.firstName} {employee.lastName}</h5>
                                <p className="small">{employee.totalDays} hours</p>
                            </div>
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
            <h1>Employee stats</h1>
            {this.renderList()}
        </div>;
    }
}

const getLeadingEmployees = (bookings: any) => {
    moment.defaultFormat = "DD-MM-YYYY";
    const formattedArr = [];
    for (let i = 1; i < Object.keys(bookings).length + 2; i++) {
        if (!bookings[i]) {
            continue;
        }

        forOwn(bookings[i], (value: any) => {
            if (!bookings[i].totalDays) {
                bookings[i].totalDays = 0
            }
            const x = moment(value.checkInDate, moment.defaultFormat);
            const y = moment(value.checkOutDate, moment.defaultFormat);
            bookings[i].totalDays += moment.duration(y.diff(x)).asHours();
        });

        if (get(bookings[i], '0.employee.id')) {
            const employee = {
                id: get(bookings[i], '0.employee.id'),
                firstName: get(bookings[i], '0.employee.firstName'),
                lastName: get(bookings[i], '0.employee.lastName'),
                profileImageUrl: get(bookings[i], '0.employee.profileImageUrl'),
                totalDays: get(bookings[i], 'totalDays'),
            };
            formattedArr.push(employee);
        }
    }
    return orderBy(formattedArr, ['totalDays'], ['desc']).slice(0, 3);
};

const divStyle = {
    width: '40%'
};


const mapStateToProps = (state: any) => {
    return {bookings: state.bookings};
};

export default connect(mapStateToProps, {getBookings})(EmployeeList);
