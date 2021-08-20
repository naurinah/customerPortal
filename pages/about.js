import styles from "../styles/release-notes.module.css"
import Header from "../components/Header/Header";
import Head from 'next/head'
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import AboutCard from "../components/AboutCard/AboutCard";

const About = () => {
    return ( 
        <div className={styles.release}>
            <Head>
                <title>blueEX Booking App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>  
            <div className={styles.page}>
                <Sidebar />
                <div className={styles.pageRight}>
                    <main>
                        <h3 className={styles.heading}>About Us</h3>
                        <AboutCard/>
                    </main>
                    <Footer/>
                </div>
            </div> 
        </div>
     );
}
 
export default About;