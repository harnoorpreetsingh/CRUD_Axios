import axios from "axios";

//creating instance
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

//get fn 
export const getPosts = () => {
  return api.get("/posts");
};

//delete fn
export const delPosts = (id) => {
  return api.delete(`/posts/${id}`);
};

//post/add fn
export const addPosts = (post) => {
  return api.post("/posts", post);
};

//update fn
export const updatePosts = (post) => {
  return api.put(`/posts/${post.id}`, post);
};
