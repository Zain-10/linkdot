interface ButtonProps extends React.PropsWithChildren {
  boxShadow?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  innerBoxShadowColor?: string;
  outerBoxShadowColor?: string;
  textColor?: string;
  boxShadowVariant?: number;
  opacityEffect?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  boxShadow = true,
  boxShadowVariant = 1,
  backgroundColor = "transparent",
  borderColor = "#FFFFFF",
  borderWidth = "1px",
  innerBoxShadowColor = "#0f1018",
  outerBoxShadowColor = "#FFCD29",
  textColor = "brand-white",
  opacityEffect = false,
  isLoading = false,
}: ButtonProps) => {
  const boxShadowStyle =
    boxShadow && boxShadowVariant === 1
      ? `${innerBoxShadowColor} 5px 6px 0px -1px, 5px 6px ${outerBoxShadowColor}`
      : `${innerBoxShadowColor} 6px 7px 0px -2px, 6px 7px ${outerBoxShadowColor}`;
  const styles = {
    boxShadow: boxShadowStyle,
    fontSize: "inherit",
    fontWeight: "inherit",
    border: `${borderWidth} ${borderColor} solid`,
    backgroundColor,
    color: textColor,
    opacity: `${opacityEffect ? "0.75" : 1}`,
  };
  return (
    <button
      disabled={isLoading}
      style={styles}
      className="py-auto px-auto flex h-full w-full items-center justify-center border border-solid leading-7 opacity-70 hover:scale-105 hover:opacity-100 disabled:cursor-wait md:text-sm lg:text-base"
    >
      {children}
    </button>
  );
};
