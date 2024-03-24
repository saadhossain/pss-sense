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
    fullName:string | null;
    email:string;
    password:string | null;
    profileImg?:string | undefined;
    phone?:string | number;
}