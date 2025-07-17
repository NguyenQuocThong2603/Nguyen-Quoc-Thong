import { ProductStatusEnum } from 'src/entities/product.entity';

export type CreateProductPayload = {
    name: string;
    description?: string;
    imageUrl?: string;
    status: ProductStatusEnum;
};
