export const API_ROOT = 'http://34.171.212.41:8080/'
export const API_BASE = `${API_ROOT}api/v1/`

export const ARTICLES_GET_ALL_ARTICLES = () => `${API_BASE}articles`;
export const ARTICLES_ADD_NEW_ARTICLE = () => `${API_BASE}articles`;
export const ARTICLES_GET_ARTICLE_DETAILS = (articleId) => `${API_BASE}articles/${articleId}`;
export const ARTICLES_GET_ARTICLE = (articleId) => `${API_BASE}articles/${articleId}/get`;
export const ARTICLES_GET_AND_UPDATE_ARTICLE = (articleId) => `${API_BASE}articles/${articleId}`;

export const BUYOUTS_GET_ALL_BUYOUTS = () => `${API_BASE}buyouts`
export const BUYOUTS_CREATE_NEW_BUYOUT = () => `${API_BASE}buyouts`
export const BUYOUTS_CHANGE_BUYOUT_STATUS_TO_CHECK_PAYMENT = (id) => `${API_BASE}buyouts/${id}/payment`
export const BUYOUTS_GET_BUYOUT_STATUS = (id) => `${API_BASE}buyouts/${id}/status`
export const BUYOUTS_GET_PAYMENT_QR = (id) => `${API_BASE}buyouts/${id}/payment/qrcode`

export const AUTHENTICATE = () => `${API_BASE}auth/authenticate`
export const GET_USER_INFO = () => `${API_BASE}users`


export const GET_OPERATIONS_HISTORY = () => `${API_BASE}payments`
export const TOPUP_BALANCE = () => `${API_BASE}payments`

export const GET_DELIVERY_ADDRESSES = () => `${API_ROOT}pickuppoints`