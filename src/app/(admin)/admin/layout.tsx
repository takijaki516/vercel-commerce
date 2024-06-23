export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group mt-10 w-full overflow-auto pl-0 lg:pl-[250px] xl:pl-[300px]">
      {children}
    </div>
  );
}
