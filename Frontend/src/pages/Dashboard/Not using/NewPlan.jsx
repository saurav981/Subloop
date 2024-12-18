import { Link, useNavigate } from 'react-router-dom';
import { generateRandomString } from '../../../utils/helper';
import { useEffect, useState } from 'react';
import {
  Boxes,
  CalendarFold,
  Loader,
  MessageCircleDashed,
  Shirt,
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { PriceInput } from '../../../components/PriceInput';

export const NewPlan = () => {
  const [planName, setPlanName] = useState('');
  const [selectedCard, setSelectedCard] = useState('Subscription');
  const [price, setPrice] = useState('');
  const [randomString, setRandomString] = useState('');

  const { isLoading } = useAuthStore();
  const navigate = useNavigate();
  const marginTop = 'mt-8';

  useEffect(() => {
    setRandomString(generateRandomString());
  }, []);

  // Send to backend
  // const plan = {
  //   planName,
  //   selectedCard,
  //   price,
  //   randomString,
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const options = [
    {
      id: 1,
      title: 'Subscription',
      icon: <CalendarFold />,
      style: 'text-green-500',
      description: 'Sell ongoing chatting or exclusive content',
    },
    {
      id: 2,
      title: 'One time',
      icon: <MessageCircleDashed />,
      style: 'text-yellow-500',
      description: 'Sell one off sessions',
    },
    {
      id: 3,
      title: 'Digital product',
      icon: <Shirt />,
      style: 'text-primary',
      description: 'Any set of files to download or stream.',
    },
    {
      id: 4,
      title: 'Bundle',
      icon: <Boxes />,
      style: 'text-violet-500',
      description: 'Sell two or more existing products for a new price.',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl">What are you creating?</h2>
        <Link
          to={'/plans'}
          className="bg-white hover:bg-gray-200 border border-black/70 text-black/80 p-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mt-6" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-10 w-[35rem]"
      >
        <p>Name</p>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="input-box"
          placeholder="eg- Basic, Pro, or VIP"
        />

        <p className={`${marginTop}`}>Type</p>
        <div className="flex flex-wrap gap-4">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCard(item.title)}
              className={`w-[17rem] h-36 p-4 rounded-md border border-black/30 cursor-pointer flex flex-col gap-4 transition-all duration-[50ms] ${
                selectedCard === item.title
                  ? 'bg-slate-300'
                  : 'hover:bg-neutral-100 hover:border-black/50'
              }`}
            >
              <p className={`${item.style}`}>{item.icon}</p>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={`${marginTop}`}>Price (INR)</p>
        <PriceInput
          price={price}
          setPrice={(e) => setPrice(e.target.value)}
          isSubscription={selectedCard === 'Subscription'}
        />

        <a
          href={`/plans/${randomString}/edit`}
          type="submit"
          // to={`/plans/${randomString}/edit`}
          // onClick={() => navigate(`/plans/${randomString}/edit`)}
          className="btn-normal w-fit mt-4"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Next: Customize'
          )}
        </a>
      </form>
    </div>
  );
};
