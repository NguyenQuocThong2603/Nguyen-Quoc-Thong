import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductPayload, GetProductPayload, GetProductsPayload, UpdateProductPayload } from './types/product.type';

export abstract class DataGateway {
    abstract CreateProduct: (payload: CreateProductPayload) => Promise<ProductEntity>;
    abstract GetProduct: (payload: GetProductPayload) => Promise<ProductEntity>;
    abstract UpdateProduct: (payload: UpdateProductPayload) => Promise<ProductEntity>;
    abstract GetProducts: (payload: GetProductsPayload) => Promise<ProductEntity[]>;
    abstract CountProducts: (condition: GetProductsPayload['condition']) => Promise<number>;
}
