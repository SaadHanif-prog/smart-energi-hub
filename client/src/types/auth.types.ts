export type Signup = {
    id : string;
    username : string;
    email : string;
    password : string;
    createdAt : string;
    updatedAt : string;
}

export type CreateSignup = Omit<Signup,  "id" | "createdAt" | "updatedAt">

export type SignupApiResponse = {
    success : boolean;
    message : string;
    data : Omit<Signup, "password">
}

export type Login = {
    id : string;
    email : string;
    password : string;
    createdAt : string;
    updatedAt : string;
}

export type CreateLogin = Omit<Login, "id" | "createdAt"| "updatedAt">

export type LoginApiResponse = {
    success : boolean;
    message : string;
    data : Omit<Login, "password">
}

export type ErrorResponse = { message: string };



