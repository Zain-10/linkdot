import Logo from "./Logo";

interface FooterProps {
  textAlign?: string;
}

const Footer = ({ textAlign = "center" }: FooterProps) => (
  <footer className={`text- mx-auto${textAlign}`}>
    <Logo />
  </footer>
);

export { Footer };
