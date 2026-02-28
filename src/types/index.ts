export interface PhoneListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface PhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface Phone {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: PhoneSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: PhoneListItem[];
}

export interface CartItem {
  cartId: string;
  phoneId: string;
  name: string;
  brand: string;
  imageUrl: string;
  colorName: string;
  storageCapacity: string;
  price: number;
}
