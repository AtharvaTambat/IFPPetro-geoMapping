import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  async function registerUser() {
    navigate("/register");
  }
  async function loginUser() {
    navigate("/login");
  }
  return (
    <div>
      <header className="header-area header-sticky">
        {/* <div className="container"> */}
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="#" id="logo"></a>
              <ul className="nav">
                <li>
                  <a href="#welcome" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>

                <button id="bt1" className="btn" onClick={registerUser}>
                  Register
                </button>
                <button id="bt2" className="btn" onClick={loginUser}>
                  Log In
                </button>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
        {/* </div> */}
      </header>
      {/* ***** Header Area End ***** */}
      {/* ***** Welcome Area Start ***** */}
      <div className="welcome-area" id="welcome">
        {/* ***** Header Text Start ***** */}
        {/* <div className="header-text">
          <div className="container">
            <div className="row">

            </div>
          </div>
        </div> */}
        <div className="header-text">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
            <h1>
              We provide the best <strong>strategy</strong>
              <br />
              to grow up your <strong>business</strong>
            </h1>
            <p>
              Softy Pinko is a professional Bootstrap 4.0 theme designed by
              Template Mo for your company at absolutely free of charge
            </p>
            <a href="#features" className="main-button-slider">
              Discover More
            </a>
          </div>
        </div>
        {/* ***** Header Text End ***** */}
      </div>
      {/* ***** Welcome Area End ***** */}
      {/* ***** Features Small Start ***** */}
      <section className="section home-feature">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* ***** Features Small Item Start ***** */}
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
              >
                <div className="features-small-item">
                  <div className="icon">
                    <i>
                      <img id="feat" alt="" />
                    </i>
                  </div>
                  <h5 className="features-title">Modern Strategy</h5>
                  <p>
                    Customize anything in this template to fit your website
                    needs
                  </p>
                </div>
              </div>
              {/* ***** Features Small Item End ***** */}
              {/* ***** Features Small Item Start ***** */}
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
              >
                <div className="features-small-item">
                  <div className="icon">
                    <i>
                      <img id="feat" alt="" />
                    </i>
                  </div>
                  <h5 className="features-title">Best Relationship</h5>
                  <p>Contact us immediately if you have a question in mind</p>
                </div>
              </div>
              {/* ***** Features Small Item End ***** */}
              {/* ***** Features Small Item Start ***** */}
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
              >
                <div className="features-small-item">
                  <div className="icon">
                    <i>
                      <img id="feat" alt="" />
                    </i>
                  </div>
                  <h5 className="features-title">Ultimate Marketing</h5>
                  <p>
                    You just need to tell your friends about our free templates
                  </p>
                </div>
              </div>
              {/* ***** Features Small Item End ***** */}
            </div>
          </div>
        </div>
      </section>
      {/* ***** Features Small End ***** */}
      {/* ***** Features Big Item Start ***** */}
      <section
        className="section padding-top-70 padding-bottom-0"
        id="features"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 col-md-12 col-sm-12 align-self-center left"
              data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
            ></div>
            <div className="col-lg-1" />
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
              <div className="left-heading">
                <h2 className="section-title mt-3">About IFP Petro</h2>
              </div>
              <div className="left-text me-4 mt-1">
                <p>
                  IFP Petro Products (P) Ltd. Established in 1977 has been
                  providing its refining, blending, packaging, testing, storing
                  and logistics services to many top companies like IOCL, BPCL,
                  etc. <br />
                  The company was founded in 1977 in technical collaboration
                  with Indian Institute of Petroleum (IIP), Dehradun and was the
                  first used oil refining unit in North India providing
                  professional, technical and QC services to its customers.
                </p>
                <div class="d-flex justify-content-between">
                  <ul>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> Certified
                      Professionals
                    </li>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> Compliant with all
                      standards
                    </li>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> Cost and GST
                      Benefit
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> Reliable for all
                      customer
                    </li>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> 45 Years of
                      Experience
                    </li>
                    <li>
                      <i class="bi bi-check-circle-fill"></i> Safety and Quality
                      of Product
                    </li>
                  </ul>
                </div>
                <br />
                <p>
                  IFP has the distinction of being the first Re-refining unit to
                  be approved by the{" "}
                  <strong> Ministry Of Petroleum (MOP)</strong> and the{" "}
                  <strong> Ministry Of Environment (MOE)</strong>. IFP has kept
                  pace with time and upgarded its technologies to face
                  competition in the market place.The technological upgradation
                  has given capabilities to IFP to produce refined base oil to
                  meeting virgin base oil specification. IFP has adopted 3 stage
                  vacuum distillation process with solvent extraction to produce
                  100% pure oils.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      {/* ***** Features Big Item End ***** */}

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <h2 className="mt-3 mb-3">Contact Us</h2>
          <div className="row gx-lg-0 gy-4">
            <div className="col-lg-4">
              <div className="info-container d-flex flex-column align-items-center justify-content-center">
                <div className="info-item d-flex">
                  <i className="bi bi-geo-alt flex-shrink-0" />
                  <div>
                    <h4>Location:</h4>
                    <p>
                      16/2C Industrial Area Site 4, Sahibabad, Ghaziabad -201010
                      (U.P.)
                    </p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="info-item d-flex">
                  <i className="bi bi-envelope flex-shrink-0" />
                  <div>
                    <h4>Email:</h4>
                    <p>info@ifp-petro.com</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="info-item d-flex">
                  <i className="bi bi-phone flex-shrink-0" />
                  <div>
                    <h4>Call:</h4>
                    <p>+01 2041 676 34</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div className="info-item d-flex">
                  <i className="bi bi-clock flex-shrink-0" />
                  <div>
                    <h4>Open Hours:</h4>
                    <p>Mon-Sat: 11AM - 23PM</p>
                  </div>
                </div>
                {/* End Info Item */}
              </div>
            </div>
            <div className="col-lg-8">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={7}
                    placeholder="Message"
                    required
                    defaultValue={""}
                  />
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      {/* ***** Footer Start ***** */}
      <footer>
        {/* <div className="container"> */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <ul className="social">
              <li>
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-rss" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p className="copyright">Copyright © 2023 IFP Petro</p>
          </div>
        </div>
        {/* </div> */}
      </footer>
    </div>
  );
}

export default Landing;
