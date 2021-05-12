import * as mongoose from 'mongoose';

export type TProfile = {
    email: string,
    firstname: string,
    lastname: string,
    photo: string,
    cover:string,
    shippingAdress: string,
    country: string,
    phone: string
}

export type TPaymentInfo = {
    cardHolderName: string,
    cardHolderNumber: string,
    isMobileMoney: boolean,
    cardLastDigit: number,
}

interface IUtilisateur{
    username: string;
    password: string;
    createdDate: Date;
    isActive: boolean;
    profile: TProfile;
    paymentInfo: TPaymentInfo
}

export type UtilisateurDocument = IUtilisateur & mongoose.Document;