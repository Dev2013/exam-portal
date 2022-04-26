import React, { useEffect, useState } from "react";
// import { Doughnut, Bar } from "../node_modules/react-chartjs-2";
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
// import ModalFooter from 'react-bootstrap/ModalFooter'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { baseURL } from "./constants";
import { useHistory ,Redirect } from 'react-router-dom';

export const Analysis = ({isAuthorized}) => {
  const [finalState, setFinalState] = useState({ data: {}, loading: true });
  const [show, setShow] = useState(false);
  const history = useHistory()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`${baseURL}/get-analytics-data`, {
      // Adding method type
      method: "Get",

      // Adding body or contents to send

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((r) => {
        if (r.status === 422) {
          //   setShowAlert(true)
        }

        return r.json();
      })
      .then((r) => {
        console.log(r);
        if (r) {
          setFinalState({ data: r, loading: false, attempt: r.attempt });
        }
      });
  }, []);
  const [showModal,setShowModal] = useState(false)
  const {
    module1categoryWiseAnalysis = {},
    module1totalQuestionAnalysis = {},
    module2Attempt1CategoryWiseAnalysis = {},
    module2Attempt1TotalQuestionAnalysis = {},
    module2Attempt2CategoryWiseAnalysis = {},
    module2Attempt2TotalQuestionAnalysis = {},
  } = finalState.data;
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const CreateBarData = (value = {}) => {
    console.log(value);
    return {
      labels: Object.keys(value),
      datasets: [
        {
          label: "correct",
          data: Object.values(value)?.map((val) =>
            Object.keys(val)
              ?.map((val1) => {
                if (val1 === "correct") {
                  return val[val1];
                }
              })
              .filter((val) => !!val)
          ),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "incorrect",
          data: Object.values(value)?.map((val) =>
            Object.keys(val)
              ?.map((val1) => {
                if (val1 === "inCorrect") {
                  return val[val1];
                }
              })
              .filter((val) => val)
          ),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };
  const createDataset1 = (value = {}) => {
    return {
      labels: Object.keys(value),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(value),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  console.log(CreateBarData(module1categoryWiseAnalysis));
  return (<></>
//       <>
//        {!isAuthorized? <Redirect to="/sign-in" />:
//     !finalState.loading && (
//         <>
//          {/* <div style={{width:"100%",backgroundImage:`url(/4.jpg)`,backgroundColor:"white",height:"calc(100% - 50px)"}}> */}
//       <div
//         style={{
//           backgroundColor: "white",
//           marginTop: "80px",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-around",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//           <div style={{width: "100%",display: "flex",justifyContent: "flex-end",padding:"15px"}}><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleShow}>Help?</button></div>
//        <div style={{width:"90%", height:"auto",display:"flex", alignItems:"center"}}> <div style={{width: "50%"}}><Doughnut data={createDataset1(module1totalQuestionAnalysis)} options={options} /></div>
//         <div style={{width: "50%",height:"90%"}}><Bar
//           options={options}
//           data={CreateBarData(module1categoryWiseAnalysis)}
//         /></div>
//         </div>
//         <div style={{width:"90%", height:"auto",display:"flex", alignItems:"center"}}><div style={{width: "50%", height:"90%" }}><Bar
//           options={options}
//           data={CreateBarData(module2Attempt1CategoryWiseAnalysis)}
//         /></div>
//        <div style={{width: "50%", height:"90%"}}><Doughnut data={createDataset1(module2Attempt1TotalQuestionAnalysis)} /></div>
//        </div>
//        <div style={{width:"90%", height:"auto",display:"flex", alignItems:"center"}}>
//          <div style={{width: "50%", height:"90%"}}><Doughnut data={createDataset1(module2Attempt2TotalQuestionAnalysis)} /></div>
//        <div style={{width: "50%", height:"90%"}}><Bar
//           options={options}
//           data={CreateBarData(module2Attempt2CategoryWiseAnalysis)}
//         /></div>
//         </div>
//       </div>
//       {/* </div> */}
    
//    <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       </>
//     )
// }
//     </>
    
  );
};
