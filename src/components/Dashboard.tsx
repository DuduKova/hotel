import * as React from "react";
import {connect} from "react-redux";
import {IState} from 'src/store/types';
import {getDashboardTotals} from '../store/actions';

interface IMyComponentProps {
    dashboard: IState;
    getDashboardTotals: any;
}

class Dashboard extends React.Component<IMyComponentProps, []> {

    public componentDidMount(): void {
        this.props.getDashboardTotals();
        setInterval(() => {
            this.props.getDashboardTotals()
        } , 10000);
    }

    public render() {
        if (!this.props.dashboard.checkedIn) {
            return <div>Loading...</div>;
        }
        return (<nav className='navbar navbar-expand-lg navbar-light bg-light text-center row'>
                <div className='col-4'>{this.props.dashboard.availableRooms} <div className='small'>Available Rooms</div></div>
                <div className='col-4'>{this.props.dashboard.reservedRooms} <div className='small'>Reserved Rooms</div></div>
                <div className='col-4'>{this.props.dashboard.checkedIn} <div className='small'>Checked In</div></div>
            </nav>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {dashboard: state.dashboard};
};

export default connect(mapStateToProps, {getDashboardTotals})(Dashboard);
