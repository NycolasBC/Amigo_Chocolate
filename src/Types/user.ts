export type UserLoginType = {
    email: string;
    password: string;
}

export type UserSignUpType = {
    image: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUser {
    idUsuario: number;
    foto?: string;
    nome: string;
    email: string;
    senha: string;
    id_Status: number;

}