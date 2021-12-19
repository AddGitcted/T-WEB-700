import Axios from "axios";
import { capitalize } from "@material-ui/core";

export const getPressNews = async () => {
  const res = await Axios.get(`${process.env.REACT_APP_API_HOST}/articles`);

  if (res.data) return res.data.articles;
  else return null;
};

const formatUrl = (tags) => {
  let url = `${process.env.REACT_APP_API_HOST}/articles?`;

  for (let i = 0; i !== tags.length; i++) {
    if (i !== 0) url = url + "&";
    url = url + "tag=" + tags[i].value;
  }
  return url;
};

export const getNewsByTag = async (tags) => {
  let url = formatUrl(tags);

  const res = await Axios.get(url);

  if (res.data) return res.data.articles;
  else return null;
};

export const getTags = async () => {
  const res = await Axios.get(
    `${process.env.REACT_APP_API_HOST}/articles/available_tag`
  );

  if (res.data) {
    let tags = [];

    for (let i = 0; i !== res.data.tags.length; i++) {
      let tag = {
        value: res.data.tags[i],
        label: capitalize(res.data.tags[i]),
      };
      tags.push(tag);
    }

    return tags;
  } else return null;
};
