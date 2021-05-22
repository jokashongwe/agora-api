import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductDto } from './model/product.dto';

@Injectable()
export class ProductsService {
  private rapidApiOption: any;
  constructor(private httpService: HttpService) {
    this.rapidApiOption = {
      aliExpress: {
        url: 'https://ali-express1.p.rapidapi.com/search',
        headers: {
          'x-rapidapi-key':
            'c2d1db1d94msh3794ee68657eb86p1d7f60jsn95359e62701f',
          'x-rapidapi-host': 'ali-express1.p.rapidapi.com',
        },
      },
      amazon: {
        url: 'https://amazon24.p.rapidapi.com/api/product',
        headers: {
          'x-rapidapi-key':
            'c2d1db1d94msh3794ee68657eb86p1d7f60jsn95359e62701f',
          'x-rapidapi-host': 'amazon24.p.rapidapi.com',
        },
      },
    };
  }

  async searchAliexpress(keyword: string, page = 1): Promise<ProductDto[]> {
    const result = await this.httpService
      .get(this.rapidApiOption.aliExpress.url, {
        headers: this.rapidApiOption.aliExpress.headers,
        params: {
          page: `${page}`,
          query: keyword,
          page_size: '10',
        },
      })
      .toPromise();
    //console.log('XX result', result);
    return new Promise((resolve) => {
      const content = result.data.data.searchResult.mods.itemList.content;
      const productList: ProductDto[] = new Array<ProductDto>();
      if (!content) {
        return resolve([]);
      }
      content.forEach((item) => {
        productList.push(
          new ProductDto({
            displayTitle: `${item.title.displayTitle}`,
            image: `${item.image.imageUrl}`,
            salePrice: item.prices.sale_price.minPrice + 0,
            currencyCode: `${item.prices.sale_price.currencyCode}`,
            provider: 'AliExpress',
            shippingCost: `${item.logistics.logisticsDesc}`,
            productId: item.productId,
          }),
        );
      });
      return resolve(productList);
    });
  }

  async searchAmazon(keyword: string, page = 1): Promise<ProductDto[]> {
    const result = await this.httpService
      .get(this.rapidApiOption.amazon.url, {
        headers: this.rapidApiOption.amazon.headers,
        params: {
          country: 'FR',
          keyword: keyword,
          page: `${page}`,
        },
      })
      .toPromise();
    //console.log('XX result', result);
    return new Promise((resolve) => {
      const content = result.data.docs;
      const productList: ProductDto[] = new Array<ProductDto>();
      if (!content) {
        return resolve([]);
      }
      content.forEach((item) => {
        if (item.app_sale_price !== null) {
          productList.push(
            new ProductDto({
              displayTitle: `${item.product_title}`,
              image: `${item.product_main_image_url}`,
              salePrice: item.app_sale_price,
              currencyCode: `${item.app_sale_price_currency}`,
              provider: 'Amazon',
              shippingCost: `See at ${item.product_detail_url}`,
              productId: item.product_id,
            }),
          );
        }
      });
      return resolve(productList);
    });
  }
}
