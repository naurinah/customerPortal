import styles from "../styles/pickup-locations.module.css"
import Header from "../components/Header/Header";
import Head from 'next/head'
import Link from 'next/link'
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import PickupListCard from "../components/PickupListCard/PickupListCard";

const Pickup = () => {
    return ( 
        <div className={styles.pickupLocation}>
            <Head>
                <title>blueEX Booking App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>  
            <div className={styles.page}>
                <Sidebar />
                <div className={styles.pageRight}>
                    <main>
                        <div className={styles.head}>
                            <h3 className={styles.heading}>Pickups</h3>
                            <Link href="/create-pickup"><button>Create Pickup</button></Link>
                        </div>
                        <PickupListCard/>
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
     );
}
 
export default Pickup;