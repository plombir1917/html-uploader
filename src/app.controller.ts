import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  async downloadPages(@Body() data: { urls: string[]; proxies?: string[] }) {
    const { urls, proxies } = data;
    return await this.appService.downloadPages(urls, proxies);
  }
}
