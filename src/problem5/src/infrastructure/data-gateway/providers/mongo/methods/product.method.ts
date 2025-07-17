import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductPayload, GetProductPayload, GetProductsPayload, UpdateProductPayload } from 'src/infrastructure/data-gateway/types/product.type';
import { NormalizeAndEscape } from 'src/shared/regex';
import { MongoGatewayService } from '../mongo-gateway.service';

function generateFilter(condition) {
    const filter: any = {
        deletedAt: { $exists: false },
    };
    if (condition.name) {
        filter.name = new RegExp(NormalizeAndEscape(condition.name), 'i');
    }

    if (condition.status) {
        filter.status = condition.status;
    }

    return filter;
}

export async function CreateProduct(payload: CreateProductPayload): Promise<ProductEntity> {
    const ctx = this as MongoGatewayService;
    const product = (await ctx.Product.create(payload)).toJSON();
    return new ProductEntity(product);
}

export async function GetProduct({ condition }: GetProductPayload): Promise<ProductEntity> {
    const ctx = this as MongoGatewayService;
    const filterCondition: any = {
        deletedAt: { $exists: false },
        ...condition,
    };
    const product = await ctx.Product.findOne(filterCondition).lean<ProductEntity>();

    return product;
}

export async function UpdateProduct({ condition, payload }: UpdateProductPayload): Promise<ProductEntity> {
    const ctx = this as MongoGatewayService;
    const product = await ctx.Product.findOneAndUpdate(condition, payload, { new: true }).lean<ProductEntity>();

    return product;
}

export async function GetProducts(payload: GetProductsPayload): Promise<ProductEntity[]> {
    const ctx = this as MongoGatewayService;
    const { condition, pagination } = payload;

    const filter = generateFilter(condition);
    const skip = (pagination.pageNumber - 1) * pagination.pageSize;
    const limit = pagination.pageSize;
    const orderBy = pagination.orderBy === 'desc' ? -1 : 1;
    const sort = { [pagination.sortBy]: orderBy, _id: orderBy };

    const products = await ctx.Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(<any>sort)
        .lean<ProductEntity[]>();

    return products;
}

export async function CountProducts(condition: GetProductPayload['condition']): Promise<number> {
    const ctx = this as MongoGatewayService;

    const filter = generateFilter(condition);

    const countProducts = await ctx.Product.countDocuments(filter);

    return countProducts;
}
