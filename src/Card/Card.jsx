import { delPosts } from "../api/GetData";

export const Card = ({ Data }) => {
  const { id, title, body } = Data;


  const handleDel = async (id) => {
   try {
    const res = await delPosts(id);
    if(res.status === 200){
      const updatedPosts = Data.filter((curelem)=>{
        return curelem.id === id
      })
      setData(updatedPosts);
    }
   } 
   
   catch (error) {
    console.log(error)
   }
  };
  return (
    <>
      <div className="bg-gray-800 m-1 w-[400px] text-white p-2 text-start">
        {id}
        <h4 className="mt-4">Title: {title} </h4>
        <h4 className="mt-2">News: {body} </h4>
        <div className="btns mt-4 flex gap-3">
          <button className="bg-green-400 p-2">Edit</button>
          <button className="bg-red-400 p-2 " onClick={() => handleDel(id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
