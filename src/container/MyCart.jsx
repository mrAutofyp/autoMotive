import React, { useEffect, useState } from "react";
import firebase from "../config/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../assets/css/addCart.css";
import Button from "@material-ui/core/Button";

const MyCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [qtn, setQtn] = useState([]);
  var user = props.currentuser;
  var dbProdRef = firebase.database().ref("all_Products");
  var db = firebase.database();

  function getCartitems() {
    let isAvailable = Object.keys(user).length;

    let prd = [];
    let qtn = [];
    if (isAvailable !== 0) {
      db.ref(`users`)
        .child(`${user.userUid}/cartItems`)
        .on("child_added", (data) => {
          qtn.push(data.val().qtn);
          dbProdRef
            .child(data.val().productID)
            .get()
            .then((prod) => {
              if (prod.exists()) {
                prd.push(prod.val());
              }
            })
            .catch((error) => {
              console.error(error);
              alert(error.message);
            });
        });

      setTimeout(() => {
        setCartItems(prd);
        setQtn(qtn);
      }, 300);
    }
  }

  useEffect(() => {
    getCartitems();
  }, [user]);

  return (
    <>
      {Object.keys(props.currentuser).length !== 0 ? (
        <div>
          <h1>My cart</h1>
          <div className="container_section">
            <div className="deletAll">
              <a href="" id="del_all">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                <span>DeletAll</span>
              </a>
            </div>
            <div className="cart_header">
              <h2>Product</h2>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>Sub Total</h4>
            </div>

            <div className="cart_container">
              {cartItems.map((item, key) => {
                return (
                  <>
                    {/* {cartItems.map((v, i) => {
                     
                    })} */}
                    <div className="cart_details" key={key}>
                      <div className="cart_img">
                        <i
                          className="fa fa-times-circle remove"
                          aria-hidden="true"
                        ></i>
                        <img src={item.img} alt="" />
                        <span className="cart_name">{item.title}</span>
                      </div>
                      <div className="cart_price">{item.price}</div>
                      <div className="cart_qtn">
                        <i
                          className="fa fa-minus-circle inc_dec dec_cart"
                          aria-hidden="true"
                        ></i>
                        <span className="qtn_box">{qtn[key]}</span>
                        <i
                          className="fa fa-plus-circle inc_dec inc_cart"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="cart_item_total">
                        <span id="total_pr">
                          ${parseInt(item.price * qtn[key])}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
              {/* <div className="cart_details">
                <div className="cart_img">
                  <i className="fa fa-times-circle remove" aria-hidden="true"></i>
                  <img src="assets/images/prodt1.jpg" alt="" />
                  <span className="cart_name">Canon DSLR</span>
                </div>
                <div className="cart_price">$50.00</div>
                <div className="cart_qtn">
                  <i
                    className="fa fa-minus-circle inc_dec dec_cart"
                    aria-hidden="true"
                  ></i>
                  <span className="qtn_box">1</span>
                  <i
                    className="fa fa-plus-circle inc_dec inc_cart"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="cart_item_total">
                  <span id="total_pr">$50.00</span>
                </div>
              </div> */}
            </div>
            <div className="total_cartPrice">
              <div className="final_ptice">
                <h2>Cart Totals</h2>
                <div className="final_p_box">
                  <span>Total Cart Items</span>
                  <span id="total_cartitems">$50.00</span>
                  <span>Total Cart Price</span>
                  <span id="total_cartPrice">$00.00</span>
                  <span>Shipping Fee</span>
                  <span id="ship_fees">$00.00</span>
                  <span>Final Order Price</span>
                  <span id="final_price">$00.00</span>
                </div>
                <Button className="mybtn">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Plz login to your account first</h1>
      )}
    </>
  );
};

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
});

export default connect(mapStateToProps, null)(withRouter(MyCart));
