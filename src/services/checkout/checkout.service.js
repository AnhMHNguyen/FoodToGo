import createStripe from 'stripe-client';

const stripe = createStripe("pk_test_51JISi2JuJcW9mgpDQp4KHYCHLSYxwr01ik3wbboDSDVxh7kg1NOMAetCinICelOkP8fc63ydLXh2oOlJGpN043Jp00Uq50cBph");
const host = "https://us-central1-mealstogo-4ff73.cloudfunctions.net";

export const cardTokenRequest = (cardInfo) => stripe.createToken(cardInfo);

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};