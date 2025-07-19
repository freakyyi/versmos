import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p>If you can see this, the server is working correctly.</p>
        <div className="mt-8 space-y-4">
          <Link href="/" className="block text-blue-600 hover:underline">Go to Homepage</Link>
          <Link href="/portfolio" className="block text-blue-600 hover:underline">Go to Portfolio</Link>
          <Link href="/services" className="block text-blue-600 hover:underline">Go to Services</Link>
        </div>
      </div>
    </div>
  );
}