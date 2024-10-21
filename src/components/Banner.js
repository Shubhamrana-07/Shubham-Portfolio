// Import necessary hooks and components from React and React-Bootstrap
import { useState, useEffect } from "react"; // useState and useEffect are React hooks
import { Container, Row, Col } from "react-bootstrap"; // These are layout components from React-Bootstrap
import headerImg from "../assets/img/header-img.svg"; // Import an image for the banner
import { ArrowRightCircle } from 'react-bootstrap-icons'; // Import an icon from React-Bootstrap-Icons
import TrackVisibility from 'react-on-screen'; // TrackVisibility helps trigger animations when elements are visible on screen

// Define a functional component called Banner
export const Banner = () => {
  // Create state variables for handling the text animation
  const [loopNum, setLoopNum] = useState(0); // Tracks how many times the text has looped
  const [isDeleting, setIsDeleting] = useState(false); // Determines if we are deleting characters from the text
  const [text, setText] = useState(''); // Stores the text that is displayed
  const [delta, setDelta] = useState(300 - Math.random() * 100); // Controls typing speed, with a random variance
  const [index, setIndex] = useState(1); // Tracks the position of the text being typed
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"]; // Array of strings to be displayed one after another
  const period = 2000; // Time interval between typing and deleting phases

  // useEffect hook to manage the typing effect, triggered on every text change
  useEffect(() => {
    let ticker = setInterval(() => {
      tick(); // Call the tick function (defined below) at every interval
    }, delta); // The speed of the interval is controlled by delta

    return () => { clearInterval(ticker) }; // Cleanup: clear the interval when the component unmounts or text changes
  }, [text]); // Dependency array: This effect runs every time the 'text' variable changes

  // Function that handles typing and deleting text characters
  const tick = () => {
    let i = loopNum % toRotate.length; // Get the current string to display by using the loop number
    let fullText = toRotate[i]; // Select the full text from the toRotate array
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) // If deleting, remove one character from the text
      : fullText.substring(0, text.length + 1); // If typing, add one character to the text

    setText(updatedText); // Update the text to be displayed

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2); // Speed up deleting phase
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true); // If full text is typed, start deleting
      setIndex(prevIndex => prevIndex - 1); // Adjust index accordingly
      setDelta(period); // Set the delay for starting the delete phase
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false); // If text is fully deleted, start typing the next word
      setLoopNum(loopNum + 1); // Move to the next word in the array
      setIndex(1); // Reset index
      setDelta(500); // Reset typing speed
    } else {
      setIndex(prevIndex => prevIndex + 1); // Move to the next character
    }
  }

  // JSX code to render the banner section
  return (
    <section className="banner" id="home"> 
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}> 
            {/* TrackVisibility helps trigger animations when the element is visible */}
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}> 
                  {/* Display the tagline and animated text */}
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>{`Hi! I'm Shubham Rana `} 
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'>
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                  {/* Button with an arrow icon */}
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
                </div>
              }
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}> 
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}> 
                  {/* Display the header image */}
                  <img src={headerImg} alt="Header Img"/>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
