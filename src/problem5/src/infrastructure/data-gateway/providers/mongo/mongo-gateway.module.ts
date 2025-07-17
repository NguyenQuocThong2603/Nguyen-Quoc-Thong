import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataGateway } from '../../data-gateway.abstract';
import { MongoGatewayService } from './mongo-gateway.service';
import { ProductSchema, ProductSchemaClass } from './schemas';

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductSchemaClass.name, schema: ProductSchema }])],
    providers: [
        {
            provide: DataGateway,
            useClass: MongoGatewayService,
        },
    ],
    exports: [DataGateway],
})
export class MongoGatewayModule {}
