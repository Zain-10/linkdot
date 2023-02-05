const OutlineButton = ({ children }: { children: string }) => {
  return (
    <div className="primaryHover rounded-sm border-2 border-black px-7 py-2 text-sm font-bold">
      {children}
    </div>
  );
};

export default OutlineButton;
