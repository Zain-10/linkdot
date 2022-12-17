import Link from "next/link";

interface MenuItemProps {
  active: boolean;
  name: string;
  path: string;
}

const MenuItem = ({ active, name, path }: MenuItemProps) => {
  const boxShadow = active
    ? "-6px -6px 0px 0.01px #0D99FF"
    : "#0f1018 -6px -7px 0px -2px, -6px -7px #0D99FF";
  return (
    <Link href={path}>
      <li
        className="text-md hover:opacity-full text-brand-white mb-6 w-full cursor-pointer border-2 py-3 text-center font-bold hover:scale-105"
        style={{
          lineHeight: "15px",
          boxShadow,
          backgroundColor: active ? "#0D99FF" : "transparent",
          opacity: active ? "100%" : "50%",
        }}
      >
        {name}
      </li>
    </Link>
  );
};

export { MenuItem };
