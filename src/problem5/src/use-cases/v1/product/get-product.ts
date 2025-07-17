import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DataGateway } from 'src/infrastructure/data-gateway/data-gateway.abstract';

@Injectable()
export class GetProduct {
    constructor(@Inject(DataGateway) private readonly dataGateway: DataGateway) {}

    async execute(id: string): Promise<ProductEntity> {
        const product = await this.dataGateway.GetProduct({
            condition: { _id: id },
        });

        return product;
    }
}
