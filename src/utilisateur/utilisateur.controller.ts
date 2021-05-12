import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UtilisateurDto } from './models/utilisateur.dto';
import { UtilisateurService } from './utilisateur.service'

@Controller('utilisateur')
export class UtilisateurController {
    constructor(private utilisateurService: UtilisateurService){}

    @Get()
    public getUtilisateurs(){
        //à supprimer
        return this.utilisateurService.getUtilisateurs();
    }

    @Post()
    public postUtilisateur(@Body() user: UtilisateurDto){
        return this.utilisateurService.postUtilisateur(user);
    }

    @Get(':username')
    public getUtilisateurByUsername(@Param('username') username: string){
        return this.utilisateurService.getUtilisateurByUsername(username);
    }

}
