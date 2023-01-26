import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class ProductController {
    private productsService;
    private readonly client;
    constructor(productsService: ProductService, client: ClientProxy);
    all(): Promise<import("./product.entity").Product[]>;
    create(title: string, image: string): Promise<import("./product.entity").Product>;
    get(id: number): Promise<import("./product.entity").Product>;
    update(id: number, title: string, image: string): Promise<import("./product.entity").Product>;
    delete(id: number): Promise<void>;
    like(id: number): Promise<any>;
}
