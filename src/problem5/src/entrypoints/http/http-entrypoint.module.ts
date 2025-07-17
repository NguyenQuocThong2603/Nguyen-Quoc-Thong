import { Module } from '@nestjs/common';
import { ControllerV1Module } from './controllers/controller.v1.module';

@Module({
    imports: [ControllerV1Module],
})
export class HttpEntrypointModule {}
