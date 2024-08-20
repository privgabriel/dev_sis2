interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    birth_date: Date;
    active: boolean;
  }
  
  export default IUser;