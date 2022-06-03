import React from "react";

function NavbarItem(props){
    return (
        <li className="nav-item">
            <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
        </li>
    );
}

export default NavbarItem;