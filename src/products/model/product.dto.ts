export class ProductDto {
  displayTitle: string;
  salePrice: number;
  currencyCode: string;
  provider: string;
  image: string;
  shippingCost: string;
  productId: number;

  constructor(params: any) {
    this.displayTitle = params.displayTitle;
    this.salePrice = params.salePrice;
    this.currencyCode = params.currencyCode;
    this.provider = params.provider;
    this.image = params.image;
    this.shippingCost = params.shippingCost;
    this.productId = params.productId;
  }
}
