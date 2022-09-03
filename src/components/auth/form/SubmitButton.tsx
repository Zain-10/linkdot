interface ButtonProps {
  disabled: boolean;
}

const SubmitButton = (props: ButtonProps) => (
  <button
    type="submit"
    className="tracking-longer text-base leading-7 disabled:cursor-not-allowed disabled:opacity-25"
    disabled={props.disabled}
  >
    Next
  </button>
);

export { SubmitButton };
