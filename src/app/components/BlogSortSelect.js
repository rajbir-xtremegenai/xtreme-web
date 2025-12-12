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
        className="border border-white/20 rounded-md p-2 text-white bg-black/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-clr1)] transition-all duration-300 backdrop-blur-sm cursor-pointer"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="new" className="bg-[var(--color-bg-dark)] text-white">Newest First</option>
        <option value="old" className="bg-[var(--color-bg-dark)] text-white">Oldest First</option>
      </select>
    </div>
  );
}
