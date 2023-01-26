import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private productsService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {

    }
    @Get()
    async all() {
        return this.productsService.all();
    }

    @Post()
    async create(
        @Body('title') title: string,
        @Body('image') image: string,
    ) {
        const product = await this.productsService.create({
            title,
            image
        });

        this.client.emit('product_created', product);
        return product;
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.productsService.get(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('image') image: string
    ) {
        await this.productsService.update(id, {
            title,
            image
        });

        const product = await this.productsService.get(id);
        this.client.emit('product_updated', product);
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.productsService.delete(id);
        this.client.emit('product_deleted', id);
   
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product: any = await this.productsService.get(id);
        product.likes++;
        return this.productsService.update(id, {
            likes: product.likes + 1
        });
    }
}
