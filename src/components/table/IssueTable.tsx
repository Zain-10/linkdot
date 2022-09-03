const IssuedTable = () => {
  const TableHead = [
    "Sno.",
    "Badge Name",
    "Badge Type",
    "Issued Date",
    "Issued To",
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
        <tr>
          <td className="border border-gray-600 py-4 text-center">1</td>
          <td className="border border-gray-600 py-4 text-center">
            Linkdot Founding Team
          </td>
          <td className="border border-gray-600 py-4 text-center">
            Founding Team
          </td>

          <td className="border border-gray-600 py-4 text-center">MMYYYY</td>
          <td className="border border-gray-600 py-4 text-center">
            vijin@linkdot.xyz
          </td>
          <td className="border border-gray-600 py-4 text-center">-</td>
          <td className="border border-gray-600 py-4 text-center text-yellow-500">
            Pending
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export { IssuedTable };
