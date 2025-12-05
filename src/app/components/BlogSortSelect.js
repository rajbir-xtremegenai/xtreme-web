'use client';

import { useRouter } from 'next/navigation';

export default function BlogSortSelect({ page, sortBy }) {
  const router = useRouter();

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    router.push(`/blogs?page=${page}&sortBy=${newSortBy}`);
  };

  return (
    <div className="flex items-center">
      <select
        className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="new">Newest First</option>
        <option value="old">Oldest First</option>
      </select>
    </div>
  );
}
