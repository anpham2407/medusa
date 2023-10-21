import { Entity, OneToMany, JoinColumn } from "typeorm"
import {
  Store as MedusaStore,
} from "@medusajs/medusa"
import { User } from "./user";
import { Product } from "./product";
import { Order } from './order';

@Entity()
export class Store extends MedusaStore {
  //   @OneToMany(() => User, (user) => user?.store)
  // members?: User[];

  //   @OneToMany(() => Product, (product) => product?.store)
  // products?: Product[];

  //   @OneToMany(() => Order, (order) => order.store)
  //   @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  // orders: Order[];


  @OneToMany(() => User, (user) => user.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  members: User[];

  @OneToMany(() => Product, (product) => product.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  products: Product[];

  @OneToMany(() => Order, (order) => order.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  orders: Order[];

  // @OneToMany(() => Invite, (invite) => invite.store)
  // @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  // invites: Invite[];

  // @OneToMany(() => Role, (role) => role.store)
  // @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  // roles: Role[];

}