import Container from '@/components/Container';

export default async function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-10">
      {/* You can add a category selector here if desired */}
      {children}
    </Container>
  );
}
