import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataGateway } from '../../../../infrastructure/data-gateway/data-gateway.abstract';

import { CountProducts, CreateProduct, GetProduct, GetProducts, UpdateProduct } from './methods/product.method';
import { ProductSchemaClass } from './schemas';

@Injectable()
export class MongoGatewayService implements DataGateway {
    constructor(@InjectModel(ProductSchemaClass.name) readonly Product: Model<ProductSchemaClass>) {}
    GetProducts: typeof GetProducts;
    CreateProduct: typeof CreateProduct;
    GetProduct: typeof GetProduct;
    UpdateProduct: typeof UpdateProduct;
    CountProducts: typeof CountProducts;
}

MongoGatewayService.prototype.GetProducts = GetProducts;
MongoGatewayService.prototype.CreateProduct = CreateProduct;
MongoGatewayService.prototype.GetProduct = GetProduct;
MongoGatewayService.prototype.UpdateProduct = UpdateProduct;
MongoGatewayService.prototype.CountProducts = CountProducts;
