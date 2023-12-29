export interface User {
    id?: number;
    firstName?: string;
    secondName?: string;
    lastFirstName?: string;
    lastSecondName?: string;
    birthDayDate?: Date;
    nickName?: string;
    email?: string;
    createdDate?: Date;
    updatedDate?: Date;
    password?: string;
    gender?: Gender;
    phoneCodeArea?: string;
    phoneNumber?: string;
  }
  
  export enum Gender {
    Male = 1,
    Female = 2,
    Other = 3
  }