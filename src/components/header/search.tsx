import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import SearcgSVg from "@/public/assets/svg/search.svg";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/explore",
      query: { query },
    });
  };

  return (
    <form className="relative mr-4 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by wallet id, badge, name..."
        className="solid border-gray-1200 h-10 w-full rounded border bg-gray-1300 py-3.5 pl-7 pr-14 text-xs text-black outline-0"
        onChange={handleChange}
        required
      />
      <button type="submit" className="absolute right-0 h-full w-12">
        <Image src={SearcgSVg} alt="search" />
      </button>
    </form>
  );
};

export { Search };
