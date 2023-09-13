import "./footer.css"
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__users">
                <div className="footer__users__container">
                    <h2 className="footer__title">Creadores</h2>
                    <div className="footer__user">
                        <img src="footer/github.png" className="footer__img" />
                        <h3 className="footer__name">
                            <a href="https://github.com/MaximilianoZuniga50234" className="footer__link">
                                MaximilianoZuniga50234
                            </a>
                        </h3>
                    </div>
                    <div className="footer__user">
                        <img src="footer/github.png" className="footer__img" />
                        <h3 className="footer__name">
                            <a href="https://github.com/CandeZuniga" className="footer__link">
                                CandeZuniga
                            </a>
                        </h3>
                    </div>
                    <div className="footer__user">
                        <img src="footer/github.png" className="footer__img" />
                        <h3 className="footer__name">
                            <a href="https://github.com/FJFFH" className="footer__link">
                                FJFFH
                            </a>
                        </h3>
                    </div>
                    <div className="footer__user">
                        <img src="footer/github.png" className="footer__img" />
                        <h3 className="footer__name">
                            <a href="https://github.com/Laujo11" className="footer__link">
                                Laujo11
                            </a>
                        </h3>
                    </div>
                </div>
            </div>

            <div className="footer__info">
                <ul className="footer__ul">
                    <li className="footer__li">Contacto</li>
                    <li className="footer__li">Sobre Nosotros</li>
                </ul>
            </div>
        </footer>

    )
}
