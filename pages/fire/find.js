import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import '../../components/fire'
import Link from 'next/link'

const db = firebase.firestore()

export default function Find() {
  const [message, setMessage] = useState('wait.')
  const [find, setFind] = useState('')
  const [data, setData] = useState(null)
  const mydata = []

  const onChangeFind = ((e) => {
    setFind(e.target.value)
  })

  const doAction = ((e) => {
    db.collection('mydata').orderBy('name').startAt(find).endAt(find + '¥uf8ff').get()
      .then(snapshot => {
        snapshot.forEach((document) => {
          const doc = document.data()
          mydata.push(
            <tr key={document.id}>
              <td><a href={'/fire/del?id=' + document.id}>{document.id}</a></td>
              <td>{doc.name}</td>
              <td>{doc.mail}</td>
              <td>{doc.age}</td>
            </tr>
          )
        })
        setData(mydata)
        setMessage("find: " + find)
      })
  })

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left mb-4">
            <label>Find:</label>
            <input type="text" onChange={onChangeFind} className="form-control" />
          </div>
          <button onClick={doAction} className="btn btn-primary">Find</button>
        </div>
        <table className="table bg-white text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
        <div className="text-center">
          <Link href="/fire">
            <button className="btn btn-primary mr-3">
              &lt;&lt; Back to Firebase
          </button>
          </Link>
        </div>
      </Layout>
    </div>
  )
}

