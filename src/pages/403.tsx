import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function Forbiden() {
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl")
	return (
    <div className="error-container">
      <div className="error-image error-image-403" data-image="403" />
      <h4>you don’t have permission,</h4>
      <h4 className="subtitle">please try again later.</h4>
      <Link className="buton" href={returnUrl||"/"}>Refresh</Link>
    </div>
    );
}
