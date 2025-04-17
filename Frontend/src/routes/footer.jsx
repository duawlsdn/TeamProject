import '../css/footer.css';
import Cart from '../components/Cart';

const Footer = () => {
  return (
    <footer className="footer">
      <Cart isFooter={true} />
    </footer>
  );
};

export default Footer;