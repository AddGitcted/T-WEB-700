import "./articles.scss";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import {
  getNewsByTag,
  getPressNews,
  getTags,
} from "../../helpers/pressServices";
import Select from "react-select";

const Articles = () => {
  let [items, setItems] = useState([]);
  let [tags, setTags] = useState([]);

  useEffect(() => {
    getPressNews().then((r) => setItems(r));
    getTags().then((t) => setTags(t));
  }, []);

  const updateArticles = (e) => {
    getNewsByTag(e).then((n) => setItems(n));
  };

  return (
    <Layout>
      <div className={"articles__header"}>
        <h1>Articles</h1>
        <div>
          <Select onChange={updateArticles} isMulti={true} options={tags} />
        </div>
      </div>
      {items
        .filter(function (item) {
          return typeof item === "object";
        })
        .map((item, index) => (
          <div className={"article__item"} key={index}>
            <div className={"article__infos"}>
              <a target="_blank" rel="noreferrer" href={item.link}>
                <h2 className={"article__title"}>{item.tittle}</h2>
              </a>
              <p className={"article__summary"}>{item.summary}</p>
              <p className={"article__edition"}>
                <span>{item.author}</span> | {item.published}
              </p>
            </div>
            <div className={"article__cover__container"}>
              <a target="_blank" rel="noreferrer" href={item.link}>
                <img
                  src={item.link_image}
                  alt={`Article image_${index}`}
                  className={"article__cover"}
                />
              </a>
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default Articles;
