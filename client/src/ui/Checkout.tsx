// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';



// const stripePromise = loadStripe(
//     "pk_test_51M9GZ7DYaugzDeTANNW4s8xTRgOLm3fEHIOI3EDZUbxJbEjYhes6wPKN4sGa61TZRcg2IuqvMrhjDE5YFRHf2CXb009alThMnG"
//   );

export default function Checkout({cart}: any) {
    const handleCheckout = async () => {
      try {
        // const stripe = await stripePromise;

        // let ss = {
        //     "item1": "daaaaa, da",
        //     "item2": "daaaaa",
        //     "item3": "daaa",
        //     "item4": "daaaada",
        // }

        // const checkoutSession = await axios.post("/api/checkout-session", {
        //   ss,
        // });


        // if(stripe) {
        //     const result = await stripe.redirectToCheckout({
        //       sessionId: checkoutSession.data.id,
        //     });
        //     if (result.error) {
        //       alert(result.error.message);
        //     }
        // }
  
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
        <button onClick={handleCheckout}>
            Checkout
        </button>
      </div>
    );
  }