import './styles.css';
import BackIcon from '../../assets/left_arrow_icon.png';

export default function SecondaryHeader({ pageBack }) {
    return (
        <header className='secondary-header'>
            <img className='simplified-header__back transform' onClick={pageBack} src={BackIcon} alt="Voltar" title="Voltar para a página anterior" />
            <h1 className='header-title'>Dragons</h1>
        </header>
    );
}