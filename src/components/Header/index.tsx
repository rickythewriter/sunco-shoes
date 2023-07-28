import "./Header.css";
import Logo from '../subcomponents/Logo';
import ViewCartButton from '../subcomponents/ViewCartButton'

export default function Header() {
    return (
        <header id="header">
            <Logo />
            <ViewCartButton />
        </header>   
    )
}