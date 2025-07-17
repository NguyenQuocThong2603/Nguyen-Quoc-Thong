import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductEntity, ProductStatusEnum } from 'src/entities/product.entity';
import { DataGateway } from 'src/infrastructure/data-gateway/data-gateway.abstract';
import { ErrorMessage } from 'src/shared/error-message';

type CreateProductPayload = {
    name: string;
    description?: string;
    imageUrl?: string;
    status: ProductStatusEnum;
};

@Injectable()
export class CreateProduct {
    constructor(@Inject(DataGateway) private readonly dataGateway: DataGateway) {}

    validate(payload: CreateProductPayload) {
        if (!payload.name) {
            throw new BadRequestException(ErrorMessage.REQUIRED_FIELD('name'));
        }

        if (!payload.status) {
            throw new BadRequestException(ErrorMessage.REQUIRED_FIELD('status'));
        }
    }

    async execute(payload: CreateProductPayload): Promise<ProductEntity> {
        this.validate(payload);
        const { name } = payload;
        const existProduct = await this.dataGateway.GetProduct({
            condition: { name },
        });

        if (existProduct) {
            throw new BadRequestException(ErrorMessage.RESOURCE_ALREADY_EXISTS('Product'));
        }
        const product = await this.dataGateway.CreateProduct(payload);

        return product;
    }
}
