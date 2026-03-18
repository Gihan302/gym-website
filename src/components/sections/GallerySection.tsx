// TODO: implement
export default function GallerySection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center border-b border-border-subtle bg-bg-page">
      <div className="text-center">
        <h2 className="text-h2 text-text-primary">Gallery</h2>
        <p className="text-text-secondary mt-4">Coming soon</p>
      </div>
    </section>
  );
}
