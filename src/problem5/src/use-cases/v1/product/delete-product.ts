import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataGateway } from 'src/infrastructure/data-gateway/data-gateway.abstract';
import { ErrorMessage } from 'src/shared/error-message';

@Injectable()
export class DeleteProduct {
    constructor(@Inject(DataGateway) private readonly dataGateway: DataGateway) {}

    async execute(id: string): Promise<void> {
        const existProduct = await this.dataGateway.GetProduct({
            condition: { _id: id },
        });

        if (!existProduct) {
            throw new BadRequestException(ErrorMessage.RESOURCE_NOT_FOUND('Product'));
        }

        await this.dataGateway.UpdateProduct({
            condition: { _id: id },
            payload: {
                deletedAt: new Date(),
            },
        });
    }
}
