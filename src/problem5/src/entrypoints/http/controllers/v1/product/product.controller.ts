import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductStatusEnum } from 'src/entities/product.entity';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'src/shared/pagination-options';
import { CreateProduct } from 'src/use-cases/v1/product/create-product';
import { DeleteProduct } from 'src/use-cases/v1/product/delete-product';
import { GetProduct } from 'src/use-cases/v1/product/get-product';
import { GetProducts } from 'src/use-cases/v1/product/get-products';
import { UpdateProduct } from 'src/use-cases/v1/product/update-product';
import { CreateProductPayload } from './types/create-product.type';
import { GetProductsRequest } from './types/get-products.type';
import { UpdateProductPayload } from './types/update-product.type';

@Controller()
export class ProductController {
    constructor(
        @Inject(CreateProduct) private readonly createProduct: CreateProduct,
        @Inject(GetProduct) private readonly getProduct: GetProduct,
        @Inject(GetProducts) private readonly getProducts: GetProducts,
        @Inject(UpdateProduct) private readonly updateProduct: UpdateProduct,
        @Inject(DeleteProduct) private readonly deleteProduct: DeleteProduct,
    ) {}
    @Post('/v1/products')
    @ApiTags('CreateProduct')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                imageUrl: { type: 'string' },
                status: { type: 'string', enum: Object.values(ProductStatusEnum) },
            },
            required: ['name', 'status'],
        },
    })
    async CreateProduct(@Body() payload: CreateProductPayload) {
        const product = await this.createProduct.execute(payload);

        return {
            data: { product },
        };
    }
    @Get('/v1/products/:id')
    @ApiTags('ProductDetail')
    async GetProduct(@Param('id') id: string) {
        const product = await this.getProduct.execute(id);

        return {
            data: { product },
        };
    }

    @Get('/v1/products')
    @ApiTags('GetProducts')
    @ApiQuery({
        name: 'GetProductsRequest',
        schema: {
            type: 'object',
            properties: {
                page_number: { type: 'string', default: '1' },
                page_size: { type: 'string', default: '10' },
                name: { type: 'string' },
                status: { type: 'string' },
                sort_by: { type: 'string' },
                order_by: { type: 'string' },
            },
        },
    })
    async GetProducts(@Query() query: GetProductsRequest) {
        const pagination = {
            pageNumber: query?.page_number ? parseInt(query?.page_number) : DEFAULT_PAGE_NUMBER,
            pageSize: query?.page_size ? parseInt(query?.page_size) : DEFAULT_PAGE_SIZE,
            orderBy: query?.order_by || 'desc',
            sortBy: query?.sort_by || 'createdAt',
        };

        const condition = {};

        if (query?.name) {
            condition['name'] = query.name;
        }

        if (query?.status) {
            condition['status'] = query.status;
        }

        const result = await this.getProducts.execute({ condition, pagination });

        return {
            data: result,
        };
    }

    @Patch('/v1/products/:id')
    @ApiTags('UpdateProduct')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                imageUrl: { type: 'string' },
                status: { type: 'string', enum: Object.values(ProductStatusEnum) },
            },
        },
    })
    async UpdateProduct(@Param('id') id: string, @Body() payload: UpdateProductPayload) {
        const product = await this.updateProduct.execute(id, payload);

        return {
            data: { product },
        };
    }

    @Delete('/v1/products/:id')
    @ApiTags('DeleteProduct')
    async DeleteProduct(@Param('id') id: string) {
        await this.deleteProduct.execute(id);
    }
}
