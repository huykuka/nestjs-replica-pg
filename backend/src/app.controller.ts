import {Controller, Get, Post, Put} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    read() {
        return this.appService.read();
    }

    @Post()
    write() {
        return this.appService.write();
    }

    @Put()
    readPrimary() {
        return this.appService.readPrimary();
    }
}
