
export type CompanyDTO = {
    id: number;
    socialReason: string;
    cnpj: string;
    areaOfActivity: string;
    vacancies: any;
    addresses: any;
}

export type CandidateDTO = {
    id: number;
    name: string;
    cpf: string;
    generalRegister: string;
    sex: string;
    birthdate: string;
}