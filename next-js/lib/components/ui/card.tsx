export default function Card({
  header,
  children,
  footer,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 max-w-screen-md flex-1 flex flex-col">
      {header ? (
        <header className="flex items-center gap-4 p-4">{header}</header>
      ) : null}
      <main className="flex flex-col flex-auto overflow-auto">{children}</main>
      {footer ? <footer className="p-4">{footer}</footer> : null}
    </div>
  );
}
