type WorkflowPanelProps = {
  //  label: string;
  // path: Route;
  children: React.ReactNode;
};

export default function WorkflowPanel({
  children,
}: // label,
// path,
WorkflowPanelProps) {
  // const depth = useWorkflowEntry({ label, path });

  return (
    <div className="contents" data-panel-depth={0}>
      {children}
    </div>
  );
}
