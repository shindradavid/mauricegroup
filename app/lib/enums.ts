export enum CakeOrderDepositStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
}

export enum CakeOrderDepositPaymentMethod {
  CASH = 'cash',
  MTN_MOBILE_MONEY = 'mtn mobile money',
  AIRTEL_MOBILE_MONEY = 'airtel mobile money',
  BANK = 'bank',
  YO_UGANDA = 'yo uganda',
}

export enum CakeOrderSource {
  INTERNAL_APP = 'internal app',
  EXTERNAL_APP = 'external app',
}

export enum ExternalCakeOrderStatus {
  PENDING = 'pending',
  SENT_TO_BAKERY = 'sent to bakery',
  BAKING = 'baking',
  FINISHED_BAKING = 'finished baking',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  DELETED = 'deleted',
}

export enum CommissionRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
}
