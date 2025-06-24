import CategoryProducts from '@/components/new/CategoryProducts';
import { client } from '@/sanity/lib/client';
import Container from '@/components/Container';

export default async function CategoriesLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  // Fetch all categories for the selector
  const categories = await client.fetch(`*[_type == 'category'] | order(title asc)`);

  return (
    <Container className="py-10">
      {/* You can add a category selector here if desired */}
      {children}
    </Container>
  );
}
