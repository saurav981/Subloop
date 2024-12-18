import { Link, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
// import { loadStripe } from '@stripe/stripe-js';
// import toast from 'react-hot-toast';
import axios from 'axios';
import avatar from '../assets/avatar.webp';

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const CreatorPublic = () => {
  const username = useParams().creatorUsername;
  const [quantity, setQuantity] = useState(1);

  const { getPublicUser, publicUser, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    getPublicUser(username);
  }, [getPublicUser, username]);

  // console.log(publicUser);
  // console.log(username);

  const handlePurchase = async (planId) => {
    try {
      const {
        data: { key },
      } = await axios.get(`${backend_url}/api/v1/getkey`);

      const {
        data: { order },
      } = await axios.post(`${backend_url}/api/v1/purchases/create-order`, {
        planId,
        quantity,
      });
      console.log(order);

      const options = {
        key,
        name: `${order.notes.planName} plan`,
        order_id: order.id,
        callback_url: `${backend_url}/api/v1/purchases/verify-payment`,
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: '9000090000',
        },
        theme: {
          color: '#BE185D',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleQuantitySet = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers and limit to 2 characters
    if (/^\d{0,2}$/.test(inputValue)) {
      setQuantity(Number(inputValue));
    }
  };

  return (
    <div>
      {publicUser?.role === 'creator' && (
        <div className="flex -mx-[5rem] h-full">
          <div className="h-screen w-1/3 bg-base-200  p-10 pt-14">
            <img
              src={publicUser?.profilePic || avatar}
              className="rounded-full w-48 object-cover"
            />
            <p className="text-3xl font-bold mt-8">{publicUser?.fullName}</p>
            <p className="mt-4">{publicUser?.bio}</p>
          </div>
          <div className="w-2/3 p-8 gap-8 mx-4 flex flex-wrap items-start">
            {publicUser?.plans?.map((plan) => (
              <div key={plan._id} className="card bg-base-200 w-80 shadow-xl">
                {/* <figure>
                  <img src={image} alt="plan pic" className="object-cover" />
                </figure> */}
                <div className="card-body">
                  <h2 className="card-title font-bold text-2xl">
                    {plan.planName}
                  </h2>

                  <ul className="list-disc ml-3 py-3 space-y-1">
                    <li>Available slots: {plan.maxFanLimit}</li>
                    <li>Replies within: {plan.maxReplyTimeInDays} days</li>
                    {plan.planName === 'Per Message' && (
                      <li>Per message price: ₹{plan.price}</li>
                    )}
                    {plan.planName === 'Per Message' && (
                      <li>
                        <div className="flex items-center gap-2">
                          <span>Quantity:</span>
                          <div className="flex gap-1 items-center justify-center input-box w-fit p-0.5">
                            <div
                              className="increase-decrease-btn"
                              onClick={() => setQuantity(quantity - 1)}
                            >
                              <Minus />
                            </div>
                            <input
                              type="text"
                              className="w-8 text-center bg-transparent outline-none"
                              value={quantity}
                              onChange={handleQuantitySet}
                              // onChange={(e) => setQuantity(e.target.value)}
                            />
                            <div
                              className="increase-decrease-btn"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <Plus />
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>

                  <div className="card-actions mt-2">
                    <Link to={!isAuthenticated && '/signup'}>
                      <button
                        onClick={() => handlePurchase(plan._id)}
                        className="btn-fit flex items-center gap-1"
                      >
                        <span className="text-sm">
                          {isAuthenticated ? 'Buy Now ' : 'Signup To Buy '}
                        </span>
                        <span className="font-bold text-[1.1rem] text-yellow-200">
                          ₹
                          {plan.planName === 'Per Message'
                            ? plan.price * quantity
                            : plan.price}
                          {/* {plan.price * quantity} */}
                          {plan.planName === 'Per Message'
                            ? ' total'
                            : '/month'}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// STRIPE
// const handlePurchase = async (planId) => {
//   try {
//     const stripe = await loadStripe(
//       'pk_test_hzH2PlyY9WMxpeb5ZD4PXuSZ006VGZigU8'
//     );

//     // 1) Get checkout session from backend api
//     const session = await axios.get(
//       `/api/v1/purchases/checkout-session/${planId}`
//     );

//     // 2) Create checkout session form + charge the card
//     await stripe.redirectToCheckout({ sessionId: session.data.session.id });

//     navigate('/success');
//   } catch (error) {
//     console.log(error);
//   }
// };
