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
    IdUsuario: number;
    Foto?: string;
    Nome: string;
    Email: string;
    Senha: string;
    Id_Status: number;

}