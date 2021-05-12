import {TProfile, TPaymentInfo} from '../interfaces/utilisateur.interface'

export class UtilisateurDto{
    username: string;
    password: string;
    createdDate: Date;
    isActive: boolean;
    profile: TProfile;
    paymentInfo: TPaymentInfo;
}