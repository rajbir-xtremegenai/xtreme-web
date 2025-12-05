'use client';

import { useRouter } from 'next/navigation';

export default function SortSelect({ from, rawCarCompany, page, sortBy }) {
  const router = useRouter();

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    router.push(`/${from}/${rawCarCompany}?page=${page}&sortBy=${newSortBy}`);
  };

  return (
    <div className="flex items-center">
      <select
        className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="new">Default</option>
        <option value="new">New</option>
        <option value="higher_price">Higher Price</option>
        <option value="lower_price">Lower Price</option>
      </select>
    </div>
  );
}