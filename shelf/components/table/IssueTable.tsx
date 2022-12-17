import moment from "moment";

interface IssueTableProps {
  badges: NTTBadge[];
}

const IssuedTable = ({ badges }: IssueTableProps) => {
  const TableHead = [
    "Sno.",
    "Badge Name",
    "Badge Type",
    "Issued Date",
    "Issued To",
    // "Wallet ID",
    // "Status",
  ];

  // flatten the badges array with sub array of issued To
  const flattenBadges = badges.map((badge) => {
    // @ts-ignore
    return badge.issued_to.map((issued_to) => {
      return {
        _id: badge._id,
        name: badge.name,
        description: badge.description,
        image: badge.image,
        badge_type: badge.badge_type,
        created_date: badge.created_at,
        issued_to,
      };
    });
  });

  // flatten the array of array to single array
  const flattenArray: NTTBadge[] = flattenBadges.reduce(
    (acc, val) => acc.concat(val),
    []
  );

  return (
    <table className="mt-7 w-full border-collapse border text-xs">
      <thead>
        <tr className="border bg-gray-800">
          {TableHead.map((t) => (
            <th key={t} className="border border-gray-600 py-4">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {flattenArray.map((badge, index) => (
          <tr key={badge._id}>
            <td className="border border-gray-600 py-4 text-center">
              {index + 1}
            </td>
            <td className="border border-gray-600 py-4 text-center">
              {badge.name}
            </td>
            <td className="border border-gray-600 py-4 text-center">
              {badge.badge_type}
            </td>

            <td className="border border-gray-600 py-4 text-center">
              {/* @ts-ignore */}
              {`${moment(badge.issued_to.issued_date).format("D-MMM-YYYY")}`}
            </td>
            <td className="border border-gray-600 py-4 text-center">
              {/* @ts-ignore */}
              {badge.issued_to.email}
            </td>
            {/* <td className="border border-gray-600 py-4 text-center">-</td> */}
            {/* <td className="border border-gray-600 py-4 text-center text-yellow-500">
              Pending
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { IssuedTable };
