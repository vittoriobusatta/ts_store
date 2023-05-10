import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CREATE_CART } from 'redux/slice';
import { AppDispatch, Product, ProductVariant, VariantCartAdded } from 'types';
import { formatPrice } from 'utils/helpers';
import { CloseIcon, SuccessIcon } from '../Vector';
import { RootState } from 'redux/store';

function ProductDetails({ product }: { product: Product }) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cartResponse, setCartResponse] = useState<any>(null);
  const popupTimeout = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const variants: ProductVariant[] = [];
  product.variants.edges.forEach((variant) => {
    variants.push(variant.node);
  });

  let variant = variants.find((variant) => variant.availableForSale);
  if (!variant) {
    variant = variants[0];
  }

  const productAdded: VariantCartAdded = {
    id: variant?.id ?? '',
    title: product.title,
    handle: product.handle,
    variantQuantity: 1,
    cartId: cart.id,
    price: parseFloat(variant?.price.amount ?? '0'),
    // productType: product.productType,
    // image: {
    //   src: variant?.image.url ?? '',
    //   alt: variant?.image.altText ?? '',
    // },
  };

  const handleCreateCart = async () => {
    setIsProcessing(true);

    const existingItem = cart.items.find(
      (product: any) => product.cartItem.id === variant?.id,
    );

    if (existingItem && existingItem.line.node.quantity >= 10) {
      alert('La quantité maximale de ce produit est de 10.');
      return;
    }

    if (cart.id === null) {
      dispatch(CREATE_CART(productAdded))
        .then((res: any) => setCartResponse(res.payload))
        .finally(() => setIsProcessing(false));
    } else {
      dispatch(ADD_TO_CART(productAdded))
        .then((res: any) => setCartResponse(res.payload))
        .finally(() => setIsProcessing(false));
    }
  };

  useEffect(() => {
    const displayPopup = () => {
      if (cartResponse) {
        if (popupTimeout.current) {
          clearTimeout(popupTimeout.current);
        }
        setShowPopup(true);
        popupTimeout.current = setTimeout(() => {
          setShowPopup(false);
        }, 4000);
      }
    };
    displayPopup();
  }, [cartResponse]);

  const handleCheckout = async () => {
    const url = `/api/checkout/create`;
    axios
      .post(url, {
        items: cart.items,
        cartId: cart.id,
      })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="product__details">
        <h1>{product.title}</h1>
        <h2>{product.productType}</h2>
        <div>
          <h2 className="product__details__price">
            {formatPrice(product.priceRange.minVariantPrice.amount)}
          </h2>
          {parseInt(product.compareAtPriceRange.minVariantPrice.amount) > 0 && (
            <p className="product__details__price--old">
              {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
            </p>
          )}
        </div>
      </div>
      <div className="product__details__button">
        <button
          type="button"
          onClick={handleCreateCart}
          disabled={isProcessing}
        >
          Ajouter au panier
        </button>
      </div>

      {showPopup && (
        <div className="product__popup">
          <div className="product__popup__head">
            <span className="product__popup__head__success">
              <SuccessIcon />
              <h3>Ajouté au panier !</h3>
            </span>
            <button
              className="product__popup__close"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="product__popup__item">
            <Link href={`/products/${cartResponse.item.handle}`}>
              <div className="placeholder" />
              <Image
                key={cartResponse.item.id}
                src={variant?.image.url}
                alt={variant?.image.altText}
                width={62}
                height={62}
                className="product__popup__item__image placeholder__image"
              />
            </Link>
            <div className="product__popup__item__info">
              <h1>{cartResponse.item.title}</h1>
              <h2>{product.productType}</h2>
              <h3>{formatPrice(cartResponse.item.price)}</h3>
            </div>
          </div>

          <div className="product__popup__button">
            <Link className="product__popup__button__cart" href="/cart">
              Voir le panier ({cart.quantity})
            </Link>
            <button
              className="product__popup__button__checkout"
              onClick={() => {
                handleCheckout();
              }}
            >
              Paiement
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
