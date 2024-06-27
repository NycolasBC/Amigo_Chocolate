export interface IConviteRegistration {
    idGrupo: number;
    nomeGrupo: string;
    nomeUsuario: string;
    emailConvidado: string;
    descricao: string;
    id_Status: number;
}

export interface IConvite {
    idConvite: number;
    idGrupo: number;
    nomeGrupo: string;
    nomeUsuario: string;
    descricao: string;
    id_Status: number;
}