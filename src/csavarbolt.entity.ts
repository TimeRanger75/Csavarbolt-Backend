import { Column, Entity, JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Csavar{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tipus:string;

    @Column('int')
    hossz:number;

    @Column('int')
    keszlet:number;

    @Column({type:'decimal', precision:10, scale:2, default:0 })
    ar:number;

    @OneToMany(()=> Rendeles, (rendeles)=> rendeles.csavar)
    rendelesek:Rendeles[]
}

@Entity()
export class Rendeles{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=> Csavar, (csavar)=> csavar.rendelesek)
    csavar:Csavar;

    @Column('int')
    db:number;

}