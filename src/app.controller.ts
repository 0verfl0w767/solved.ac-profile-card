import { Controller, Get, Header, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('player')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':battletag')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'public, max-age=' + 1800)
  async getHello(@Param('battletag') battletag: string): Promise<string> {
    console.log(battletag);
    return this.appService.getCard(battletag);
  }
}
