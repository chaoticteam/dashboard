import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function UnAuthorized() {
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl")
	return (
  <div className="error-container">
    <div className="error-image error-image-401" data-image="401" />
    <h4>Please log in</h4>
    <h4 className="subtitle">please try again later.</h4>
    <Link className="buton" href={returnUrl||"/"}>Refresh</Link>
  </div>
  );
}

