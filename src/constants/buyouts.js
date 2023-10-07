export const BUYOUT_STATUSES = {
  CREATED: 'CREATED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  DELIVERY: 'DELIVERY',
  CHECK_PAYMENT: 'CHECK_PAYMENT',
  ERROR: 'ERROR'
}

export const BUYOUT_STATUSES_NAMES = {
  [BUYOUT_STATUSES.CREATED]: 'Создаётся выкуп',
  [BUYOUT_STATUSES.AWAITING_PAYMENT]: 'Ожидает оплату',
  [BUYOUT_STATUSES.DELIVERY]: 'Доставка',
  [BUYOUT_STATUSES.CHECK_PAYMENT]: 'Проверка оплаты',
  [BUYOUT_STATUSES.ERROR]: 'Ошибка'
}