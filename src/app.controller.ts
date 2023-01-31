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

  @Post('/csavar')
  insertCsaver(@Body()csavar:Csavar){
    csavar.id=undefined;
    const csavarRepo=this.dataSource.getTreeRepository(Csavar);
    csavarRepo.save(csavar);
  }


}
