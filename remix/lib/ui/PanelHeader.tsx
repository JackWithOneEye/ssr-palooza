export default function PanelHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="py-2 border-b-4 border-transparent text-2xl font-bold tracking-tight">
      {children}
    </h2>
  );
}
