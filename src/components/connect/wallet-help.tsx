const HelpWallet = () => (
  <div className="py-5 text-center text-xs text-gray-400">
    Don&apos;t you have wallet?
    {/* TODO:replace the tutorial with our own */}
    <a
      href="https://www.pointer.gg/tutorials/Setting-Up-Your-Wallet/6e23e8e8-6760-45fa-8fb3-330400ac03ac"
      target={"_blank"}
      rel="noreferrer"
    >
      <span className="cursor-pointer text-xs font-light text-gradient-purple">
        {" Create Wallet"}
      </span>
    </a>
  </div>
);

export default HelpWallet;
