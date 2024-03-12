import { Controller, Get, Header } from '@nestjs/common';

@Controller('/ping')
export class PingController {
  @Get()
  @Header('content-type', 'text/plain')
  async getProfile() {
    return 'pong';
  }
}
