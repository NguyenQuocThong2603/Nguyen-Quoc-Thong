import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpEntrypointModule } from './entrypoints/http/http-entrypoint.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGO_URI || 'mongodb://localhost:27017/99-tech-challenge',
            }),
        }),
        ConfigModule.forRoot({}),
        HttpEntrypointModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
