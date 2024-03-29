export interface UserType{
    createdAt: {};
    email:string;
    id:string;
    name:string;
    picture:string;
    user_id:string;
}

export interface UserInfoType{
    _id?:string;
    fullName:string | null | any;
    email:string | any;
    password:string | null | any;
    profileImg?:string | undefined;
    phone?:string | number | any;
    role?:string;
}