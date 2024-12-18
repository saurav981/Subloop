import { PartyPopper } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export const Success = () => {
  const [[, paymentId]] = useSearchParams()[0];

  return (
    <div className="h-screen">
      <div className="w-96 mx-auto mt-32 border-[1.5px] border-color-50 rounded-lg flex flex-col justify-center items-center gap-4 py-10 ">
        <div className="flex items-center justify-center size-14 bg-primary/10 rounded-full">
          <PartyPopper className="text-primary size-7" />
        </div>

        <h2 className="text-2xl font-semibold">Payment Successful</h2>

        <p>Thanks for the payment!</p>

        <p>
          Payment id: <span className="text-primary">{paymentId}</span>
        </p>

        <Link to={'/messages'}>
          <button className="btn-fit">Message X</button>
        </Link>
      </div>
    </div>
  );
};
