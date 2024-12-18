import { Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const EditPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, updatePlan } = useAuthStore();
  const index = location.pathname === '/plans/message/edit' ? 0 : 1;

  const planName = user.plans[index].planName;
  const [totalMonthlyMessages, setTotalMonthlyMessages] = useState(
    user.plans[index].totalMonthlyMessages
  );
  const [price, setPrice] = useState(user.plans[index].price);
  const [maxFanLimit, setMaxFanLimit] = useState(user.plans[index].maxFanLimit);
  const [maxReplyTimeInDays, setMaxReplyTimeInDays] = useState(
    user.plans[index].maxReplyTimeInDays
  );

  const [active, setActive] = useState(user.plans[index].active);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare the updates object dynamically
    const updates = {};
    if (totalMonthlyMessages !== user.plans[index].totalMonthlyMessages)
      updates.totalMonthlyMessages = totalMonthlyMessages;
    if (price !== user.plans[index].price) updates.price = price;
    if (maxFanLimit !== user.plans[index].maxFanLimit)
      updates.maxFanLimit = maxFanLimit;
    if (maxReplyTimeInDays !== user.plans[index].maxReplyTimeInDays)
      updates.maxReplyTimeInDays = maxReplyTimeInDays;

    if (active !== user.plans[index].active) updates.active = active;

    const planId = user.plans[index]._id;

    try {
      await updatePlan(planId, updates);

      toast.success('Plan updated');

      setTimeout(() => {
        navigate('/plans');
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSpotLimitSet = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,2}$/.test(inputValue)) {
      setMaxFanLimit(inputValue);
    }
  };

  const handlePriceSet = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,4}$/.test(inputValue)) {
      setPrice(inputValue);
    }
  };

  const marginTop = 'mt-6';

  return (
    <div className="w-full lg:w-2/3 max-md:mb-10">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl">Edit Plan</h2>
        <Link
          to={'/plans'}
          className="hover:bg-base-200 text-sm border border-color-50 p-1.5 px-3 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mt-6 border-color-30" />

      <form onSubmit={handleUpdate} className="flex flex-col gap-3 mt-10">
        <div className="bg-base-200 border border-color-50 rounded-lg h-16 flex items-center pl-4 text-xl mb-4">
          {planName} plan
        </div>

        {planName === 'Monthly' && (
          <>
            <p className={`${marginTop}`}>
              Total messages in this plan (min 30, max 1000)
            </p>
            <input
              type="text"
              value={totalMonthlyMessages}
              onChange={(e) => setTotalMonthlyMessages(e.target.value)}
              className="input-box"
              placeholder="eg- 50 or 100"
            />
            <span className="text-xs ml-1 -mt-2 text-gray-500">
              Per message price: ₹{(price / totalMonthlyMessages).toFixed(2)}
            </span>
          </>
        )}

        <p className={`${marginTop}`}>
          ₹ Price ({planName === 'Per Message' ? 'per message' : 'per month'})
        </p>
        <input
          type="text"
          value={price}
          onChange={handlePriceSet}
          className="input-box"
          placeholder="eg- 50, 100, or 300"
        />

        <p className={`${marginTop}`}>Maximum fans limit (seats)</p>
        <input
          type="text"
          value={maxFanLimit}
          onChange={handleSpotLimitSet}
          className="input-box"
          placeholder="eg- 10, 20, or 30"
        />

        <p className={`${marginTop}`}>Maximum reply time (days)</p>
        <input
          type="text"
          value={maxReplyTimeInDays}
          onChange={(e) => setMaxReplyTimeInDays(e.target.value)}
          className="input-box"
          placeholder="eg- 4"
        />

        <div className={`${marginTop} flex items-center gap-4`}>
          <p>Is plan active?</p>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="checkbox checkbox-sm border-2"
          />
        </div>

        <button type="submit" className="btn-normal mt-6 w-36">
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Save Plan'
          )}
        </button>
      </form>
    </div>
  );
};
