
import NewsRoomAPI from "./NewsRoomAPIconfig";
import store from "../state/store/configureStore";

const { dispatch } = store;

const ArticlesAPI = {

  async index() {
    const response = await NewsRoomAPI.get("/articles");
    dispatch({ type: "SET_ARTICLES", payload: response.data.articles });
  },
  async show(id) {
    const response = await NewsRoomAPI.get(`/article/${id}`);
    dispatch({ type: "SET_ACTIVE_ARTICLE", payload: response.data.article });
  },

  async getLocation() {
    const position = await fetchUserCoordinates();

    if (position.error) {
      dispatch({
        type: "SET_USER_COUNTRY",
        payload: "location cannot be detected",
      });
    } else {
      const openCageResponse = await NewsRoomAPI.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            key: process.env.REACT_APP_OPENCAGEAPI_KEY,
            q: `${position.coords.latitude}+${position.coords.longitude}`,
          },
        }
      );
      dispatch({
        type: "SET_USER_COUNTRY",
        payload: openCageResponse?.data.results[0].components.country,
      });
    }
  },
};
function fetchUserCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
    });
  });
}

export default ArticlesAPI;
