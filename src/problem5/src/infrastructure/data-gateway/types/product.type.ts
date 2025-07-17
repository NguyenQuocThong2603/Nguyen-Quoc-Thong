import { ProductStatusEnum } from 'src/entities/product.entity';
import { PaginationOptions } from 'src/shared/pagination-options';

export type CreateProductPayload = {
    name: string;
    description?: string;
    imageUrl?: string;
    status: ProductStatusEnum;
};

export type GetProductsPayload = {
    condition: {
        name?: string;
        status?: string;
    };
    pagination: PaginationOptions;
};

export type GetProductPayload = {
    condition: {
        _id?: string;
        name?: string;
    };
};

export type UpdateProductPayload = {
    condition: {
        _id: string;
    };
    payload: {
        name?: string;
        description?: string;
        imageUrl?: string;
        status?: ProductStatusEnum;
        deletedAt?: Date;
    };
};
