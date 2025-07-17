import { Module } from '@nestjs/common';
import { UseCaseV1Module } from '../../../use-cases/use-case.v1.module';
import { ProductController } from './v1/product/product.controller';

@Module({
    imports: [UseCaseV1Module],
    controllers: [ProductController],
})
export class ControllerV1Module {}
