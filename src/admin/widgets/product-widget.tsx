import type { WidgetConfig } from "@medusajs/admin"
import { Link } from "react-router-dom"

const ProductWidget = () => {
  return (
    <div
      className="bg-white p-8 border border-gray-200 rounded-lg">
      <h1>Product Widget</h1>
      <Link to={"/a/orders"}>
        View Orders
      </Link>
    </div>
  )
}

export const config: WidgetConfig = {
  zone: "product.details.after",
}

export default ProductWidget