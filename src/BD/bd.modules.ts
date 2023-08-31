import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Zah14$01471983',
        database:'api',
        entities: [],
        autoLoadEntities: true,
        synchronize:false,
      }),
    ],
  })
  export class BdModule {}