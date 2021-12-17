import styled from "styled-components";
import Carousel, { consts } from 'react-elastic-carousel';
import './slider.scss'

const myArrow = ({ type, onClick, isEdge }) =>
{
     return (
        <div className={'slider__btn_container'}>
            <div className={'slider__btn'} onClick={onClick} disabled={isEdge}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="12" transform="matrix(-1 0 0 1 12 12)" fill="#a6b0c3"></circle><path d="M11.5 8.25L15.25 12L11.5 15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
        </div>
    );
};

const Wrapper = styled.div`
  height: 1000px;
`;

export default myArrow;
