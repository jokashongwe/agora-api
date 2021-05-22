import { Module } from '@nestjs/common';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:eMDiXM6xjB7BnCaK@crmcluster.870hn.mongodb.net/car_mananger?retryWrites=true&w=majority'),
    UtilisateurModule,
    AuthModule,
    ProductsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
