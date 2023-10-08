import { RouteConfig } from "@medusajs/admin"
import CustomIcon from "../../components/shared/icons/active-circle-dotted-line"

const CustomPage = () => {
  return (
    <div>
      This is my custom route
    </div>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Custom Route",
    icon: CustomIcon,
  },
}

export default CustomPage