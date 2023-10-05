import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  //backend url
  baseUrl: "https://localhost:7153",
  //This will send back our http only secure cookie
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    //to send the access token everytime
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//Wrapper for the base query, in order to get a new refresh token, if the access tokena has expired

const baseQueryWithReauth = async (args, api, extraOtions) => {
  let result = await baseQuery(args, api, extraOtions);

  if (
    result?.error?.originalStatus === 403 &&
    result?.error?.originalStatus === 401
  ) {
    console.log("Access token");
    //send refresh token to get a new access token
    const refreshResult = await baseQuery("/refresh-token", api, extraOtions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user: user }));
      //retry the original query with the new access token
      result = await baseQuery(args, api, extraOtions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

//Create Api
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
