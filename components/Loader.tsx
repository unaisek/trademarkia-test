import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  color?: string;
  loading?: boolean;
  size?: number;
}

export default function Loader({
  color = "#4380EC",
  loading = true,
  size = 150,
}: LoaderProps) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: color,
  };

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
