import {combineReducers, Reducer} from 'redux';
import {IBooking, IState} from "./types";

const bookingReducer: Reducer<IBooking[]> = (state: IBooking[] = [] , action: { type: string; payload: any; }) => {
    switch (action.type) {
        case 'GET_BOOKINGS':
            return action.payload;
        default: return state;
    }
};

// @ts-ignore
const dashboardReducer: Reducer<IState> = (state = {} , action: { type: string; payload: any; }) => {
    switch (action.type) {
        case 'GET_DASHBOARD_TOTALS':
            return action.payload;
        default: return state;
    }
};

export default combineReducers({
    bookings: bookingReducer,
    dashboard: dashboardReducer
});
