import { ProductStatusEnum } from 'src/entities/product.entity';

export type GetProductsRequest = {
    page_number?: string;
    page_size?: string;
    sort_by?: string;
    order_by?: string;
    name?: string;
    status?: ProductStatusEnum;
};
