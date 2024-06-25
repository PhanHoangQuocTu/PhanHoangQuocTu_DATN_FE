export const ORDER_STATUS_VALUE = {
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS_VALUE.processing,
    label: 'Processing',
  },
  {
    value: ORDER_STATUS_VALUE.shipped,
    label: 'Delivering',
  },
  {
    value: ORDER_STATUS_VALUE.delivered,
    label: 'Delivered',
  },
  {
    value: ORDER_STATUS_VALUE.cancelled,
    label: 'Cancelled',
  },
];

export const PAYMENT_STATUS_VALUE = {
  PAID: 'true',
  UNPAID: 'false',
};

export const PAYMENT_STATUS_OPTION = [
  {
    value: PAYMENT_STATUS_VALUE.PAID,
    label: 'Paid',
  },
  {
    value: PAYMENT_STATUS_VALUE.UNPAID,
    label: 'Unpaid',
  },
];
