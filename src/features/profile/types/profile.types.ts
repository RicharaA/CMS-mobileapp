export interface StudentProfile {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;

    program: string;
    semester: number;
    enrollmentYear: number;

    fee: {
        total: number;
        paid: number;
        remaining: number;
    };
}