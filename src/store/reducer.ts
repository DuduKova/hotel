import {combineReducers} from 'redux';

const bookingReducer = (state = [] , action: { type: string; payload: any; }) => {
    switch (action.type) {
        case 'GET_BOOKINGS':
            return action.payload;
        default: return state;
    }
};

const dashboardReducer = (state = [] , action: { type: string; payload: any; }) => {
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
