import React from "react";
import Navbar from "@/Components/Home/Navbar";
import Hero from "@/Components/Home/Hero";
import Page from "@/Components/Home/Page";
import Page2 from "@/Components/Home/Page2";
import Page3 from "@/Components/Home/Page3";
import Page4 from "@/Components/Home/Page4";
import Page5 from "@/Components/Home/Page5";
import Footer from "@/Components/Home/Footer";
import Map from "@/Components/Home/Map";
import { Head } from "@inertiajs/react";

const Albri = ({ latestNews }) => {
    return (
        <div className="relative">
          <Head title="Home" />
            <div className="relative z-20">
                <Navbar active={"home"} />
            </div>
            <div className="relative z-0">
                <Hero />
            </div>
            <Page latestNews={latestNews} />
            <Page2 />
            <Page3 />
            <Page4 />
            <Page5 />
            <Map />
            <Footer />
        </div>
    );
};

export default Albri;
