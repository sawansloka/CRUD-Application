import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import '../style2.css';

function User() {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState(0);
  const [newContent, setnewContent] = useState('');
  const [Datalist, setDatalist] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3009/read').then(response => {
      setDatalist(response.data);
    });
  });

  // Post request to server to add to list
  const addToList = () => {
    axios.post('http://localhost:3009/insert', {
      Title: Title,
      Content: Content,
    });
  };

  // Post request to server to update
  const updateContent = id => {
    axios.put('http://localhost:3009/update', {
      id: id,
      newContent: newContent,
    });
  };

  // Post request to server to delete
  const deleteTitle = id => {
    axios.delete(`http://localhost:3009/delete/${id}`);
  };

  return (
    <div>
      {' '}
      <div className="Container">
        <div className="Row">
          <div className="Box1">
            <div className="col-sm-6">
              <input
                className="Title"
                type="text"
                placeholder="Title...."
                onChange={event => {
                  setTitle(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-sm-8">
            <div className="Box2">
              <textarea
                type="text"
                className="Content"
                id="txt"
                placeholder="Content..."
                onChange={event => {
                  setContent(event.target.value);
                }}
              />
              <button type="button" class="btn btn-success" onClick={addToList}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Data List</h1>
      <div className="Container bx">
        {Datalist.map((val, key) => {
          return (
            <div key={key} className="Box">
              <div className="ContentBox">
                <div className="row">
                  <div className="col-md-4">
                    <span className="Name">Title: {val.Title}</span>
                  </div>
                  <div className="col-md-4">
                    <span className="Comment"> Content: {val.Content}</span>
                  </div>
                  <input
                    type="text"
                    className="text2"
                    placeholder="New thread.."
                    onChange={event => {
                      setnewContent(event.target.value);
                    }}
                  />
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => updateContent(val._id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteTitle(val._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default User;
