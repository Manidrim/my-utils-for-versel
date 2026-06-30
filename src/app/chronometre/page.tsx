import Chronometre from "./Chronometre";
export const metadata = { title: "Chronometre - my-utils-for-versel", description: "Outil chronometre" };
export default function ChronometrePage() {
  return <main style={{ flex: 1, padding: "24px" }}><Chronometre /></main>;
}