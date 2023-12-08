import { Component, DefineComponent } from "vue";
import { User } from "./user.types";

export type UserRegister = {
    typeAccount: CandidateRegister | CompanyRegister | null;
    user: User;
}

export type CandidateRegister = {
    name: string;
    generalRegister: string;
    cpf: string;
    sex: string;
    birthdate: string;
    user?: number;
}

export type CompanyRegister = {
    id?: number;
    socialReason: string;
    cnpj: string;
    areaOfActivity: string;
    user?: number; 
}

export type UpdateCompany = {
    socialReason: string;
    cnpj: string;
    areaOfActivity: string;
}

export type Experience = {
    id?:number;
    company: string;
    office: string;
    description: string;
    startDate: string;
    endDate: string;
    candidate?: any;
}

export type Vacancies = {
    id?:number;
    office: string;
    description: string;
    salary: number;
    foodVoucher: boolean;
    mealVoucher: boolean;
    formContract: string;
    company?: any
}

export type StepItem = {
    title: string;
    value: number;
}

export type StepWindow = {
    componet: Component; 
    value: number;
}