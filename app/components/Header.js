import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem"; // Importera din modal-komponent

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCartModal = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-green-800 text-white">
      <Link href="/">
        <div className="flex items-center">
          <Image src="/images/groda.jpg" alt="logo" width={80} height={50} />
          <h1 className="ml-2 text-2xl font-bold">The Frog Store</h1>
        </div>
      </Link>
      <div className="flex space-x-4">
        {/* Sökikon */}
        <Link href="#" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </Link>

        {/* Varukorgsikon */}
        <button className="hover:text-gray-400" onClick={toggleCartModal}>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>

      {/* Visa varukorgsmodalen */}
      {isCartOpen && <CartItem closeModal={toggleCartModal} />}
    </header>
  );
};

export default Header;
