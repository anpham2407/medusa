import {
  AbstractFileService,
  EventBusService,
  OrderService,
    ProductService,
  ProductVariant,
} from "@medusajs/medusa"
import LineItemRepository from "@medusajs/medusa/dist/repositories/line-item"
import OrderRepository from "@medusajs/medusa/dist/repositories/order"
import PaymentRepository from "@medusajs/medusa/dist/repositories/payment"
import ShippingMethodRepository from "@medusajs/medusa/dist/repositories/shipping-method"
import { EntityManager } from "typeorm"
import MyNotificationService from "../services/my-notification"

type InjectedDependencies = {
  eventBusService: EventBusService
  orderService: OrderService
  // sendgridService: any
  fileService: AbstractFileService
    orderRepository: typeof OrderRepository;
    productService: ProductService;
    manager: EntityManager;
    lineItemRepository: typeof LineItemRepository;
    shippingMethodRepository: typeof ShippingMethodRepository;
    paymentRepository: typeof PaymentRepository;
  myNotificationService: MyNotificationService
}

interface ProductVariantMedia extends Omit<ProductVariant, 'product_medias'> {
  product_medias?: string[];
}
  
  class HandleOrderSubscribers {
    protected readonly orderService_: OrderService
    // protected readonly sendgridService_: any
    protected readonly fileService_: AbstractFileService
    protected readonly myNotificationService_: any;

    private readonly manager: EntityManager;
    private readonly eventBusService: EventBusService;
    private readonly orderService: OrderService;
    private readonly orderRepository: typeof OrderRepository;
    private readonly productService: ProductService;
    private readonly lineItemRepository: typeof LineItemRepository;
    private readonly shippingMethodRepository: typeof ShippingMethodRepository;
  
    constructor({ 
      eventBusService, 
      orderService,
      orderRepository,
      productService,
      manager,
      lineItemRepository,
      shippingMethodRepository,
      // sendgridService,
      fileService,
      myNotificationService
    }: InjectedDependencies) {
      this.orderService_ = orderService
      // this.sendgridService_ = sendgridService
      this.fileService_ = fileService
      this.myNotificationService_ = myNotificationService
      eventBusService.subscribe(
        "order.placed", 
        this.handleOrderPlaced
      )
    }
  
    handleOrderPlaced = async (
      data: Record<string, any>
    ) => {
      const order = await this.orderService_.retrieve(data.id, {
        relations: [
          "items", 
          "items.variant", 
          "items.variant.product_medias",
        ],
      })
  
      // find product medias in the order
      const urls = []
      for (const item of order.items) {
        const variant: ProductVariantMedia = item.variant;
        if (!variant.product_medias.length) {
          return
        }
  
        await Promise.all([
            variant.product_medias.forEach(
            async (productMedia: any) => {
            // get the download URL from the file service
            const downloadUrl = await 
              this.fileService_.getPresignedDownloadUrl({
                fileKey: productMedia.file_key,
                isPrivate: true,
              })
  
            urls.push(downloadUrl)
          }),
        ])
      }
      await this.myNotificationService_.handleOrderPlaced(order);
      if (!urls.length) {
        return
      }
      console.log("Download");
  
    //   this.sendgridService_.sendEmail({
    //     templateId: "digital-download",
    //     from: "hello@medusajs.com",
    //     to: order.email,
    //     dynamic_template_data: {
    //       // any data necessary for your template...
    //       digital_download_urls: urls,
    //     },
    //   })
  }
}

export default HandleOrderSubscribers