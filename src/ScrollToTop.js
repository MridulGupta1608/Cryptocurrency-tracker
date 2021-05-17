import React from 'react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };



  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      }
      else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div className="fas fa-arrow-up" onClick={scrollToTop}>

        </div>
      )}
    </div>
  );
}
export default ScrollToTop;
