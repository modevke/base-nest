import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'

type SeederConfig = {
    seeds?: string[]
    factories?: string[]
}

type CustomOrmConfig = TypeOrmModuleOptions & SeederConfig

const settings: any = config.get('db.postgres')

const ormConfig: CustomOrmConfig = {
    ...settings,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    synchronize: false,
    cli: {
        migrationsDir: `${__dirname}/migrations/**/*{.ts,.js}`
    },
    seeds: [`${__dirname}/seeders/seeds/**/*{.ts,.js}`],
    factories: [`${__dirname}/seeders/factories/**/*{.ts,.js}`]
}

export default ormConfig