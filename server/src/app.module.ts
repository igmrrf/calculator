import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorModule } from './calculator/calculator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [config],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const user = encodeURIComponent(config.get('mongo.user'));
        const password = encodeURIComponent(config.get('mongo.pass'));
        const host = config.get<string>('mongo.host');
        const name = config.get<string>('mongo.name');
        const auth = config.get<string>('mongo.auth');
        const port = config.get<number>('mongo.port');

        let connectionString = `mongodb://${host}:${port}/${name}`;
        if (auth === 'true') {
          connectionString = `mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority`;
        }
        return { uri: connectionString };
      },
      inject: [ConfigService],
    }),

    CalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
