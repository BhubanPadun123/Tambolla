
import { Inter } from "next/font/google";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        padding:"0px",
        margin:"0px",
        height:"auto",
        overflowY:"scroll",
        overflowX:"hidden",
        paddingBottom:"50px",
        backgroundColor:"#0e141f"
      }}>{children}</body>
    </html>
  );
}
