import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <div>
      <Meta />
      
      <div className="min-h-screen mx-auto max-w-screen-sm mt-12">
        <h1 className="text-4xl font-black font-mono">Un cuaderno con ideas</h1>
        <p className="font-black font-mono">El blog de José Ignacio Sbruzzi</p>
        <main className="pt-12">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
