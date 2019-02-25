import axios from 'axios';

export default axios.create({
    baseURL: 'https://interview-booking-api.herokuapp.com/api'
})
