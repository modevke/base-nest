import { Module } from '@nestjs/common';
import { RestModule } from './channels/rest/rest.module';
import { WebSocketModule } from './channels/web-socket/web-socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig  from './db/ormconfig'
import { BullModule } from '@nestjs/bull'
import * as config from 'config'
import { ThrottlerModule } from '@nestjs/throttler'

const { host, port, password, username } = config.get('db.redis')
const { ttl, limit } = config.get('server.rateLimit')

@Module({
  imports: [
    RestModule, 
    WebSocketModule,
    TypeOrmModule.forRoot(ormConfig),
    BullModule.forRoot({ redis: { host: host, port: port } }),
    ThrottlerModule.forRoot({ ttl, limit }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
