import moment from "moment";

interface ClaimTableProps {
  badges: NTTBadge[];
}

const ClaimTable = ({ badges }: ClaimTableProps) => {
  const TableHead = [
    "Sno.",
    "Badge Name",
    "Badge Type",
    "Issued Date",
    "Issued From",
    "Wallet ID",
    "Status",
  ];

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
        {badges.map((badge, index) => (
          <tr key={badge.created_at}>
            <td className="border border-gray-600 py-4 text-center">
              {index + 1}
            </td>
            <td className="border border-gray-600 py-4 text-center">
              {/* @ts-ignore */}
              {badge.badge_id.name}
            </td>
            <td className="border border-gray-600 py-4 text-center">
              {/* @ts-ignore */}
              {badge.badge_id.badge_type}
            </td>

            <td className="border border-gray-600 py-4 text-center">
              {`${moment(badge.issued_date).format("D-MMM-YYYY")}`}
            </td>
            <td className="border border-gray-600 py-4 text-center">--</td>
            <td className="border border-gray-600 py-4 text-center">-</td>
            <td className="border border-gray-600 py-4 text-center text-yellow-500">
              --
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ClaimTable };
