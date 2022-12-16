import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../../actions/index";

export default function Checkout() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  const handeleCheckout = () => {
    dispatch(checkoutCart(cart, user));
  };

  return(
    <div>
        <button onClick={handeleCheckout}> Comprar </button>
    </div>
  )

}


// import { checkoutCart } from "../../actions/index";

// const FORM_ID = 'payment-form';

// export default function Checkout() {
//   const dispatch = useDispatch();

//   const check = () => {
//     dispatch(checkoutCart());
//   };

//   return (
//     <div>

//       <script src="https://sdk.mercadopago.com/js/v2"></script>



//       <button onClick={check}> Comprar </button>


//       <form id={FORM_ID} method="GET" />


//     </div>
//   )
// }