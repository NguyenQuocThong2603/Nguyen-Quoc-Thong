import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductEntity, ProductStatusEnum } from 'src/entities/product.entity';
import { DataGateway } from 'src/infrastructure/data-gateway/data-gateway.abstract';
import { ErrorMessage } from 'src/shared/error-message';

type UpdateProductPayload = {
    name?: string;
    description?: string;
    imageUrl?: string;
    status?: ProductStatusEnum;
};

@Injectable()
export class UpdateProduct {
    constructor(@Inject(DataGateway) private readonly dataGateway: DataGateway) {}

    async execute(id: string, payload: UpdateProductPayload): Promise<ProductEntity> {
        const existProduct = await this.dataGateway.GetProduct({
            condition: { _id: id },
        });
        if (!existProduct) {
            throw new BadRequestException(ErrorMessage.RESOURCE_NOT_FOUND('Product'));
        }
        const { name } = payload;

        if (name) {
            const existProduct = await this.dataGateway.GetProduct({
                condition: { name },
            });

            if (existProduct) {
                throw new BadRequestException(ErrorMessage.RESOURCE_ALREADY_EXISTS('Product'));
            }
        }

        const product = await this.dataGateway.UpdateProduct({
            condition: { _id: id },
            payload,
        });

        return product;
    }
}
