import { BaseService } from "medusa-interfaces";

const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

class MyNotificationService extends BaseService {
  telegramNotificationService_;

  constructor({ telegramNotificationService }) {
    super();

    this.telegramNotificationService_ = telegramNotificationService;
  }

  handleOrderPlaced(order) {
    console.log('begin order');
    // const customerInfo = `${[order.customer.email, order.customer.phone].filter((e) => e).join(" - ")}`;
    const customerInfo = `customerInfo`;
    const message = [
      `💌 Order *#${order.display_id}* placed successfully`,
      `📝 Order details: [view](${ADMIN_BASE_URL}/a/orders/${order.order_id})`,
      `🍭 Customer: ${customerInfo} ([details](${ADMIN_BASE_URL}/a/customers/customer_id))`,
      `🚚 Shipping address: ${order.shipping_district}, ${order.shipping_city}`,
    ].join("\n");

    const payload = {
      chat_ids: [TELEGRAM_GROUP_ID],
      text: message,
      parse_mode: "Markdown",
    };

    this.telegramNotificationService_.sendMessage(payload);
  }
}

export default MyNotificationService;