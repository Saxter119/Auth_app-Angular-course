
import { User } from "./user.interface";

export interface CheckLoginResponse {
    user:  User;
    token: string;
}