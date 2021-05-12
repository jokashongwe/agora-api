import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
//import { JwtAuthGuard } from "./auth/jwt_auth.guard";
import { LocalAuthGuard } from "./auth/local_auth.guard";

@Controller('utilisateur')
export class AppController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}