
export interface User {
    id: number;
    email:string;
    firstname:string;
    imageUrl:string;
    lastname:string;
    phone:string;
    role:'ADMIN' | 'USER';
}
  