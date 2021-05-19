import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import '../../components/fire'
import Link from 'next/link'

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore()

auth.signOut()

export default function Home() {
  const mydata = []
  const [data, setData] = useState(mydata)
  const [message, setMessage] = useState('wait...')

  useEffect(() => {
    auth.signInWithPopup(provider).then(result => {
      setMessage('logined: ' + result.user.displayName)
    }).catch((error) => {
      setMessage('not logined.')
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser != null) {
      db.collection('mydata').get().then((snapshot) => {
        snapshot.forEach((document) => {
          const doc = document.data()
          mydata.push(
            <tr key={document.id}>
              <td><a href={'/fire/del?id=' + document.id}>{document.id}</a></td>
              <td>{doc.name}</td>
              <td>{doc.mail}</td>
              <td>{doc.age}</td>
            </tr>)
        })
        setData(mydata)
      })  
    } else {
      mydata.push(<tr key="1"><th colSpan="4">can't get data.</th></tr>)      
    }
  }, [message])

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <p className="h6 text-left">
            uid: {auth.currentUser != null ? auth.currentUser.uid : ''}<br />
            displayName: {auth.currentUser != null ? auth.currentUser.displayName : ''}<br />
            email: {auth.currentUser != null ? auth.currentUser.email : ''}<br />
            phoneNumber: {auth.currentUser != null ? auth.currentUser.phoneNumber : ''}<br />
          </p>
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
          <div className="mt-4">
            <Link href="/fire/find">
              <button className="btn btn-primary mr-3">
                go to Find &gt;&gt;
              </button>
            </Link>
            <Link href="/fire/add">
              <button className="btn btn-primary mr-3">
                go to Add &gt;&gt;
              </button>
            </Link>
          </div>
          <div className="mt-4">
            <Link href=".">
              <button className="btn btn-primary mr-3">
                &lt;&lt; Back to Top
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}
