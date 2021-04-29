// const Stripe = require('stripe')('sk_test_51Ig3ecSFM4BoE4ohIBfpoLQi1gvMwFhRIFc3hX3Es00msPH4wUGUrYwmLKzipw5DvF5Px4b2VmMx8RQ4jjSLw0wn007fpDPT7C');
// import Stripe from "tipsi-stripe";
import { PAYMENT_FIRING_UP } from "./types"



export const onTokenGeneration = (userCardDetails) => {
    return async dispatch => {
        console.log('inside function token generation')
        
        // Stripe.charges.create({ amount: 100, currency: 'usd', source: 'tok_mastercard' }).then(res => {
        //     console.log('payment done successfully', res)
        // })
        //     .catch(err => { console.log('err', err) });

        dispatch({
            type: PAYMENT_FIRING_UP,
            payload: userCardDetails
        })
    }

}