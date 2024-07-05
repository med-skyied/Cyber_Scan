
import '../App.css';
import cyberimg from '../assets/cyber-sec-img.png';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

const Root = () => {
    const navigate = useNavigate();
    function handleStartClick() {
        navigate('/home');
    }
    return (
        <>
        <div className="App-main">
            <p className='welcome_header'>Welcome to Cyber Scan. (a Cyber Security project)</p>
            <p>This project is a web application to provide cyber security tools that help users in different steps of a cyber operation.</p>
            <p>This is a work in progress, using multiple api providers. The idea is to assemble a colletion of data gathering and analysis tools to help better identify and analyse the target you are after.</p>
            <p>This app can be used for forensic analysis, and Cyber info gathering, No attack functionalities are provider. (for obvious reasons).</p>
            <img alt='cyber security image' src={cyberimg} className='Cyber-img-main'></img>
            <h5 className='Start-note'>Note: This is intended for education purposes only, We bear no responsabily for any malicious use of this app functionalities.</h5>
            <button className='Start-button' onClick={handleStartClick}>Enter</button>
            </div>

        </>
    )
};
export default Root;
