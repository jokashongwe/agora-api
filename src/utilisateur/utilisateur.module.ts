import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UtilisateurSchema } from './schemas/utilisateur.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Utilisateur',
        schema: UtilisateurSchema
      }
    ])
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService]
})
export class UtilisateurModule { }
