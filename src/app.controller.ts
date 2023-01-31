import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
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
    const csavarRepo=this.dataSource.getRepository(Csavar);
    csavarRepo.save(csavar);
  }

  @Delete('/csavar/:id')
  deleteCsaver(@Param('id')id:number){
    const csavarRepo=this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

}
