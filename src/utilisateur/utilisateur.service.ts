import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { UtilisateurDocument } from './interfaces/utilisateur.interface';
import { Model } from 'mongoose';
import { UtilisateurDto } from './models/utilisateur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
    constructor(@InjectModel('Utilisateur') private readonly utilisateurModel: Model<UtilisateurDocument>) { }

    public async getUtilisateurs(): Promise<UtilisateurDto[]> {
        const users = await this.utilisateurModel.find().exec();
        if (!users || !users[0]) {
            return [];
        }
        return users;
    }

    public async getUtilisateurByUsername(username: string): Promise<UtilisateurDto> {
        const user = await this.utilisateurModel.findOne({ username }).exec();
        if (!user) {
            throw new HttpException('No user corresponding to this request', 404);
        }
        return user;
    }

    private hashPassword(playTextPassword: string): string{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(playTextPassword, salt);
    }

    public async postUtilisateur(nouvelUtilisateur: UtilisateurDto) {
        nouvelUtilisateur.isActive = false;
        nouvelUtilisateur.password = this.hashPassword(nouvelUtilisateur.password);
        const user = new this.utilisateurModel(nouvelUtilisateur);
        const r = await user.save();
        if (!r) {
            throw new HttpException('User could not be created due to some server probles', 501);
        }
        return {
            username: nouvelUtilisateur.username,
            profile: nouvelUtilisateur.profile || {},
            paymentInfo: nouvelUtilisateur.paymentInfo || {},
            createdDate: nouvelUtilisateur.createdDate,
            isActive: nouvelUtilisateur.isActive
        }
    }

    public async putUtilisateurByUsername(username: string, 
        propertyName: string, 
        propertyValue: string): Promise<any>{

        const user = await this.utilisateurModel.findOneAndUpdate({ username }, {
            [propertyName]: propertyValue
        }).exec();
        if(!user){
            throw new HttpException('No User Found to Update', 404);
        }
        return user;
        
    }

    public async deleteUtilisateurByUsername(username: string): Promise<any> {
        const user = await this.utilisateurModel.findOneAndUpdate({ username }, {
            isActive: false
        }).exec();
        if (!user) {
            throw new HttpException('User not found to Deactivate/Delete', 404);
        }
        return {
            username: user.username,
            profile: user.profile || {},
            paymentInfo: user.paymentInfo || {},
            createdDate: user.createdDate,
            isActive: user.isActive
        };
    }

}
