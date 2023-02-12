export interface PoAP {
  event: {
    id: number;
    fancy_id: string;
    name: string;
    event_url: string;
    image_url: string;
    country: string;
    city: string;
    description: string;
    year: number;
    start_date: string;
    end_date: string;
    expiry_date: string;
    supply: number;
  };
  tokenId: string;
  owner: string;
  chain: symbol;
  created: string;
}

interface PoAPs {
  poaps: PoAP[];
}
const ShowPoAPs = ({ poaps }: PoAPs) => {
  if (poaps.length === 0) {
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center">
        <p className="text-base font-bold text-black">
          No POAPs found in this address.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 py-4 xl:grid-cols-4">
      {poaps.map((poap) => (
        <a
          href={poap.event.event_url}
          target="_blank"
          key={poap.tokenId}
          rel="noreferrer"
        >
          <div className="rounded border border-solid border-black">
            <div className="badge-card h-44  w-full overflow-hidden rounded-t object-contain">
              {/* TODO: fix nextjs image domains problem 
                  TODO: fix style issue with <Image />
                */}
              {/* <Image
                src={poap.image_url}
                alt="badge image"
                className="h-full w-full object-contain"
                layout="fill"
              /> */}
              <img
                src={poap.event.image_url}
                alt="badge image"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="rounded-b border-t border-solid border-black px-4 pt-2.5 pb-4">
              <h2 className="mb-1.5 text-sm font-bold text-black">
                {poap.event.name}
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <SVGIcon name="badgeindicationicon"></SVGIcon>  */}
                  {/* <p className="ml-2 text-xs font-normal text-gray-1600">
                    {poap.event.event_url}
                  </p> */}
                </div>
                <p className=" text-gray-1600 text-xs font-normal">
                  {poap.event.year}
                </p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export { ShowPoAPs };
