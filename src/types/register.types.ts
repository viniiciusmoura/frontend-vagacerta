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
}

export type CompanyRegister = {
    socialReason: string;
    cnpj: string;
    areaOfActivity: string;
    user?: number; 
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