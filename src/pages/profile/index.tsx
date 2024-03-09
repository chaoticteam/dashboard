import { useAuth } from "@/hooks";
import React from "react";

export default function Profile(){
  const {state}= useAuth()
  return(
    <div>
      hello {state.user?.userName}, this is your profile...
    </div>
  )
}
