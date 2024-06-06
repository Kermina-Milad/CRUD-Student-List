import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import "./Home.css"
import fireDb, { get } from '../firebase';
import { getDatabase, ref, remove } from '@firebase/database';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const contactsRef = ref(fireDb, 'contacts');
    get(contactsRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData({...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({})
    }
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Student")) {
      const db = getDatabase();
      const dbRef = ref(db, `contacts/${id}`);
      remove(dbRef).then(() => {
        setData((prevData) => {
            const newData = {...prevData };
            delete newData[id];
            return newData;
          });
          toast.success("Student Deleted Successfully");
        }).catch((err) => {
          toast.error(err);
        });
      }
    };
  return (
    <div style={{ marginTop: "100px" }}>
      <div className="table-responsive">
        <table className="table">
        <thead className="custom-thead-dark">
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }} className="d-none d-sm-table-cell">Email</th>
              <th style={{ textAlign: "center" }} className="d-none d-sm-table-cell">Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td className="d-none d-sm-table-cell">{data[id].email}</td>
                  <td className="d-none d-sm-table-cell">{data[id].contact}</td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center">
                      <Link to={`/update/${id}`}>
                        <button className="btn btn-primary mb-2 mb-sm-0">
                          <FaEdit />
                        </button>
                      </Link>
                      <button className="btn btn-danger mb-2 mb-sm-0" onClick={() => onDelete(id)}>
                          <FaTrash />
                    </button>
                      <Link to={`/view/${id}`}>
                        <button className="btn btn-info mb-2 mb-sm-0">
                          <FaEye />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home; 