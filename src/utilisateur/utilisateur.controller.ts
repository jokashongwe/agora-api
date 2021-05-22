import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { UtilisateurDto } from './models/utilisateur.dto';
import { UtilisateurService } from './utilisateur.service';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private utilisateurService: UtilisateurService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public getUtilisateurs() {
    //à supprimer
    return this.utilisateurService.getUtilisateurs();
  }

  @Post('register')
  public postUtilisateur(@Body() user: UtilisateurDto) {
    return this.utilisateurService.postUtilisateur(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  public getUtilisateurByUsername(@Param('username') username: string) {
    return this.utilisateurService.getUtilisateurByUsername(username);
  }
}
