import { Handlers, type PageProps } from "$fresh/server.ts";

export default function Home() {
  // Array of 3 strings
  const textArray: string[] = [
    "This is the first paragraph of text.",
    "Here's the second paragraph with different content.",
    "And finally, this is the third paragraph to complete our array.",
  ]

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">String Array Display</h1>

      <div className="space-y-4">
        {textArray.map((text: string, index: number) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </main>
  )
}
