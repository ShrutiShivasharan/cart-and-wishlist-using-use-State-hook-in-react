// import { createContext } from "react";export const CartContext = createContext();

// export const initialState = {
//     cart: [],
//     wishlist: [],
//     totalAmount: 0,
//     totalQuantity: 0,
// };

// export const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             const itemInCart = state.cart.find(item => item.id === action.payload.id);
//             if (itemInCart) {
//                 return {
//                     ...state,
//                     cart: state.cart.map(item =>
//                         item.id === action.payload.id
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     ),
//                 };
//             } else {
//                 return {
//                     ...state,
//                     cart: [...state.cart, { ...action.payload, quantity: 1 }],
//                 };
//             }

//         case 'ADD_TO_WISHLIST':
//             const itemInWishlist = state.wishlist.find(item => item.id === action.payload.id);
//             if (itemInWishlist) {
//                 return state; // Item already in wishlist, no changes
//             } else {
//                 return {
//                     ...state,
//                     wishlist: [...state.wishlist, action.payload],
//                 };
//             }

//         case 'REMOVE_FROM_WISHLIST':
//             return {
//                 ...state,
//                 wishlist: state.wishlist.filter(item => item.id !== action.payload),
//             };

//         case 'INCREMENT_QUANTITY':
//             return {
//                 ...state,
//                 cart: state.cart.map(item =>
//                     item.id === action.payload.id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 ),
//             };

//         case 'DECREMENT_QUANTITY':
//             return {
//                 ...state,
//                 cart: state.cart.map(item =>
//                     item.id === action.payload.id && item.quantity > 1
//                         ? { ...item, quantity: item.quantity - 1 }
//                         : item
//                 ),
//             };


//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 cart: state.cart.filter(item => item.id !== action.payload),
//             };

//         case 'CLEAR_CART':
//             return {
//                 ...state,
//                 cart: [],
//             };

//         case 'CALCULATE_TOTALS':
//             const { totalAmount, totalQuantity } = state.cart.reduce(
//                 (acc, item) => {
//                     acc.totalAmount += item.price * item.quantity;
//                     acc.totalQuantity += item.quantity;
//                     return acc;
//                 },
//                 { totalAmount: 0, totalQuantity: 0 }
//             );
//             return { ...state, totalAmount, totalQuantity };

//         default:
//             return state;
//     }
// };


import { createContext } from "react";

export const CartContext = createContext();

export const initialState = {
    cart: [],
    wishlist: [],
    totalAmount: 0,
    totalQuantity: 0,
    gstAmount: 0,
    finalAmount: 0,
    DISCOUNT: 0, // Initialize the discount amount here for easy updating
};

// Constants for additional charges
const GST_RATE = 0.18; // 18% GST
const SHIPPING_FEE = 100; // Shipping charge

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const itemInCart = state.cart.find(item => item.id === action.payload.id);
            if (itemInCart) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }

        case 'ADD_TO_WISHLIST':
            const itemInWishlist = state.wishlist.find(item => item.id === action.payload.id);
            if (itemInWishlist) {
                return state; // Item already in wishlist, no changes
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, action.payload],
                };
            }

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== action.payload),
            };

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };

        case 'APPLY_COUPON':
            if (action.payload === "50Off") {
                return { ...state, DISCOUNT: 50 };
            } else {
                alert("Coupon code not valid");
                return state;
            }

        case 'REMOVE_COUPON':
            return { ...state, DISCOUNT: 0 };

        case 'CALCULATE_TOTALS':
            const { totalAmount, totalQuantity } = state.cart.reduce(
                (acc, item) => {
                    acc.totalAmount += item.price * item.quantity;
                    acc.totalQuantity += item.quantity;
                    return acc;
                },
                { totalAmount: 0, totalQuantity: 0 }
            );

            const gstAmount = totalAmount * GST_RATE;
            const finalAmount = totalAmount + gstAmount + SHIPPING_FEE - state.DISCOUNT;

            return {
                ...state,
                totalAmount,
                totalQuantity,
                gstAmount,
                finalAmount,
            };

        default:
            return state;
    }
};
