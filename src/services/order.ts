import { Lifetime } from "awilix"
import { EntityManager } from 'typeorm';
import { Order, OrderService as MedusaOrderService } from "@medusajs/medusa";
import { OrderRepository } from '../repositories/order';
import { User } from "../models/user";
import { MedusaError } from 'medusa-core-utils';

import { FindConfig, buildQuery } from "@medusajs/medusa"

type OrderSelector = {
    q?: string;
    store_id?: string;
    store: any;
    order_parent_id: string;
    children: any;
}
type InjectedDependencies = {
    manager: EntityManager;
    orderRepository: typeof OrderRepository;
    customerService: any;
    paymentProviderService: any;
    shippingOptionService: any;
    shippingProfileService: any;
    discountService: any;
    fulfillmentProviderService: any;
    fulfillmentService: any;
    lineItemService: any;
    totalsService: any;
    regionService: any;
    cartService: any;
    addressRepository: any;
    giftCardService: any;
    draftOrderService: any;
    inventoryService: any;
    eventBusService: any;
    loggedInUser?: User;
    orderService: OrderService;
};

class OrderService extends MedusaOrderService {
    static LIFE_TIME = Lifetime.SCOPED
    private readonly manager: EntityManager;
    private readonly orderRepository: typeof OrderRepository;
    readonly container: InjectedDependencies;

    protected readonly loggedInUser_: User | null

    constructor(container: InjectedDependencies) {
        // @ts-expect-error prefer-rest-params
        super(container);
        // super(...arguments)

        this.manager = container.manager;
        this.container = container;
        this.orderRepository = container.orderRepository;
        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (e) {
            // avoid errors when backend first runs
        }
    }

    async listAndCount(selector: OrderSelector, config?: any): Promise<[Order[], number]> {
        if (!selector.store_id && this.loggedInUser_?.store_id) {
          selector.store_id = this.loggedInUser_.store_id
        }
    
        config.select?.push('store_id')
    
        config.relations?.push('store')
    
        return await super.listAndCount(selector, config)
    }

    // public async retrieve(orderId: string, config?: FindConfig<Order>): Promise<Order> {
    //     const orderRepo = this.manager_.withRepository(this.orderRepository);
    //     const validatedId = orderId;
    //     const query = buildQuery({ id: validatedId }, config);
    //     const order = await orderRepo.findOne(query);

    //     if (!order) {
    //         throw new MedusaError(MedusaError.Types.NOT_FOUND, `Order with id: ${orderId} was not found`);
    //     }

    //     return order as Order;
    // }
}

export default OrderService