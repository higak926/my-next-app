import Layout from '../components/layout'
import Link from 'next/link'
import Calc from '../components/Calc'

export default function Other() {
  const title = "Other"
 
  return (
    <div>
      <Layout header="Calc" title="Calculator">
      <div className="text-center">
        <Calc />
        <Link href=".">
          <button className="btn btn-primary">
            &lt;&lt; Back to Top
          </button>
        </Link>
      </div>
      </Layout>
    </div>
  )

}
