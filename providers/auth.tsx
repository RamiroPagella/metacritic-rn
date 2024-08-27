import useAuthstateChange from "@/hooks/useAuthStateChange";

export default function AuthProvider () {
  useAuthstateChange();
  return null;
}