export type GroupRegistrationType = {
    image?: string;
    name: string;
    qtdUsers: string;
    amount: string;
    dtReveal: string;
    description?: string;
}

export interface IGrupoUsuario {
    idGrupo: number;
    idUsuario: number;
    id_Status: number
}

export interface IGrupo {
    idGrupo: number;
    imagem?: string;
    nome: string;
    qtdUsuario: number;
    valor: number;
    dataRevelacao: string;
    descricao?: string;
    id_Status: number;
}