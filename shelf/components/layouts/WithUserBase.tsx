import { withUser } from "@/components/hoc/WithUser";

const WithUserBase = withUser(({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex h-full flex-1 flex-col">{children}</div>
));

export { WithUserBase };
