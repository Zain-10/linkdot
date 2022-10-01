import type { NextPage } from "next";

const Test: NextPage = () => {
  // console.log("abi: ", abi);
  // console.log("bytecode: ", bytecode);

  // const loadContract = async () => {
  //   const fs = require("fs");

  //   const contractFile = await fs.readFileSync(
  //     "artifacts/contracts/LinkDotContract.sol/LinkDotContract.json"
  //   );
  //   const contractData = JSON.parse(contractFile.toString());

  //   console.log("ABI: ", contractData.abi);
  // };

  // loadContract();
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const fs = require("fs");

//   const contractFile = await fs.readFileSync(
//     "artifacts/contracts/LinkDotContract.sol/LinkDotContract.json"
//   );
//   const contractData = JSON.parse(contractFile.toString());

//   return {
//     props: { ABI: contractData.abi, bytecode: contractData.bytecode },
//   };
//   // ...
// };

export default Test;
