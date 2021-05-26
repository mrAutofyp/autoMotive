import React from "react";
import ourLogo from "../../assets/images/logo.png";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailIcon from "@material-ui/icons/Email";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PersonIcon from "@material-ui/icons/Person";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { withRouter } from "react-router-dom";
function Footer(props) {
  return (
    <>
      {props.location.pathname &&
      props.history.location.pathname !== "/AdminDashboard" ? (
        <>
          <div id="contactus">
            <div
              style={{ backgroundColor: "#555555" }}
              className="row text-white"
            >
              <div className="col-lg-4 col-md-6 col-sm-12 text-end">
                <h3 className="ml-5 my-3" style={{ color: "goldenrod" }}>
                  Contact Information
                </h3>

                <h5 className="ml-5">
                  <span style={{ color: "#5e90d2" }} className="golden">
                    <PhoneIcon></PhoneIcon>
                  </span>
                  Phone
                </h5>
                <p className="ml-5">Phone # 03366579936</p>
                <p className="ml-5">Phone # 03035683337</p>

                <h5 className="ml-5">
                  <span style={{ color: " #25D366" }} className="golden">
                    <WhatsAppIcon></WhatsAppIcon>
                  </span>
                  Mobile Whatsapp
                </h5>
                <p className="ml-5">Whatsapp(0336-6140314)</p>

                <h5 className="ml-5">
                  <span style={{ color: " #820000" }} className="golden">
                    <EmailIcon></EmailIcon>
                  </span>
                  Email
                </h5>
                <p className="ml-5">dawoodbasharat546@gmil.com</p>

                <h5 className="ml-5">
                  <span className="golden">
                    <HourglassEmptyIcon
                      style={{ color: "goldenrod" }}
                    ></HourglassEmptyIcon>
                  </span>
                  Working Days/Hours
                </h5>
                <p className="ml-5"> Sat-Thur 10:00AM-9:00PM</p>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-12 ml-5">
                <h3 className=" my-3" style={{ color: "goldenrod" }}>
                  About Company
                </h3>
                <div className="">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "60px ",
                      height: "60px",
                      background: "transparent;",
                    }}
                    src={ourLogo}
                    alt="Avarter"
                  />
                  <span
                    style={{ fontSize: "20px", color: "goldenrod;" }}
                    className="mx-2 golden"
                  >
                    MR.AUTOMOTIVE
                  </span>
                </div>
                <p className="companydetails">
                  The company’s continuous struggle in providing the best
                  services to customers, gave us the courage to select quality
                  products from domestic manufacturers. Keeping in view the high
                  demand for ‘locally produced quality parts’ and to support and
                  boost the local parts manufacturing industry with the
                  intention of providing employment opportunities in Pakistan,
                  this Group decided to expand its horizons through a new brand
                  called <span className="golden">Mr.Automotive</span>
                </p>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 ml-5 companydetails1">
                <h3
                  className="ml-3 my-3 companydetails2 "
                  style={{ color: "goldenrod" }}
                >
                  <PersonIcon></PersonIcon> Be The First To Know
                </h3>
                <p className="mt-4">
                  Get all the latest information on Events, Sales and Offers.
                  Sign up for newsletter today.
                </p>
                <div className="companydetails1">
                  <input
                    className="mt-3 mr-3 companydetails1"
                    style={{
                      height: "60px",
                      width: "260px",
                      borderRadius: "50px; ",
                    }}
                    type="email"
                    name="mail"
                    id=""
                    placeholder="&nbsp; &nbsp;Enter Email"
                  />
                  <button
                    style={{
                      borderRadius: "50px",
                      height: "60px",
                      width: "130px",
                      backgroundColor: "goldenrod",
                      color: "black;",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                <h4
                  className="mt-5 ml-1 footfollow golden  "
                  style={{ fontSize: "30px" }}
                >
                  <ThumbUpIcon
                    style={{ fontSize: "30px", color: "#0066b2" }}
                  ></ThumbUpIcon>
                  &nbsp;<span></span>Follow Us
                </h4>
                <span
                  style={{ color: "goldenrod;" }}
                  className="mt-5 mx-3 footicon"
                >
                  <FacebookIcon
                    style={{
                      fontSize: "40px",
                      borderRadius: "10px",
                      backgroundColor: "#7393B3",
                      color: "#fff",
                    }}
                  ></FacebookIcon>
                  &nbsp;
                  <InstagramIcon
                    style={{
                      fontSize: "40px",
                      borderRadius: "10px",
                      backgroundColor: "C13584",
                    }}
                  ></InstagramIcon>{" "}
                  &nbsp;
                  <WhatsAppIcon
                    style={{
                      fontSize: "40px",
                      borderRadius: "15px",
                      backgroundColor: " #25D366",
                    }}
                  ></WhatsAppIcon>{" "}
                  &nbsp;
                  <EmailIcon
                    style={{
                      fontSize: "40px",
                      borderRadius: "10px",
                      backgroundColor: "#820000",
                    }}
                  ></EmailIcon>
                </span>
              </div>
            </div>

            <div>
              <center
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "13px",
                }}
                className="footer pt-3 pb-2 "
              >
                Mr. Automotive Copyright © 2003 - 2020 All Rights Reserved.
                <br />
                Terms of Service | Privacy Policy
                <br />
                Reproduction of material from any pages without permission is
                strictly prohibited.
              </center>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default withRouter(Footer);
