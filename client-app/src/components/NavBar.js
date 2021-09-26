import React from 'react';
import { Container, Nav, Navbar, NavLink} from 'react-bootstrap';
import { HomePage } from './HomePage';
import { ProductList } from './ProductList';
import { NotFound } from './NotFound';
import { About } from './About';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function NavBar() {
    function login() {
        console.log("login");
    }

    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/products">Products</NavLink>
                        <NavLink href="/about">About</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink onClick={login}>Login</NavLink>
                    </Nav>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/products" component={ProductList} />
                <Route exact path="/about" component= {About} />
                <Route component={NotFound} />
            </Switch>

        </Router>
    );
}
export { NavBar };