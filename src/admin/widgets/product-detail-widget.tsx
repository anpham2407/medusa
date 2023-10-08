import type { WidgetConfig } from "@medusajs/admin"
import { Link } from "react-router-dom"

const ProductWidget = () => {
  return (
    <div
      className="bg-white p-8 border border-gray-200 rounded-lg">
      <h1>Product Detail Widget</h1>
    </div>
  )
}

export const config: WidgetConfig = {
  zone: "product.list.before",
}

export default ProductWidget