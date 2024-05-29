export interface ChildData {
    childId: string;
    name: {
        fullName: string,
        firstName: string,
        middleName: string,
        lastName: string
    },
    image: string
    checkedIn: boolean;
    checkinTime: string;
}