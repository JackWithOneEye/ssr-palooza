export default function PanelHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h5 className="mb-2 pb-1 border-b-4 border-transparent text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {children}
    </h5>
  );
}
