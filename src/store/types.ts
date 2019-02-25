export interface IEmployee {
    id: number,
    firstName: string,
    lastName: string,
    profileImageUrl: string,
    totalDays: number
}

export interface IBooking {
    id: number,
    firstName: string,
    lastName: string,
    roomType: string,
    checkInDate: string,
    checkOutDate: string,
    employee?: IEmployee,
    totalDays?: number
}

export interface IState {
    availableRooms: number,
    reservedRooms: number,
    checkedIn: number,
    weekAvailabilityPercent: number,
    bookings: IBooking[]
}
