import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="text-bg-dark d-flex flex-column p-3 p-sm-5 text-center">
        <h2 className="text-decoration-underline my-4">ABOUT</h2>
        <Row className="row-cols-1 row-cols-lg-2 ">
          <Col className="d-flex flex-column justify-content-around">
            <p>
              At artsy, we aim to provide a place where artists can showcase
              their bodies of work for free. each far beyond our own business.
            </p>
            <p>
              At artsy, we aim to provide a place where artists can showcase
              their bodies of work for free.
            </p>
            <p>
              Its home to a range of special and extraordinary pieces, from
              abstract art to realism, Pop art to expressionism.
            </p>
            <p>
              In a time of increasing computerisation, it’s our mission to keep
              human connection at the heart of commerce.
            </p>
            <p>
              That’s why we built a place where creativity lives and thrives
              because it’s powered by people.
            </p>
            <p>
              We help our community of sellers turn their ideas into successful
              businesses.
            </p>
            <p>
              Our platform connects them with buyers looking for something
              special with a human touch, for those moments in life that deserve
              imagination.
            </p>
            <p>
              As a company, we strive to lead with our guiding principles and to
              help spread ideas of sustainability and responsibility whose
              impact can reach far beyond our own business.
            </p>
          </Col>
          <Col>
            <img
              src="https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="Colourful hallway"
              className="img-fluid p-2"
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default About;
