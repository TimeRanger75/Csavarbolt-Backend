import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavarbolt.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get('/csavar')
  listCsavarok(){
    const csavarRepo=this.dataSource.getRepository(Csavar)
    return csavarRepo.find();
  }
}
