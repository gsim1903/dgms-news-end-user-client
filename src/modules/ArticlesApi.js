import axios from "axios";
import store from "../state/store/configureStore";

const { dispatch } = store
const ArticlesApi = {
  async index() {
    
    const response = await axios.get("api/articles");
    dispatch({ type: "SET_ARTICLES", payload: response.data.articles });
    
  },
  async show(id) {

    //const { articles } = getState
    const response = await axios.get(`api/article/${id}`);
    dispatch({ type: "SET_ACTIVE_ARTICLE", payload: response.data.article });
    
  }
};
export default ArticlesApi;
