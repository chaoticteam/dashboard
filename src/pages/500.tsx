import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function InternalServerError() {
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl")
	return (
    <div className="error-container">
      <div className="error-image-500" data-image="500" />
      <h4>Ops!! an error has occurred on the server</h4>
      <h4 className="subtitle">please try again later.</h4>
      <Link className="buton" href={returnUrl||"/"}>Refresh</Link>
    </div>
    );
}
