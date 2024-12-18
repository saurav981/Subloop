import { useNavigate } from 'react-router-dom';

export const PickPlan = () => {
  const navigate = useNavigate();

  const templatePacks = [
    {
      type: 'basic,',
      name: 'Supporter Pack',
      spotLimit: '30',
      price: '300',
    },
    {
      type: 'pro,',
      name: 'Inner Circle',
      spotLimit: '20',
      price: '500',
    },
    {
      type: 'VIP',
      name: 'Superfan Club',
      spotLimit: '10',
      price: '1000',
    },
  ];

  const handlePlanClick = (planData) => {
    navigate('/plans/new', { state: planData });
  };

  return (
    <span className="space-x-2">
      {templatePacks.map((pack, i) => (
        <span
          key={i}
          className="hover:underline hover:text-primary cursor-pointer"
          onClick={() =>
            handlePlanClick({
              name: pack.name,
              spotLimit: pack.spotLimit,
              price: pack.price,
            })
          }
        >
          {pack.type}
        </span>
      ))}
    </span>
  );
};
