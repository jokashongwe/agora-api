import { Module } from '@nestjs/common';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:eMDiXM6xjB7BnCaK@crmcluster.870hn.mongodb.net/car_mananger?retryWrites=true&w=majority'),
    UtilisateurModule
  ],
})
export class AppModule {}
