export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 max-w-screen-md flex-1 flex flex-col">
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <header className="flex items-center gap-4 p-4">{children}</header>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col flex-auto overflow-auto">{children}</main>
  );
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <footer className="p-4">{children}</footer>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
