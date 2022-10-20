interface BaseProps extends React.PropsWithChildren {}

const NoBadge = ({ children }: BaseProps) => (
  <div className="m-auto flex h-full items-center justify-center text-center md:w-1/2">
    {children}
  </div>
);

export { NoBadge };
