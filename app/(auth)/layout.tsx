const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
        <main className="w-full max-w-lg">
            {children}
        </main>
    </div>
  )
}

export default AuthLayout;