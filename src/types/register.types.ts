import { DefineComponent } from "vue";
import { User } from "./user.types";

export type CandidateRegister = {
    name: string;
    generalRegister: string;
    cpf: string;
    sex: string;
    birthdate: string;
    user: User | null;
}

export type CompanyRegister = {
    socialReason: string;
    cnpj: string;
    areaOfActivity: string;
    user: User | null;
}

export type Experience = {
    company: string;
    office: string;
    description: string;
    startDate: string;
    endDate: string;
}

export type Vacancies = {
    office: string;
    description: string;
    salary: number;
    foodVoucher: boolean;
    mealVoucher: boolean;
    formContract: string;
}