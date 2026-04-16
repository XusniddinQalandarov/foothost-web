import { redirect } from "next/navigation";

/** Canonical home lives at `/home` (desktop shell); `/` forwards there. */
export default function RootPage() {
  redirect("/home");
}
