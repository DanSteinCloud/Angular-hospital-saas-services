import { prsnlStateInterface } from './prsnl.interface';
export interface CurrrentUserInterface {
    code: number
    message: string
    result: {
        token: string
        userId: string
        roleIds: [number]
    }
}