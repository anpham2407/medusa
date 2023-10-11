import { 
    AbstractFileService, 
    EventBusService, 
    OrderService,
    ProductVariant,
} from "@medusajs/medusa"
import MyNotificationService from "../services/my-notification"

type InjectedDependencies = {
    eventBusService: EventBusService
    orderService: OrderService
    // sendgridService: any
    fileService: AbstractFileService
    myNotificationService: MyNotificationService
}

interface ProductVariantMedia extends Omit<ProductVariant, 'product_medias'> {
    product_medias?: string[];
}
  
  class HandleOrderSubscribers {
    protected readonly orderService_: OrderService
    // protected readonly sendgridService_: any
    protected readonly fileService_: AbstractFileService
    protected readonly myNotificationService_: any
  
    constructor({ 
      eventBusService, 
      orderService, 
      // sendgridService,
      fileService,
      myNotificationService,
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
          "items.variant"
        ],
      })
  
      // find product medias in the order
      // const urls = []
      // for (const item of order.items) {
      //   const variant: ProductVariantMedia = item.variant;
      //   if (!variant.product_medias.length) {
      //     return
      //   }
  
      //   await Promise.all([
      //       variant.product_medias.forEach(
      //       async (productMedia: any) => {
      //       // get the download URL from the file service
      //       const downloadUrl = await 
      //         this.fileService_.getPresignedDownloadUrl({
      //           fileKey: productMedia.file_key,
      //           isPrivate: true,
      //         })
  
      //       urls.push(downloadUrl)
      //     }),
      //   ])
      // }
      
      // if (!urls.length) {
      //   return
      // }
      await this.myNotificationService_.handleOrderPlaced(order);
      console.log("donr");
  
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