import Layout from "../components/Layout";
import { Container, Row } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Container
        as="main"
        className="text-bg-dark my-2 p-3 p-sm-5 d-flex flex-column gap-4"
      >
        <h2 className="text-center text-decoration-underline">
          PRIVACY INFORMATION NOTICE
        </h2>
        <Row>
          <p>
            Artsy (“we”, “us”, “our”) are committed to protecting and respecting
            your privacy.
          </p>
        </Row>
        <Row>
          <p>
            This notice explains when and why we collect personal information
            about our customers, how we use it, the conditions under which we
            may disclose it to others, and how we keep it secure.
          </p>
        </Row>
        <Row className="mx-1 mx-sm-4">
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
              Marketing and communication preferences, such as whether you would
              like to receive marketing materials from us
            </li>
          </ul>
        </Row>

        <Row>
          <p>
            We will only collect personal information from you if it is
            necessary for us to do so, and we will only collect the minimum
            amount of personal information required to provide you with our
            services.
          </p>
        </Row>
        <Row className="mx-1 mx-sm-4">
          <p>We use your personal information in the following ways:</p>
          <ul>
            <li>
              To provide you with the listing information you have interacted
              with
            </li>
            <li>To communicate with you about your account or our services</li>
            <li>To comply with legal or regulatory requirements</li>
          </ul>
        </Row>

        <Row className="mx-1 mx-sm-4">
          <p>
            We will only share your personal information with third parties:
          </p>
          <ul>
            <li>If we are required to do so by law</li>
            <li>In order to provide you with our and third party services</li>
          </ul>
        </Row>

        <Row className="mx-1 mx-sm-4">
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
        </Row>
        <Row>
          <p>
            We will retain your personal information for as long as is necessary
            to provide you with our services or as required by law.
          </p>
        </Row>
        <Row>
          <p>
            If you have any questions or concerns about our use of your personal
            information, please contact us using the details provided on our
            website. Thank you. Artsy
          </p>
        </Row>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
