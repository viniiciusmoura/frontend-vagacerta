import { CompanyRegister } from "./register.types";

export type Vacancies = {
    id?: number;
    office: string;
    description: string;
    salary: number;
    foodVoucher: boolean;
    mealVoucher: boolean;
    formContract: string;
    company?: CompanyRegister;
}