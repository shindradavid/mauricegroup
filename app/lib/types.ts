import type {
  CakeOrderDepositPaymentMethod,
  CakeOrderDepositStatus,
  CakeOrderSource,
  CommissionRequestStatus,
  ExternalCakeOrderStatus,
} from './enums';

export interface ApiResponse<T> {
  success: boolean;
  payload: T;
  message?: string;
}

export interface MutationArgs {
  onError: (message: string | null | undefined) => void;
  onSuccess: (message: string | null | undefined) => void;
}

export interface User {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  photoUrl: string;
  isMarketeer: boolean;
  createdAt: string;
}

export interface CakePriceFilter {
  name: string;
  value: any;
  color: string;
}

export interface CakeCategory {
  id: string;
  name: string;
  slug: string;
  photoUrl: string;
}

export interface Cake {
  id: string;
  name: string;
  photoUrl: string;
  price: number;
}

export interface CommissionRequest {
  id: string;
  amount: number;
  status: CommissionRequestStatus;
  rejectionReason: string | null;
}

export interface CakeOrder {
  id: string;
  receiverName: string;
  receiverPhoneNumber: string;
  cakeWritings: string;
  price: number;
  deliveryDateTime: string;
  photos: string[];
  externalStatus: ExternalCakeOrderStatus;
  deliveryLocation: string;
  source: CakeOrderSource;
  description: string;
  deposits: CakeOrderDeposit[];
  commissionRequests: CommissionRequest[];
}

export interface CakeOrderDeposit {
  id: string;
  cakeOrder: CakeOrder;
  paymentDate: string;
  paymentMethod: CakeOrderDepositPaymentMethod;
  amount: number;
  transactionReference: string | null;
  status: CakeOrderDepositStatus;
  confirmedAt: string | null;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  slogan: string;
  logoUrl: string;
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StaffUser {
  id: string;
  name: string;
  photoUrl: string;
  phoneNumber: string;
}

export interface GetCompanyByDomainResponse {
  company: Company;
  staff: StaffUser[];
}

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  photoUrl: string;
}

export interface Feedback {
  id: string;
  caption: string;
  photoUrl: string;
}

export interface EventPhoto {
  id: string;
  name: string;
  slug: string;
  urls: string[];
}

export interface SchoolGalleryImage {
  id: string;
  caption: string | null;
  photoUrl: string;
}
