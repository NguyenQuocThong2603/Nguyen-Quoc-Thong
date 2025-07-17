import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Boostrap');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, stopAtFirstError: true }));

    const swaggerConfig = new DocumentBuilder().setTitle('Ecommerce Store API').setVersion('1.0').build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, swaggerDocument);

    await app.listen(process.env.PORT);
    logger.log(`Server is starting on port: ${process.env.PORT}`);
}

(async () => {
    await bootstrap();
})();
