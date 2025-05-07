/* eslint-disable ts/consistent-type-definitions */

// Interface for address
interface Address {
  street: string;
  wardCommune: string;
  district: string;
  cityProvince: string;
}

// Type for contact information
export type Contact = {
  email: string;
  phoneNumber?: string;
};

// Union of different object interfaces using & for intersection
export type User = {
  fullName: string;
} & (
  | { type: 'customer'; shippingAddress: Address }
  | { type: 'employee'; department: string }
  | { type: 'partner'; contactDetails: Contact }
);
