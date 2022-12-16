interface BaseProps extends React.PropsWithChildren {}

const Base = ({ children }: BaseProps) => (
  <div className="flex h-full min-h-screen flex-col bg-black p-4 md:px-12 lg:px-24">
    {children}
  </div>
);

export { Base };
