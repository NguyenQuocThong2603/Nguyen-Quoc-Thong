import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity, ProductStatusEnum } from 'src/entities/product.entity';
import { DataGateway } from 'src/infrastructure/data-gateway/data-gateway.abstract';
import { PaginationOptions } from 'src/shared/pagination-options';

type GetProductsRequest = {
    condition: {
        name?: string;
        status?: ProductStatusEnum;
    };
    pagination: PaginationOptions;
};

type GetProductsResponse = {
    products: ProductEntity[];
    pagination: {
        totalSize: number;
        pageNumber: number;
        pageSize: number;
    };
};

@Injectable()
export class GetProducts {
    constructor(@Inject(DataGateway) private readonly dataGateway: DataGateway) {}

    async execute({ condition, pagination }: GetProductsRequest): Promise<GetProductsResponse> {
        const [products, countProducts] = await Promise.all([
            this.dataGateway.GetProducts({
                condition,
                pagination,
            }),
            this.dataGateway.CountProducts(condition),
        ]);

        return {
            products,
            pagination: {
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize,
                totalSize: countProducts,
            },
        };
    }
}
