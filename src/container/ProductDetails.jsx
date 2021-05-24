import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import $ from "jquery";
import {
  MinimizeOutlined,
  PlusOne,
  ShoppingCartOutlined,
  StarBorderOutlined,
} from "@material-ui/icons";

const ProductDetails = (props) => {
  const [productDetail, setproductDetail] = useState({});

  useEffect(() => {
    let getid = props.location.pathname.split("/shop/item/").pop();
    getsingleProduct(getid);
    $(document).ready(function () {
      // MDB Lightbox Init
      $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
      });
    });
  }, []);

  function getsingleProduct(key) {
    let dbRef = firebase.database().ref("all_Products");
    dbRef
      .child(key)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setproductDetail(snapshot.val());
        }
      });
  }

  return (
    <div>
      <h1>Product details page</h1>
      {Object.keys(productDetail).length !== 0 ? (
        <>
          <img src={productDetail.img} />
          <h1>{productDetail.title}</h1>
          <h3>{productDetail.brand}</h3>
          <p>{productDetail.description}</p>
          <h4>{productDetail.price}</h4>
        </>
      ) : (
        <h1>Loading....</h1>
      )}

      {/*Section: Block Content*/}
      <div className="container">
        <div className="row">
          <section className="mb-5">
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0">
                <div id="mdb-lightbox-ui" />
                <div className="mdb-lightbox">
                  <div className="row product-gallery mx-1">
                    <div className="col-12 mb-0"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h5>{productDetail.title}</h5>
                <p className="mb-2 text-muted text-uppercase small">
                  {productDetail.title}
                </p>
                <ul className="rating">
                  <li>
                    <StarBorderOutlined />
                  </li>
                  <li>
                    <StarBorderOutlined />
                  </li>
                  <li>
                    <StarBorderOutlined />
                  </li>
                  <li>
                    <StarBorderOutlined />
                  </li>
                  <li>
                    <StarBorderOutlined />
                  </li>
                </ul>
                <p>
                  <span className="mr-1">
                    <strong>${productDetail.price}</strong>
                  </span>
                </p>
                <p className="pt-1">{productDetail.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Model</strong>
                        </th>
                        <td>{productDetail.brand}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Color</strong>
                        </th>
                        <td>Black</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Delivery</strong>
                        </th>
                        <td>All over in Pakistan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="table-responsive mb-2">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td className="pl-0 pb-0 w-25">Quantity</td>
                        <td className="pb-0">Select size</td>
                      </tr>
                      <tr>
                        <td className="pl-0">
                          <div className="def-number-input number-input safai_only mb-0">
                            <MinimizeOutlined />
                            <input
                              className="quantity"
                              min={1}
                              name="quantity"
                              defaultValue={1}
                              type="number"
                            />
                            <PlusOne />
                          </div>
                        </td>
                        <td>
                          <div className="mt-1">
                            <div className="form-check form-check-inline pl-0">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="small"
                                name="materialExampleRadios"
                                defaultChecked
                              />
                              <label
                                className="form-check-label small text-uppercase card-link-secondary"
                                htmlFor="small"
                              >
                                Small
                              </label>
                            </div>
                            <div className="form-check form-check-inline pl-0">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="medium"
                                name="materialExampleRadios"
                              />
                              <label
                                className="form-check-label small text-uppercase card-link-secondary"
                                htmlFor="medium"
                              >
                                Medium
                              </label>
                            </div>
                            <div className="form-check form-check-inline pl-0">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="large"
                                name="materialExampleRadios"
                              />
                              <label
                                className="form-check-label small text-uppercase card-link-secondary"
                                htmlFor="large"
                              >
                                Large
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-md mr-1 mb-2"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-md mr-1 mb-2"
                >
                  {/* <i className="fa fa-shopping-cart pr-2" /> */}
                  <ShoppingCartOutlined />
                  Add to cart
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/*Section: Block Content*/}
    </div>
  );
};

export default withRouter(ProductDetails);
