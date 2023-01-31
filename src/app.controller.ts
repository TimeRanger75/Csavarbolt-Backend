import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar, Rendeles } from './csavarbolt.entity';

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

  @Post('csavar/:id/rendeles')
   async insertRendeles(@Param('id')id:number, @Body()rendeles:Rendeles){
      const csavarRepo=this.dataSource.getRepository(Csavar);
      const rendelesRepo=this.dataSource.getRepository(Rendeles);
      let csavar=(await csavarRepo.findOneBy({id:id})).keszlet;
      rendeles.id=undefined;
      rendeles.csavar=id;
      if (csavar-rendeles.db>0) {
        csavarRepo.update({id:id}, {keszlet:csavar-rendeles.db});
        rendelesRepo.save(rendeles);
        return{
          "osszar": rendeles.db *(await csavarRepo.findOneBy({id:id})).ar
        }
      }else{
        return{
          "error":"Nincs elég csavar",
        }
      }
    }
  


}
