import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userSevrice: UtilisateurService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        //console.log(`Username: ${username} -\n- Pass: ${password}`);
        const user = await this.userSevrice.getUtilisateurByUsername(username);
        try {
            if (user && bcrypt.compareSync(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
        } catch (error) {
            //console.log(error);
            return null;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
