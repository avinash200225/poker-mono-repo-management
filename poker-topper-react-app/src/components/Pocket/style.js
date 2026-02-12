import styled from "@emotion/styled";


export const StatusIcon = styled.div`
    position: absolute;
    color: ${props => props.color ? props.color: "darkturquoise"};
    left:  ${props => props.left ? props.left : "437px"};
    top: ${props => props.top ? props.top : "23px"};
    z-index: 70;
    width: 48px;
    height: 48px;
`;


export const BetIcon = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 1.2fr 3fr;
    grid-template-rows: repeat(1,1fr);
    align-items: center;
    
    color: ${props => props.color ? props.color: "darkturquoise"};
    left:  ${props => props.left ? props.left : "437px"};
    top: ${props => props.top ? props.top : "23px"};
    z-index: 70;
    width: min-content;
    height: 38px;

    font-family: 'Rubik';
    font-weight: 700;
    font-size: 1.3rem;

    background: black;
    border-radius: 20px;
    transform-style: preserve-3d;
    transform: perspective(54em) rotateX(30deg);
    padding-right: 8px;
    padding-left: 8px;
`

export const BetIconMirror = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 3fr 1.2fr;
    grid-template-rows: repeat(1,1fr);
    align-items: center;
    
    color: ${props => props.color ? props.color: "darkturquoise"};
    left:  ${props => props.left ? props.left : "437px"};
    top: ${props => props.top ? props.top : "23px"};
    z-index: 70;
    width: min-content;
    height: 38px;

    font-family: 'Rubik';
    font-weight: 700;
    font-size: 1.3rem;

    background: black;
    border-radius: 20px;
    transform-style: preserve-3d;
    transform: perspective(54em) rotateX(30deg);
    padding-right: 8px;
    padding-left: 8px;
`