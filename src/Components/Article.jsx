import React, { useEffect } from "react";
//import axios from "axios";
import { Grid, Container, Card, Item } from "semantic-ui-react";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { toast } from "react-toastify";
import ArticlesApi from "../modules/ArticlesApi";



const Article = () => {
  let navigate = useNavigate();
  const params = useParams()
  //let { id } = useParams();
  //const dispatch = useDispatch();
  const { activeArticle, userAuthenticated } = useSelector((state) => state);
  let article = activeArticle;

  // const fetchArticle = async () => {
  //   const response = await axios.get(`api/article/${id}`);
  //   dispatch({ type: "SET_ACTIVE_ARTICLE", payload: response.data.article });
  // };

  useEffect(() => {
    //fetchArticle();
    ArticlesApi.show(parseInt(params.id))

  }, []);
  useEffect(() => {
    if (!userAuthenticated) {
      toast.error("Please login to view full articles");
      navigate("/login");
    }
  }, []);

  return (
    <Container text>
      <Card sx={{ width: '100%', maxWidth: 700 }}
        header={article?.title}
        meta={`By: ${article?.author}`}
        image={article?.image}
        description={() => (
          <>
            <h2>{article?.headline}</h2>
            <p data-cy="article-body">{article?.body}</p>
          </>
        )}
      ></Card>
    </Container>
  );
};





export default Article;
