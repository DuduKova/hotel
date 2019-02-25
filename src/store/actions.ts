import bookingApi from '../api/booking';

export const getBookings = () => async (dispatch: any) => {
    const res = await bookingApi.get('/bookings');
    dispatch({type: 'GET_BOOKINGS', payload: res.data})
};

export const getDashboardTotals = () => async (dispatch: any) => {
    const res = await bookingApi.get('/booking-snapshot');
    dispatch({type: 'GET_DASHBOARD_TOTALS', payload: res.data})
};

