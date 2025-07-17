import { Global, Module } from '@nestjs/common';
import { MongoGatewayModule } from './providers/mongo/mongo-gateway.module';

@Global()
@Module({
    imports: [MongoGatewayModule],
    exports: [MongoGatewayModule],
})
export class DataGatewayModule {}
