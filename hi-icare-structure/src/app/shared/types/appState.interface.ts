import { AuthStateInterface } from "src/app/auth/types/authState.interface"
import { prsnlStateInterface } from "./prsnl.interface"
export interface appStateInterface {
    auth: AuthStateInterface
}
export interface persnlStateInterface {
    persnl: prsnlStateInterface
}