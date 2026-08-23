import { Redirect } from "expo-router"; 

import { useAuthContext } from "@/features/auth/context/AuthContext";


export default function Index() {
  const { isAuthenticated } = useAuthContext();
  if(isAuthenticated) {
  return <Redirect href="/dashboard" />;
  }
  return <Redirect href="/login" />
}