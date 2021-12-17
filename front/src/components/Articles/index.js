import styled from "styled-components";
import './articles.scss';
import {Link} from "react-router-dom";
import Layout from "../Layout";
import {useEffect, useState} from "react";
import {getPressNews} from "../../helpers/pressServices";

const Articles = () => {
    let [items, setItems] = useState([]);

    useEffect(() => {
        getPressNews().then(r =>
            setItems(r)
        );
    }, []);

    return (
        <Layout>
            {items.filter(function(item) {
                return typeof item === 'object'
            }).map(item =>
                <div className={'article__item'}>
                    <div className={'article__infos'}>
                        <a target="_blank" href={item.link}>
                            <h2 className={'article__title'}>{item.tittle}</h2>
                        </a>
                        <p className={'article__summary'}>{item.summary}</p>
                        <p className={'article__edition'}><span>{item.author}</span> | {item.published}</p>
                    </div>
                    <div className={'article__cover__container'}>
                        <a target="_blank" href={item.link}>
                            <img src={item.link_image} alt={'Article image'} className={'article__cover'}/>
                        </a>
                    </div>
                </div>
            )}
        </Layout>
    );
};

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

export default Articles;
