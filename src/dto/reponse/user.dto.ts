import { Survey } from "../../entity/Survey";

export  class UserResDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
    surveys?: Survey[]; // optional, include surveys if needed

    constructor(user: any) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        this.isVerified = user.isVerified;
        this.surveys = user.surveys || []; 
    }
}
