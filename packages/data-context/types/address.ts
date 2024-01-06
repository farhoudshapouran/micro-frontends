export type IAddressItem = {
  id: string;
  name: string;
  primary: boolean;
  fullAddress: string;
  phoneNumber: string;
  addressType: "Home" | "Office";
};
