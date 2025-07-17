export enum ProductStatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export class ProductEntity {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    status: ProductStatusEnum;

    constructor(payload) {
        this._id = payload._id.toString();
        this.name = payload.name || '';
        this.description = payload.description || '';
        this.imageUrl = payload.imageUrl || '';
        this.status = payload.status;
    }
}
