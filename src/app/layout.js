import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/app/Component/admin/adminlte.min.css';

export const metadata = {
  title: 'Dookan',
}
const RootLayout = ({ children }) => {
  return (
      <html lang="en">
      <body className="hold-transition sidebar-mini layout-fixed">
      {children}
      </body>
      </html>
  )
}

export default RootLayout
