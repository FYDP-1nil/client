import axios from 'axios';
import { tokenSlice } from 'renderer/Slice/tokenSlice';
import { store } from 'renderer/store';
// import React from "react";

const baseURL = 'http://127.0.0.1:5000';

// export default function App() {
//   const [post, setPost] = React.useState(null);

//   React.useEffect(() => {
//     axios.get(`${baseURL}/1`).then((response) => {
//       setPost(response.data);
//     });
//   }, []);

// function createPost() {
//   axios
//     .post(baseURL, {
//       title: "Hello World!",
//       body: "This is a new post."
//     })
//     .then((response) => {
//       setPost(response.data);
//     });
// }

// export const joinLeague = async() => {
//     axios.get(`${baseURL}/league/join`).then((response) => {
//       console.log(response.data);
//     }).catch((e)=>return e);
// };

// export const createGame = async() => {
//   axios.post(`${baseURL}/game/create`).then((response) => {
//     console.log(response.data);
//   }).catch((e)=>return e)
// };

// export const postGameEvent = async() => {
//   axios.post(`${baseURL}/game/events`).then((response) => {
//     console.log(response.data);
//   }).catch((e)=>return e)
// };

// export const getStats = async(type,id) => {
//   axios.get(`${baseURL}/game/${type}/${id}/stats`).then((response) => {
//     console.log(response.data);
//   }).catch((e)=>return e)
// };

// export const createUser = async() => {
//   axios.post(`${baseURL}/1`).then((response) => {
//     setPost(response.data);
//   }).catch((e)=>return e)
// };

export const loginUser = async (user, pass) => {

  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        username: user,
        password: pass,
      },
      method: 'POST',
      url: `${baseURL}/login`,
    });
    store.dispatch(tokenSlice.actions.saveJWT(response.data.access_token));
    res = true;
  } catch (err) {
    return res;
  }
  return res;
};

//   if (!post) return "No post!"

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.body}</p>
//       <button onClick={createPost}>Create Post</button>
//     </div>
//   );
// }

// import axios from "axios";
// import { API } from "../actions/types";
// import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";

// const apiMiddleware = ({ dispatch }) => next => action => {
//   next(action);

//   if (action.type !== API) return;

//   const {
//     url,
//     method,
//     data,
//     accessToken,
//     onSuccess,
//     onFailure,
//     label,
//     headers
//   } = action.payload;

//   const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

//   // axios default configs
//   axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
//   axios.defaults.headers.common["Content-Type"]="application/json";
//   axios.defaults.headers.common["Authorization"] = `Bearer${token}`;

//   axios
//     .request({
//       url,
//       method,
//       headers,
//       [dataOrParams]: data
//     })
//     .then(({ data }) => {
//       dispatch(onSuccess(data));
//     })
//     .catch(error => {
//       dispatch(apiError(error));
//       dispatch(onFailure(error));

//       if (error.response && error.response.status === 403) {
//         dispatch(accessDenied(window.location.pathname));
//       }
//     })
//    .finally(() => {
//       if (label) {
//         dispatch(apiEnd(label));
//       }
//    });
// };
