export default function Footer() {
    return (
        <footer className="d-flex flex-column align-items-center text-white">
            <h1 className="display-3 mb-4">Le blog de l&apos;Everest</h1>

            <ul className="social-icons">
                <a href="#" className="text-white mx-3">
                    <i className="bi bi-facebook"></i>
                </a>

                <a href="#" className="text-white">
                    <i className="bi bi-instagram"></i>
                </a>

                <a href="#" className="text-white mx-3">
                    <i className="bi bi-twitter"></i>
                </a>
                
                <a href="#" className="text-white">
                    <i className="bi bi-youtube"></i>
                </a>
            </ul>
        </footer>
    )
}