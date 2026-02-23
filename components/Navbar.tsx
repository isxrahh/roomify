import React from 'react'
import {Box} from "lucide-react";
import Button from "./ui/Button";
import {useOutletContext} from "react-router";

const Navbar = () => {
    const {isSignedIn, userName, signIn, signOut} = useOutletContext<AuthContext>()

    const handleAuthClick = async () => {
        if (isSignedIn) {
            try {
                await signOut()
            } catch (err) {
                console.error(`Puter signOut failed: ${err}`);
            }
            return;
        }
        try {
            await signIn()
        } catch (err) {
            console.error(`Puter signIn failed: ${err}`);
        }
    };

    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Box className="logo"/>
                        <span className="name">Roomify</span>
                    </div>
                    <ul className="links">
                        <a href="#">Product</a>
                        <a href="#">Pricing</a>
                        <a href="#">Community</a>
                        <a href="#">Enterprise</a>
                    </ul>
                </div>
                <div className="actions">
                    {isSignedIn ? (
                        <>
                        <span className="greeting">
                            {userName ? `Hi, ${userName} !` : 'Signed in'}
                        </span>
                            <Button className="btn" onClick={handleAuthClick} size="sm">
                                Log Out
                            </Button></>
                    ) : (
                        <>
                            <Button onClick={handleAuthClick} size="sm" variant="ghost" className="login">
                                Log In
                            </Button>
                            <a href="#upload" className="cta">Get Started</a>
                        </>
                    )}

                </div>
            </nav>
        </header>
    )
}
export default Navbar
