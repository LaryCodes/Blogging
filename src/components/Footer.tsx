import Link from "next/link";
import { getAllCategories } from "@/lib/content";

/** Site footer with navigation, category links, and company info. */
export async function Footer() {
  const categories = await getAllCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-ink-200 bg-ink-50">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
                B
              </span>
              <span className="text-lg font-bold tracking-tight text-ink-900">BLOGGING</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-600">
              Technology Insights for Modern Businesses. A knowledge hub from a regional IT
              consultancy helping companies navigate digital change.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-900">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/blog" className="text-ink-600 hover:text-brand-700">Articles</Link></li>
              <li><Link href="/services" className="text-ink-600 hover:text-brand-700">Services</Link></li>
              <li><Link href="/authors" className="text-ink-600 hover:text-brand-700">Authors</Link></li>
              <li><Link href="/about" className="text-ink-600 hover:text-brand-700">About</Link></li>
              <li><Link href="/contact" className="text-ink-600 hover:text-brand-700">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer categories">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-900">Topics</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-ink-600 hover:text-brand-700"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-900">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              <li>hello@blogging.example</li>
              <li>+1 (555) 010-2040</li>
              <li>Remote-first, worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 text-sm text-ink-500 sm:flex-row">
          <p>&copy; {year} BLOGGING. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
