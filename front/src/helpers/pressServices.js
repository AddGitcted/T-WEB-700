import Axios from "axios";

export const getPressNews = async () => {
    const res = await Axios.get(
        "http://localhost:8080/articles"
    );

    if (res.data)
        return res.data.articles;
    else
        return null;
}
