import React, { useState } from "react";
import firebase from "../../../config/firebase";
import ClearIcon from "@material-ui/icons/Clear";

function PostNewProd(props) {
  const [prodData, setProdData] = useState({
    title: "",
    description: "",
    price: "",
    productImgs: {
      img1: {},
      img2: {},
      img3: {},
    },
    condition: "",
    brand: "",
  });

  var ImgName,
    reader,
    files = [];

  function selectImg(e, imgno) {
    e.preventDefault();
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      files = e.target.files;
      var name = "img" + imgno;
      let old = prodData.productImgs;
      setProdData({
        ...prodData,
        productImgs: { ...old, [name]: files[0] },
      });

      reader = new FileReader();
      reader.onload = function () {
        document.getElementById(`productImg${imgno}`).src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
  }

  function removeImg(imgno) {
    document.getElementById(`productImg${imgno}`).src = "";
    let old = prodData.productImgs;
    let name = "img" + imgno;
    setProdData({
      ...prodData,
      productImgs: { ...old, [name]: {} },
    });
  }

  function uploadImg(file, i) {
    let loadingDiv = document.getElementById("uploadingloaderwrapper");
    return new Promise((resolve, reject) => {
      let task;
      var storageRef = firebase.storage().ref("store-images/" + file[i].name);
      task = storageRef.put(file[i]);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          loadingDiv.innerHTML = `<h1>Loading... <br/> ${percentage}%</h1>`;

          // use the percentage as you wish, to show progress of an upload for example
        }, // use the function below for error handling
        function (error) {
          console.log(error);
          alert(error.message);
        },
        function complete() {
          //This function executes after a successful upload
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            resolve(downloadURL);
            loadingDiv.innerHTML = "";
            // loadingDiv.innerHTML = "";
          });
        }
      );
    });
  }
  // New Ad post function with Image
  async function uploadNewProduct(e) {
    e.preventDefault();

    let k = [];
    let imgUrls = [];
    for (var i = 0; i < 3; i++) {
      k.push(Object.entries(prodData.productImgs)[i][1]);
    }
    let task;
    for (var j = 0; j < k.length; j++) {
      var dd = await uploadImg(k, j);

      imgUrls.push(dd);

      if (imgUrls.length === 3) {
        // getting currenty data
        var d = new Date();
        var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sepr";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var n = month[d.getMonth()];
        var todayDate = d.getDate();
        var currentYear = d.getFullYear();
        var postdate = todayDate + " " + n + " " + currentYear;

        // uploading to Database

        let key = firebase.database().ref("all_Products").push().key;
        let prod = {
          key: key,
          title: prodData.title,
          description: prodData.description,
          price: prodData.price,
          imgs: imgUrls,
          postdate: postdate,
          condition: prodData.condition,
          brand: prodData.brand,
        };

        firebase.database().ref("all_Products").child(key).set({ prod });
        setProdData({
          title: "",
          description: "",
          price: "",
          condition: "",
          brand: "",
          productImgs: {
            img1: {},
            img2: {},
            img3: {},
          },
        });
        alert("New Product Uploaded");
      }
    }
  }
  return (
    <div>
      <div id="uploadingloaderwrapper"></div>

      <div className="">
        <div className="my_row">
          <div className="post_container">
            <div className="post_top">
              <h2>ADD NEW PRODUCT</h2>
            </div>
            <div className="post_body">
              <form
                action=""
                onSubmit={(e) => uploadNewProduct(e)}
                method="POST"
              >
                <div className="post_detailBox">
                  <br></br>
                  <h3>INCLUDE SOME DETAILS</h3>
                </div>
                <div className="post_detailBox">
                  <label htmlFor="title">Product title *</label>
                  <input
                    name="title"
                    value={prodData.title}
                    onChange={(e) =>
                      setProdData({ ...prodData, title: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Title"
                  />
                  <span>
                    Mention the key features of your item (e.g. brand, model,
                    age, type)7 / 70
                  </span>
                </div>
                <div className="post_detailBox ">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    name="description"
                    value={prodData.description}
                    onChange={(e) =>
                      setProdData({ ...prodData, description: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Short Description"
                  />
                </div>
                <div className="post_detailBox">
                  <label htmlFor="brand">Make (comapny or Brand name)</label>
                  <input
                    name="brand"
                    value={prodData.brand}
                    onChange={(e) =>
                      setProdData({ ...prodData, brand: e.target.value })
                    }
                    type="text"
                    placeholder="Enter products company "
                  />
                </div>
                <div className="post_detailBox postsecDivider">
                  <label htmlFor="condition">Condition * (New or Used)</label>
                  <input
                    name="condition"
                    value={prodData.condition}
                    onChange={(e) =>
                      setProdData({ ...prodData, condition: e.target.value })
                    }
                    type="text"
                    placeholder="Enter condition"
                  />
                </div>
                <div className="post_detailBox">
                  <h3>SET A PRICE</h3>
                </div>
                <div className="post_detailBox postsecDivider">
                  <label htmlFor="price">Price*</label>
                  <input
                    name="price"
                    value={prodData.price}
                    onChange={(e) =>
                      setProdData({ ...prodData, price: e.target.value })
                    }
                    type="number"
                    placeholder="RS"
                    min="1"
                  />
                </div>
                <div className="post_detailBox">
                  <h3>UPLOAD PRODUCT IMAGES (required)</h3>
                </div>
                <div className="post_detailBox postsecDivider prodImgwrapper">
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 1)}
                    >
                      {prodData.productImgs.img1.name ? (
                        <img
                          id="productImg1"
                          className="formProdimg"
                          alt="product img"
                        />
                      ) : (
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>
                      )}
                    </button>

                    {prodData.productImgs.img1.name ? (
                      <ClearIcon
                        onClick={() => removeImg(1)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 2)}
                    >
                      {prodData.productImgs.img2.name ? (
                        <img
                          id="productImg2"
                          className="formProdimg"
                          alt="product img"
                        />
                      ) : (
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>
                      )}
                    </button>
                    {prodData.productImgs.img2.name ? (
                      <ClearIcon
                        onClick={() => removeImg(2)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 3)}
                    >
                      {prodData.productImgs.img3.name ? (
                        <img
                          id="productImg3"
                          className="formProdimg"
                          alt="product img"
                        />
                      ) : (
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>
                      )}
                    </button>
                    {prodData.productImgs.img3.name ? (
                      <ClearIcon
                        onClick={() => removeImg(3)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="post_detailBox ">
                  {prodData.price &&
                  prodData.description &&
                  prodData.title &&
                  prodData.productImgs.img1 ? (
                    <button className="postBtn">
                      Post Now
                      {/* <span id="Upprogress"></span> */}
                    </button>
                  ) : (
                    <button className="postBtnnot">Post Now</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostNewProd;
