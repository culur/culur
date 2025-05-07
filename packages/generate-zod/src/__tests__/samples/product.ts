import type { PermissionLevel, Status } from './product-enum';

// Union of different strings
type PaymentMethod = 'cash' | 'credit_card' | 'bank_transfer';

// Basic interface with various primitive data types
export interface BasicProduct {
  id: number;
  name: string;
  price: number;
  isSold: boolean;
  createdAt: Date;
  status: Status;
  permission?: PermissionLevel; // Optional field using the enum without assigned values
}

// Interface inheritance (extends) from BasicProduct
export interface DetailedProduct extends BasicProduct {
  description?: string; // Optional property
  dimensions: string | { length: number; width: number }; // Union of string and object
  acceptedPaymentMethods?: PaymentMethod[];
}

// Using Partial to create a type with all optional properties
export type OptionalBasicProduct = Partial<BasicProduct>;

// Using Required to create a type with all required properties (in case of previous Partial)
export type RequiredDetailedProduct = Required<DetailedProduct>;
