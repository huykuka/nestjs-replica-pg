import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  read(): Promise<void> {
    return this.appService.read();
  }

  @Post()
  write(){

  }

}
