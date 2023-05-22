import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="text-bg-dark d-flex flex-column p-3 p-sm-5 align-items-center">
        <h2 className="text-decoration-underline mb-5 text-center">
          PRIVACY INFORMATION NOTICE
        </h2>
        <Row className="row-cols-1 gap-4 text-center px-1 px-sm-5">
          <Col as="p">
            Artsy (“we”, “us”, “our”) are committed to protecting and respecting
            your privacy.
          </Col>
          <Col as="p">
            This notice explains when and why we collect personal information
            about our customers, how we use it, the conditions under which we
            may disclose it to others, and how we keep it secure.
          </Col>
          <Col className="text-start ">
            <p>
              We may collect, use and store the following types of personal
              information:
            </p>
            <ul className="ms-3 ms-sm-5">
              <li>
                Contact information, such as name, email address and telephone
                number
              </li>
              <li>
                Marketing and communication preferences, such as whether you
                would like to receive marketing materials from us
              </li>
            </ul>
          </Col>
          <Col as="p">
            We will only collect personal information from you if it is
            necessary for us to do so, and we will only collect the minimum
            amount of personal information required to provide you with our
            services.
          </Col>
          <Col className="text-start ">
            <p>We use your personal information in the following ways:</p>
            <ul className="ms-3 ms-sm-5">
              <li>
                To provide you with the listing information you have interacted
                with
              </li>
              <li>
                To communicate with you about your account or our services
              </li>
              <li>To comply with legal or regulatory requirements</li>
            </ul>
          </Col>
          <Col className="text-start ">
            <p>
              We will only share your personal information with third parties:
            </p>
            <ul className="ms-3 ms-sm-5">
              <li>If we are required to do so by law</li>
              <li>In order to provide you with our and third party services</li>
            </ul>
          </Col>
          <Col className="text-start ">
            <p>We will keep your personal information secure by:</p>
            <ul className=" ms-3 ms-sm-5">
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
          </Col>
          <Col>
            <p>
              We will retain your personal information for as long as is
              necessary to provide you with our services or as required by law.
            </p>
          </Col>
          <Col as="p">
            If you have any questions or concerns about our use of your personal
            information, please contact us using the details provided on our
            website. Thank you. Artsy
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
