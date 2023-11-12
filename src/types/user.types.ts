export type User = {
    id?: number;
    email: string;
    password?: string;
    termUser?: boolean;
    termService?: boolean;
    typeRegister?: string;
}