import base from "~/services/axiosBase";


export default {
  namespaced: true,
  getBikesList: (payload) => {
    return base.api.get("bikes_response", payload);
  },
};
