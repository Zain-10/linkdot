const OutlineButton = ({ children }: { children: string }) => {
  return (
    <div className="primaryHover rounded-sm border border-black px-7 py-1 text-sm font-bold">
      {children}
    </div>
  );
};

export default OutlineButton;
