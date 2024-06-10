import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function NotFound() {
  const router = useRouter();
  const handlePreviewPage = useCallback(()=>{
    router.back()
  },[router])
	return (
  <div className="error-container">
    <div className="error-image error-image-404" data-image="404" />
    <h4>Ops!!! resource not found</h4>
    <h4 className="subtitle">please try again later.</h4>
    <a className="buton" onClick={handlePreviewPage}>Back</a>
  </div>
  );
}
