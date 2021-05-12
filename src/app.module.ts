import { Module } from '@nestjs/common';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:eMDiXM6xjB7BnCaK@crmcluster.870hn.mongodb.net/car_mananger?retryWrites=true&w=majority'),
    UtilisateurModule,
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule {}
