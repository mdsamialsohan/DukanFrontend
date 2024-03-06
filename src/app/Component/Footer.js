import React from 'react';

function Footer({ user }) {
    return (
        <footer className="main-footer">
            <div className="pull-right hidden-xs">
                <b>Version</b> 2
            </div>
            <strong>Copyright &copy; 2023 <a href="/">Sohan</a>.</strong> All rights
            reserved.
        </footer>
    );
}

export default Footer;
