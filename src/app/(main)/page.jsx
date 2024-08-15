import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-4">Painterly Customizer</h2>
      <div className="text-center">
        <Link className="btn btn-lg btn-wide mx-auto" href="/customizer">Customizer</Link>
      </div>
    </>
  );
}