import { useState } from 'react'
import useSWR from 'swr'
import Layout from '../components/layout'
import Link from 'next/Link'
import MyImage from '../components/image'
import HelloAPI from '../components/helloAPI'

export default function Home() {
  // const url = "./data.json"
  // const [data, setData] = useState({message: "", data:[]})
  // fetch(url)
  // .then(res => res.json())
  // .then(res => setData(res))

  // const func = (...args) => fetch(...args).then(res => res.text())
  // const { textData, err } = useSWR('./data.txt', func)
  const { data } = useSWR('./data.json')

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data != undefined ? data.message : 'error...'}
          </h5>
          <div className="mb-4">
            <MyImage fname="aws.png" size="300" />
          </div>
          <table className="table bg-white">
            <thead className="table-dark">
              <tr><th>Name</th><th>Mail</th><th>Age</th></tr>
            </thead>
            <tbody>
              {data != undefined ? data.data.map((value, key) => (
                <tr key={key}>
                  <th>{value.name}</th>
                  <td>{value.mail}</td>
                  <td>{value.age}</td>
                </tr>
              )) : <tr><th></th><td>no data.</td><td></td></tr>}
            </tbody>
          </table>
          <div className="mb-4">
            <HelloAPI />
          </div>
          <Link href="./other">
            <button className="btn btn-primary mr-3">
              go to Other &gt;&gt;
            </button>
          </Link>
          <Link href="./calc">
            <button className="btn btn-primary mr-3">
              go to Calc &gt;&gt;
            </button>
          </Link>
          <Link href="./fire">
            <button className="btn btn-primary">
              go to Firebase &gt;&gt;
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  )

}
