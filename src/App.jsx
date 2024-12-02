import { useEffect, useState } from "react";
import { addPosts, delPosts, getPosts, updatePosts } from "./api/GetData";
import "./App.css";

function App() {
  const [Data, setData] = useState([]);
  const [addData, setaddData] = useState({
    title: "",
    body: "",
  });
  const [editData, seteditData] = useState(null);
  const [error, setError] = useState("");

  const getPostData = async () => {
    try {
      const res = await getPosts();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDel = async (id) => {
    try {
      const res = await delPosts(id);
      if (res.status === 200) {
        const updatedData = Data.filter((curElm) => curElm.id !== id).map(
          (item, index) => ({
            ...item,
            id: index + 1,
          })
        );
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInpChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setaddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    seteditData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await addPosts(addData);
    console.log(res, "response...");
    if (res.status === 201) {
      setData([...Data, { ...res.data, id: Data.length + 1 }]);
      setaddData({ title: "", body: "" });
    }
  };

  const editPostData = async () => {
    const res = await updatePosts(editData);
    console.log(res, "response...");
    if (res.status === 200) {
      const updatedData = Data.map((item) =>
        item.id === editData.id ? editData : item
      );
      setData(updatedData);
      seteditData(null); // Reset editData to null after updating
      setaddData({ title: "", body: "" }); // Reset addData to empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((editData && (!editData.title.trim() || !editData.body.trim())) || (!editData && (!addData.title.trim() || !addData.body.trim()))) {
      setError("Title and Body cannot be blank.");
      return;
    }
    setError("");
    if (editData) {
      editPostData();
    } else {
      addPostData();
    }
  };

  const handleEdit = (data) => {
    seteditData(data);
    setaddData(data);
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-gray-700 p-2"
            onChange={editData ? handleEditChange : handleInpChange}
            placeholder="Add Title"
            value={editData ? editData.title : addData.title}
            name="title"
          />
          <input
            type="text"
            className="border border-gray-700 p-2"
            onChange={editData ? handleEditChange : handleInpChange}
            value={editData ? editData.body : addData.body}
            placeholder="Add Post"
            name="body"
          />
          <button className="bg-emerald-500 p-2">
            {editData ? "Update" : "Add"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {Data?.map((dt, index) => (
          <Card key={`${dt.id}-${index}`} handleDel={handleDel} handleEdit={handleEdit} Data={dt} />
        ))}
      </div>
    </>
  );
}

const Card = ({ Data, handleDel, handleEdit }) => {
  const { id, title, body } = Data;

  return (
    <div className="bg-gray-800 m-1 w-[400px] text-white p-2 text-start">
      {id}
      <h4 className="mt-4">Title: {title}</h4>
      <h4 className="mt-2">News: {body}</h4>
      <div className="btns mt-4 flex gap-3">
        <button className="bg-green-400 p-2" onClick={() => handleEdit(Data)}>Edit</button>
        <button className="bg-red-400 p-2" onClick={() => handleDel(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default App;
