import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ProducerCard from "@/pages/userprofile/ProducerCard";
import ConsumerCard from "@/pages/userprofile/ConsumerCard";
import Navbar from "./Navbar";

const Parallax = () => {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    setOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.video}>
        <source src="/video/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar/>
      <h2 className="text text-center lazy" data-src="https://f8g8b9p5.rocketcdn.me/themes/agro/wp-content/uploads/2019/02/special_offer_text_bg.jpg" data-was-processed="true">Special products for most people</h2>
      <div className={styles.content}>
        <div className="flex wrap justify-center">
            <ProducerCard />
            <ConsumerCard />
        </div>
      </div>
    </div>
  );
};

export default Parallax;
