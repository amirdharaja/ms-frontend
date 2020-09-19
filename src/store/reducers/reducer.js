import * as ActionTypes from '../actions/ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    token: null,
    error: null,
    isAuthenticated: false,
    category_details: [],
    main_slide_images: [],
    sub_slide_images: [],
    loading: true,

    ordered_items: [],
    orders_count: [],

    shipping_charge: 60,
}

const authStart = (state, action) => {
    return updateObject(state, {
        ...state,
        error: null,
        loading: true,
        alertVisible: false,
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        ...state,
        token: action.token,
        error: null,
        loading: true,
        isAuthenticated: true,
        alertVisible: false,
    });
}

const authFail = (state, action) => {
    let messages = ''
    let title = ''
    if (action.error.response !== undefined) {
        if (action.error.response.status === 400) { messages = 'Unable to Login, Try agian with Correct username and password'; title = 'Login Faild'; }
        else if (action.error.response.status === 401) { messages = 'Un authorized access'; title = 'Unauthorized'; }
        else if (action.error.response.status === 404) { messages = 'User not found'; title = 'Username not found'; }
        else {
            messages = action.error.response.data.error; title = 'Sorry';
            return updateObject(state, {
                ...state,
                error: action.error,
                loading: false,
                messageTitle: title,
                messages: messages,
                alertType: 'danger',
                alertVisible: true,
                loginModal: true,
                otpVerificationButton: true
            });
        }
    }
    else { messages = 'Username and Password canot be empty'; title = 'Sorry'; }
    return updateObject(state, {
        ...state,
        error: action.error,
        loading: false,
        messageTitle: title,
        messages: messages,
        alertType: 'danger',
        alertVisible: true,
        loginModal: true,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        ...state,
        token: null,
        isAuthenticated: false,
        cart_count: 0,
        favourite_count: 0,
        alertVisible: false,
        messages: ''
    });
}

const homeData = (state, action) => {
    return updateObject({
        ...state,
        category_details: action.data.category_details,
        main_slide_images: action.data.main_slide_images,
        sub_slide_images: action.data.sub_slide_images,
        cart_count: action.data.cart_count,
        favourite_count: action.data.favourite_count,
        alertVisible: false,
        loading: false,
    });
}

const ordersData = (state, action) => {
    return updateObject(state, {
        ...state,
        cart_count: action.data.cart_count,
        favourite_count: action.data.favourite_count,
        ordered_items: action.data.ordered_items,
        orders_count: action.data.orders_count,
    });
}

const checkout = (state, action) => {
    return updateObject(state, {
        ...state,
        cart: action.data.carts,
        address: action.data.address,
        pincode: action.data.pincode,
        city: action.data.city,
        cart_count: action.data.cart_count,
        favourite_count: action.data.favourite_count,
        cart_total_amount: action.data.cart_total_amount,
        wallet_balance: action.data.wallet_balance,
        shipping_charge: action.data.shipping_charge,
    });
}

const category = (state, action) => {
    return updateObject(state, {
        ...state,
        category_details: action.data,
    });
}

const offMessage = (state) => {
    return updateObject(state, {
        ...state,
        alertVisible: false,
        messages: null,
    });
}

const verifyOtp = (state, action) => {
    if (action.data === 400) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'OTP mismatch',
            messageTitle: 'Sorry',
            alertType: 'danger',
            otpModal: true
        });
    }
    else if (action.data === 200) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'OTP verified, Now you can Login into your Store',
            messageTitle: 'Success',
            alertType: 'success',
            otpModal: false,
            loginModal:true,
            registerModal:false,
            otpVerificationButton: false,
        });
    }
}

const handleResendOtp = (state, action) => {
    if (action.data === 400) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'OTP send error',
            messageTitle: 'Sorry',
            alertType: 'danger',
            otpModal: true
        });
    }
    else if (action.data === 200) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'OTP successfully send to your mobile number',
            messageTitle: 'Success',
            alertType: 'success',
            otpModal: true,
            loginModal:false,
            registerModal:false,
            otpVerificationButton: false,
        });
    }
}

const register = (state, action) => {
    if (action.data === 400) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'Mobile or email ID already exists',
            messageTitle: 'Sorry',
            alertType: 'danger',
            otpModal: false,
        });
    }
    else if (action.data === 502) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'Server error, Try again',
            messageTitle: 'Sorry',
            alertType: 'warning',
            otpModal: false,
        });
    }
    else if (action.data === 200) {
        return updateObject(state, {
            ...state,
            alertVisible: true,
            messages: 'OTP is successfully sent to your mobile number',
            messageTitle: 'Success',
            alertType: 'success',
            otpModal: true,
        });
    }
}

export const handleLoginModal = (state) => {
    return updateObject(state, {
        ...state,
        loginModal: !state.loginModal,
        alertVisible: false,
        registerModal: false,
    });
}

export const handleRegisterModal = (state) => {
    return updateObject(state, {
        ...state,
        registerModal: !state.registerModal,
        alertVisible: false,
        loginModal: false
    });
}

export const handleOtpModal = (state) => {
    return updateObject(state, {
        ...state,
        otpModal: !state.otpModal,
        alertVisible: false,
    });
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START: return authStart(state, action);
        case ActionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case ActionTypes.AUTH_FAIL: return authFail(state, action);
        case ActionTypes.AUTH_LOGOUT: return authLogout(state, action);

        case ActionTypes.HOME_DATA: return homeData(state, action);
        case ActionTypes.ORDERS_DATA: return ordersData(state, action);
        case ActionTypes.CHECKOUT: return checkout(state, action);
        case ActionTypes.CATEGORY: return category(state, action);
        case ActionTypes.MESSAGE: return offMessage(state, action);
        case ActionTypes.OTP: return verifyOtp(state, action);
        case ActionTypes.RESEND_OTP: return handleResendOtp(state, action);
        case ActionTypes.REGISTER: return register(state, action);
        case ActionTypes.LOGIN_MODAL: return handleLoginModal(state, action);
        case ActionTypes.REGISTER_MODAL: return handleRegisterModal(state, action);
        case ActionTypes.OTP_MODAL: return handleOtpModal(state, action);

        default:
            return state;
    }
}

export default Reducer;