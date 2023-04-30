import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RefreshAccessTokenDto } from 'src/modules/auth/dto/refresh-access-token.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
// import { MailService } from 'src/modules/mail/mail.service';
import { UsersService } from 'src/modules/users/users.service';
import { IUser } from '../users/users.interface';
import { UserID } from 'src/shared/decorators/get-user-id.decorator';
import { ACCESS_TOKEN_HEADER_NAME } from 'src/shared/constants';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth(ACCESS_TOKEN_HEADER_NAME)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService, // private readonly mailService: MailService,
  ) {}

  @Get('/current')
  @ApiOperation({
    operationId: 'current',
    description: 'Get information of current user',
    summary: 'Get information of current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  @UseGuards(JwtAuthGuard)
  async currentUser(@UserID() userId: string): Promise<IUser> {
    const user = await this.userService.findUserById(userId);
    return user;
  }

  @Post('login')
  @ApiOperation({
    operationId: 'login',
    description: 'Login',
    summary: 'Login',
  })
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh-access-token')
  @ApiOperation({
    operationId: 'refresh-access-token',
    description: 'Refresh access-token',
    summary: 'Refresh access-token',
  })
  @ApiBody({
    type: RefreshAccessTokenDto,
  })
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<Partial<ResponseLogin>> {
    return await this.authService.refreshAccessToken(refreshAccessTokenDto);
  }
}
