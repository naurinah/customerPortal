import styles from "./SettlementCard.module.css"
import { useStateValue } from "../../context/StateProvider";
import useSWR from 'swr'
import { parseCookies } from "../../helpers/"
import { useCookies } from "react-cookie"

const dateChanger = (date) => {
    let d = date.split("-");
    var month = [ "0", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    return `${d[0]}-${month[+d[1]]}`
}

const SettlementCard = (props) => {
    const [{acno, statement}, dispatch] = useStateValue();
    const [cookie, setCookie] = useCookies(["user"])
    let cookObject = Object.values(cookie)[0]
    const a = cookObject
    const ac = "KHI-06366"
    
    const url =  `http://benefitx.blue-ex.com/api/customerportal/statement.php?acno=${ac}&hashkey=KaPdSgVkYp3s6v9y`;
    const getData = async () => {
        const response = await fetch(url);
        return await response.json();
    };
    const { data, error } = useSWR(url, getData)

    

    return ( 
        <div className={styles.settlement}>
            {data && 
            <>
                <div className={styles.top}>
                <h2>Settlement History</h2>
                
            </div>
            <div className={styles.shipment}>
                    <div className={styles.container}>
                        <h4>Last Statement for the period</h4>
                        <p>of {dateChanger(data[0].SDATE)} to {dateChanger(data[0].EDATE)}</p>
                        <div className={styles.no}>Rs. {data[0].CODAMOUNT}
                        
                        </div>
                    </div>
            </div>
            <div className={styles.settleData}>
                <div className={styles.data}>
                            { 
                            data.map((d) => <div className={styles.sdata} key={d.FPS_CODE}>
                                    <div className={styles.date}>{dateChanger(d.SDATE)} to {dateChanger(d.EDATE)}</div>
                                    <div className={styles.circle}>
                                        <img src="/rec.svg" alt=""/>
                                    </div>
                                    <div className={styles.amount}>RS. {d.CODAMOUNT}</div>
                                </div>
                                )
                                
                            }
                        </div>
            </div>
            </>
            }
            
          
        </div>
     );
}

export async function getServerSideProps(context) {
    const [cookie, setCookie] = useCookies(["user"])
    let cookObject = Object.values(cookie)[0]
    return {
      props: {
        acno: cookObject.acno
      }
    }
  }
 
export default SettlementCard;