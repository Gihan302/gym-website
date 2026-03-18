// TODO: implement
export default function PricingSection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center border-b border-border-subtle bg-bg-section-dark">
      <div className="text-center">
        <h2 className="text-h2 text-text-accent">Pricing Plans</h2>
        <p className="text-text-on-dark mt-4">Coming soon</p>
      </div>
    </section>
  );
}
