import React from 'react';
import { Text, Alert } from "react-native";

import AddSubscriptionView from '../components/AddSubscriptionView';
import { firestore } from 'firebase';
const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51H5avPESORGmU7vecrTqFSyVaJGjoWhfpRrCwndtqgz5nwMUostjPLv14c0SKfgCM1Sp2V2RZefXY5O8Le4mIof100rtm7u0r0 ';
/**

 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = (creditCardData) => {
    const card = {
        'card[number]': creditCardData.values.number.replace(/ /g, ''),
        'card[exp_month]': creditCardData.values.expiry.split('/')[0],
        'card[exp_year]': creditCardData.values.expiry.split('/')[1],
        'card[cvc]': creditCardData.values.cvc
    };
    return fetch('https://api.stripe.com/v1/tokens', {
        headers: {

            Accept: 'application/json',

            'Content-Type': 'application/x-www-form-urlencoded',

            Authorization: `Bearer ${"pk_test_51H5avPESORGmU7vecrTqFSyVaJGjoWhfpRrCwndtqgz5nwMUostjPLv14c0SKfgCM1Sp2V2RZefXY5O8Le4mIof100rtm7u0r0"}`
        },

        method: 'post',

        body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&')
    }).then(response => response.json());
};
/**
 
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken) => {
    return new Promise((resolve) => {
        console.log('Credit card token\n', creditCardToken);
        Alert.alert("data", JSON.stringify(creditCardToken))
        setTimeout(() => {
            resolve({ status: true });
        }, 1000)
    });
};
/**
 * 
 */
export default class AddSubscription extends React.Component {
    static navigationOptions = {
        title: 'Payment',
    };
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            error: null
        }
    }

    onSubmit = async (creditCardInput) => {
        const { navigation } = this.props;

        this.setState({ submitted: true });
        let creditCardToken;
        try {

            creditCardToken = await getCreditCardToken(creditCardInput);
            if (creditCardToken.error) {

                this.setState({ submitted: false, error: STRIPE_ERROR });
                return;
            }
        } catch (e) {

            this.setState({ submitted: false, error: STRIPE_ERROR });
            return;
        }

        const { error } = await subscribeUser(creditCardToken);

        if (error) {
            this.setState({ submitted: false, error: SERVER_ERROR });
        } else {


            this.setState({ submitted: false, error: null });
            navigation.navigate('Home',)
            /* firestore().collection('customers')
                 .doc('nnRVdt5dzVo4EzkhGFnh')
                 .delete()
                 */
            const db = firestore();
            db.collection("customers")
                .get()
                .then(res => {
                    res.forEach(element => {
                        element.ref.delete();
                    });
                });
        }
    };


    render() {
        const { submitted, error } = this.state;
        return (
            <AddSubscriptionView
                error={error}
                submitted={submitted}
                onSubmit={this.onSubmit}
            />
        );
    }
}