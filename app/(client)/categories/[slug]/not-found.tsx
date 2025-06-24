import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
      <p className="text-gray-600">Sorry, the category you are looking for does not exist.</p>
    </div>
  );
}
