import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const PriceInput = ({ price, setPrice, isSubscription }) => {
  const [selected, setSelected] = useState('a week');
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  const options = ['a week', 'a month', 'a year'];

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className="input-box px-3 py-2 flex justify-between">
      <input
        type="text"
        value={price}
        onChange={setPrice}
        className="input-box border-none p-0"
        placeholder="eg- 50, 100, or 300"
      />

      {/* Pick duration */}
      {isSubscription && (
        <div className="relative w-44 ml-1 flex justify-end" ref={dropDownRef}>
          <div
            className="flex items-center justify-between gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <button>{selected}</button>
            <ChevronDown size={18} />
          </div>

          {isOpen && (
            <ul className="absolute w-full bottom-7 bg-gray-100 border-2 p-1 border-slate-400 rounded overflow-hidden">
              {options.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="px-2 py-1.5 hover:bg-neutral-300 cursor-pointer transition-all duration-[50ms]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
