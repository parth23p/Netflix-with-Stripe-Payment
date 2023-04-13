import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import db from "../Firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();

          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  //   console.log("Products list", products);
  // console.log("subscription", subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //show an error to cutomer and
        //inspect your cloud function in the firebase console
        alert(`An error occured : ${error.message}`);
      }
      if (sessionId) {
        // we have a session, let's redirect to checkout
        //Init stripe
        const stripe = await loadStripe(
          "pk_test_51LsUxXSD9oyuG3wYb00ZDsDnnm9SvF64jU1jn8FPssffgweiXnCtkeewvUG6ucjk82YAQcLSYSvnTAj9a3zclF3900Yc7oAuYK"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          <br />
          Renewal date :{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // add some loic to check if user's subscription is active...

        const isCurrrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrrentPackage && "plansScreen__plan__disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
