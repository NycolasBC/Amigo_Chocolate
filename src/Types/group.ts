export type GroupRegistrationType = {
    image?: string;
    name: string;
    qtdUsers: string;
    amount: string;
    dtReveal: string;
    description?: string;
}

export interface IGrupoUsuario {
    IdGrupo: number;
    IdUsuario: number;
    Id_Status: number
}

export interface IGrupo {
    IdGrupo: number;
    Imagem?: string;
    Nome: string;
    QtdUsuario: number;
    Valor: number;
    DataRevelacao: string;
    Descricao?: string;
    Id_Status: number;
}