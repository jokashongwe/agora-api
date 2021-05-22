import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './model/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('search')
  public async search(@Query() query): Promise<ProductDto[]> {
    let page = 1;
    if (query.page) {
      page = query.page;
    }
    const aliResult = await this.productService.searchAliexpress(
      query.keyword,
      page,
    );
    const amazonResult = await this.productService.searchAmazon(
      query.keyword,
      page,
    );
    return [...aliResult, ...amazonResult];
  }
}
