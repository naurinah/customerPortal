import styles from "./ShipmentCard.module.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Link from "next/link";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Example from "../LineChart/LineChart";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import dsty from "../../styles/dateRange.module.css";
import { useState, useRef, useEffect } from "react";
import useVisible from "../../hooks/useVisible";
import useSWR from "swr";
import FormData from "form-data";
import CurrencyFormat from "react-currency-format";


const state = {
  labels: [
    "2021-02-01",
    "2021-02-04",
    "2021-02-07",
    "2021-02-10",
    "2021-02-13",
    "2021-02-16",
    "2021-02-19",
    "2021-02-22",
  ],
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "#5DA5DA",
      borderWidth: 2,
      data: [58, 28, 16, 13, 83, 52, 39, 18],
    },
  ],
};

const ShipmentCard = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [elements, setElements] = useState([]);
  const [cod, setCod] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [charges, setCharges] = useState(0);
  const [settle, setSettle] = useState(0);

const url = `http://benefit.blue-ex.com/api/customerportal/shipmentgraph.php?acno=KHI-06366&hashkey=KaPdSgVkYp3s6v9y`;
  var formdata = new FormData();
  formdata.append(
    "request",
    '{"acno": "KHI-06366", "startdate": "2020/02/01", "enddate": "2021/02/01"}'
  );

const requestOptions = {
    method: "POST",
    body: formdata,
  };
  const getData = async () => {
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

    const { data, error } = useSWR(url, getData);


  useEffect(() => {
    let temp = [];
    if (data !== undefined) {
      setCod(data.codamount)
      setCharges(data.blueexcharges)
      setSettle(data.net)
      setShipments(data.totalshipment)
      data.detail.forEach((d) => {
        temp.push({
          name: d.y,
          pv: +d.a,
          amt: +d.a,
        });
      });
      setElements(temp);
    }
  }, [data]);

  const [dateDisplay, setDateDisplay] = useState("none");

  const handleDateDisplay = () => {
    setDateDisplay(dateDisplay === "none" ? "block" : "none");
  };

  const ref = useRef();

  useVisible(ref, () => {
    setDateDisplay("none");
  });

  return (
    <div className={styles.shipment}>
      <div className={styles.top}>
        <h2>Shipment Trend</h2>
        <div className={styles.topRight} ref={ref} onClick={handleDateDisplay}>
          <span className={styles.day}>Last 30 Days</span>
          <span className={styles.date}>Feb 2 - Mar 3</span>
          <button>
            <KeyboardArrowDownIcon />
          </button>
          <Link href="/deliveries">
            <button className={styles.view}>
              View <ChevronRightIcon />
            </button>
          </Link>
        </div>
        <div className={dsty.dataRange} style={{ display: dateDisplay }}>
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
          ;
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxBar}>
          <div className={styles.name}>Shipments</div>
          <div className={styles.value}>
              <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {value}
                    </>
                  )}
                  value={shipments}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                />
            </div>
        </div>
        <div className={styles.boxBar}>
          <div className={styles.name}>COD</div>
          <div className={styles.value}>PKR&nbsp; 
          <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {value}
                    </>
                  )}
                  value={cod}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                />
          </div>
        </div>
        <div className={styles.boxBar}>
          <div className={styles.name}>Service Charges</div>
          <div className={styles.value}>PKR&nbsp;
          <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {value}
                    </>
                  )}
                  value={charges}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                />
          </div>
        </div>
        <div className={styles.boxBar}>
          <div className={styles.name}>Amount settle</div>
          <div className={styles.value}>PKR&nbsp;
          <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {value}
                    </>
                  )}
                  value={settle}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                />
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <Example elements={elements} />
      </div>
    </div>
  );
};

export default ShipmentCard;
