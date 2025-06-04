import { Link } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
// import { Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Plans = () => {
  const { user } = useAuthStore();

  const tableHeader = ['Name', 'Price', 'Seats', 'Reply', 'Active', ' '];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl">All Plans</h2>
        {/* <div className="flex items-center gap-4">
          <div className="border-[1.5px] border-slate-300 rounded p-2.5 cursor-pointer">
            <Search className="size-4 opacity-60" />
          </div>
          <Link to={'/plans/new'} className="btn-normal">
            New plan
          </Link>
        </div> */}
      </div>

      <div className="mt-10 border-[1.5px] border-color-50 rounded overflow-auto">
        <table className="table-auto w-full">
          <thead className="bg-base-200 border-b border-color-50">
            <tr>
              {tableHeader.map((item, i) => (
                <th key={i} className="px-5 py-5 text-left">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {user.plans?.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-gray-500/5 transition [&>td]:px-5 [&>td]:py-5 border-b border-color-30"
              >
                <td>{`${item.planName} ${
                  item.planName === 'Monthly'
                    ? `(${item.totalMonthlyMessages} msgs)`
                    : ''
                }`}</td>

                <td>
                  {`₹${item.price}${
                    item.planName === 'Per Message' ? '/message' : '/month'
                  }`}
                </td>

                <td>{item.maxFanLimit}</td>

                <td>{item.maxReplyTimeInDays} days</td>

                <td>{item.active ? 'Yes' : 'No'}</td>

                <td>
                  <Link
                    to={`${
                      item.planName === 'Per Message'
                        ? '/plans/message/edit'
                        : '/plans/month/edit'
                    }`}
                  >
                    <EllipsisVertical size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
