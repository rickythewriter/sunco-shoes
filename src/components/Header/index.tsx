import "./Header.css";
import Logo from "../Logo";
import ViewCartButton from "../ViewCartButton";

export default function Header() {
    return (
        <header id="header">
            <Logo />
            <ViewCartButton />
        </header>   
    )
}