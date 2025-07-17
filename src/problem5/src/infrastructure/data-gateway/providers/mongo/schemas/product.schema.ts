import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatusEnum } from 'src/entities/product.entity';

@Schema({
    collection: 'products',
    timestamps: true,
    versionKey: false,
})
export class ProductSchemaClass {
    @Prop({
        required: true,
        type: String,
    })
    name: string;

    @Prop({
        type: String,
    })
    imageUrl: string;

    @Prop({
        type: String,
    })
    description: string;

    @Prop({
        type: String,
        enum: ProductStatusEnum,
        default: ProductStatusEnum.ACTIVE,
    })
    status: string;

    @Prop({
        type: Date,
    })
    deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductSchemaClass);

ProductSchema.index({ name: 1 });
ProductSchema.index({ deletedAt: 1, status: 1 });
