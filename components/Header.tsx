import Link from 'next/link';
import React from 'react';
import { CartIcon } from './Vector';
import { useSelector } from 'react-redux';

function Header() {
  const quantity = useSelector((state: any) => state.cart.quantity);

  return (
    <header>
      <Link href="/">
        <h1>HIJAB</h1>
      </Link>
      <div>
        {/* <SearchIcon search={search} setSearch={setSearch} /> */}
        {/* {search && <SearchBar setSearch={setSearch} />} */}
        <Link className="pre" href="/cart">
          <CartIcon />
          <span className="pre__jewel">
            {quantity > 9 ? '9+' : quantity > 0 ? quantity : 0}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
