export default function createLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body style={{
          padding:"0px",
          margin:"0px",
          height:"100vh",
          overflowY:"scroll",
          overflowX:"hidden"
        }}>{children}</body>
      </html>
    );
  }