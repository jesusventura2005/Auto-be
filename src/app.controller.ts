import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Request() req): Promise<string> {
    const accessTokenPayload: AccessTokenPayload = req.user as AccessTokenPayload;
    return await this.appService.getHello(accessTokenPayload.userId);
  }
}
