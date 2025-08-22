import sappersIcon from "../../assets/sappers-icon.svg";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const Logo = ({
  className,
  showText = true,
  textClassName = "font-bold text-white",
}: LogoProps) => (
  <div className="flex items-center gap-4">
    <img className={className} src={sappersIcon} alt="logo" />
    {showText && <p className={textClassName}>Sappers Co.</p>}
  </div>
);
