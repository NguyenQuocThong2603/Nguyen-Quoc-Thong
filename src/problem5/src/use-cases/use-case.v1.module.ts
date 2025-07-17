import { Module } from '@nestjs/common';
import { DataGatewayModule } from '../infrastructure/data-gateway/data-gateway.module';
import { CreateProduct } from './v1/product/create-product';
import { DeleteProduct } from './v1/product/delete-product';
import { GetProduct } from './v1/product/get-product';
import { GetProducts } from './v1/product/get-products';
import { UpdateProduct } from './v1/product/update-product';

@Module({
    imports: [DataGatewayModule],
    providers: [CreateProduct, GetProduct, UpdateProduct, GetProducts, DeleteProduct],
    exports: [CreateProduct, GetProduct, UpdateProduct, GetProducts, DeleteProduct],
})
export class UseCaseV1Module {}
