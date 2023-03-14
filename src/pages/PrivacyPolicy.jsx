import React from "react";
import Layout from "../components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container-fluid text-bg-dark p-0">
        <main className="container p-4 d-flex flex-column align-content-center">
          <h2 className="text-center text-decoration-underline">
            PRIVACY INFORMATION NOTICE
          </h2>
          <section className="py-4 ">
            <p>
              Artsy (“we”, “us”, “our”) are committed to protecting and
              respecting your privacy.
            </p>
            <p>
              This notice explains when and why we collect personal information
              about our customers, how we use it, the conditions under which we
              may disclose it to others, and how we keep it secure.
            </p>
            <p>
              We may collect, use and store the following types of personal
              information:
            </p>
            <ul>
              <li>
                Contact information, such as name, email address and telephone
                number
              </li>
              <li>
                Marketing and communication preferences, such as whether you
                would like to receive marketing materials from us
              </li>
            </ul>
          </section>

          <section className="py-4">
            <p>
              We will only collect personal information from you if it is
              necessary for us to do so, and we will only collect the minimum
              amount of personal information required to provide you with our
              services.
            </p>
            <p>We use your personal information in the following ways:</p>
            <ul>
              <li>
                To provide you with the listing information you have interacted
                with
              </li>
              <li>
                To communicate with you about your account or our services
              </li>
              <li>To comply with legal or regulatory requirements</li>
            </ul>
          </section>

          <section className="py-4">
            <p>
              We will only share your personal information with third parties:
            </p>
            <ul>
              <li>If we are required to do so by law</li>
              <li>In order to provide you with our and third party services</li>
            </ul>
          </section>

          <section className="py-4">
            <p>We will keep your personal information secure by:</p>
            <ul>
              <li>
                Only allowing authorized personnel to access your personal
                information
              </li>
              <li>Using secure servers to store your personal information</li>
              <li>
                Regularly monitoring our systems to detect and prevent
                unauthorized access to your personal information
              </li>
            </ul>
            <p>
              We will retain your personal information for as long as is
              necessary to provide you with our services or as required by law.
            </p>
            <p>
              If you have any questions or concerns about our use of your
              personal information, please contact us using the details provided
              on our website. Thank you. Artsy
            </p>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
