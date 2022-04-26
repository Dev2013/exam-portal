import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Quiz from "./lib/Quiz";
import { baseURL } from "./constants";
import { ques } from "./questions ";

export const Wrapper = ({ isAuthorized }) => {
  const { id } = useParams();
  const history = useHistory();
  const [finalState, setFinalState] = useState({ data: [], loading: true });
  const [showAert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setFinalState({ data: ques, loading: false, attempt: 2 });
  }, []);
  // useEffect(() => {
  //   fetch(
  //     `${baseURL}/get-questions?moduleType=MODULE_${id}`,
  //     {
  //       // Adding method type
  //       method: "Get",

  //       // Adding body or contents to send

  //       // Adding headers to the request
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //     }
  //   )
  //     .then((r) => {
  //       if(r.status===422){
  //         setShowAlert(true)
  //       }

  //       return r.json()

  //     })
  //     .then((r) => {
  //       console.log(r)
  //       if(r){
  //       setFinalState({ data: r.questions, loading: false , attempt: r.attempt})
  //       }
  //     });
  // }, []);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    if (!isAuthorized) {
      history.push("/sign-in");
    }
  }, [history, isAuthorized]);

  const onEachQuestionChange = (value) => {
    return;
  };

  useEffect(() => {
    const getValues = (data) => {
      const {
        id,
        question,
        hasImage,
        imageUrl,
        moduleType,
        ageCategory,
        module1QuestionCategory,
        module2QuestionCategory,
        order,
        level,
        questionChoicesList,
        questionAnswer,
        typeQuestion,
        attempt,
      } = data;
      return {
        question: {
          id,
          question,
          hasImage,
          imageUrl,
          moduleType,
          ageCategory,
          module1QuestionCategory,
          order,
          level,
          questionChoicesList,
          questionAnswer,
          questionType: typeQuestion,
          attempt,
          module2QuestionCategory,
        },
        answer: quizResult?.userInput.find((val) => val?.id === id)?.ans,
        timetaken: quizResult?.time?.find((val) => val?.id === id)?.time,
      };
    };
    if (quizResult) {
      const resultantBody = JSON.stringify(
        quizResult?.questions?.map((val) => getValues(val))
      );
      fetch(`${baseURL}/submit-question-answer?moduleType=MODULE_${id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: resultantBody,
      })
        .then((data) => {
          setShowSuccessAlert(true);
          //history.push('/Dashboard')
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [quizResult]);

  const requestConvertor = () => {
    return {
      nrOfQuestions: finalState?.data?.length,
      questions: [...finalState?.data]?.map((val) => {
        return {
          ...val,
          answers: [...val?.questionChoicesList],
          correctAnswer: val?.questionAnswer,
          questionType: "text",
          typeQuestion: val?.questionType,
          point: 20,
          questionPic: val?.hasImage ? val?.imageUrl : null,
          answerSelectionType: "single",
        };
      }),
      quizSynopsis:
        " In 1971, the first ever computer virus was developed. Named Creeper, it was made as an experiment just to see how it spread between computers. The virus simply displayed the message: “I’m the creeper, catch me if you can!”",
      quizTitle: `Basic Aptitude `,
      attempt: `Attempts:  ${finalState?.attempt || 0 / 0} `,
    };
  };
  const renderSectionOne = () => {
    return (
      <Quiz
        quiz={requestConvertor()}
        shuffle={false}
        showInstantFeedback={false}
        continueTillCorrect={false}
        onComplete={setQuizResult}
        onEachQuestionChange={onEachQuestionChange}
        isShowTimer={true}
        customResultPage={() => {
          console.log("HEllo");
        }}
      />
    );
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundImage: `url(/4.jpg)`,
          backgroundColor: "#18546e",
          height: "calc(95vh - 40px)",
        }}
      >
        {showAert && (
          <div
            class="alert alert-warning alert-dismissible fade show"
            style={{ marginTop: "55px" }}
            role="alert"
          >
            <strong>Hello!</strong> Already submitted the test please check the
            videos.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                setShowAlert(false);
                history.push("/Dashboard");
              }}
            ></button>
          </div>
        )}
        {showSuccessAlert && (
          <div
            class="alert alert-success alert-dismissible fade show"
            style={{ marginTop: "55px" }}
            role="alert"
          >
            <strong>Hurrah!</strong> Questions Submitted Successfully
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                setShowSuccessAlert(false);
                history.push("/Dashboard");
              }}
            ></button>
          </div>
        )}
        <div
          style={{
            width: "100%",
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            marginTop: "55px",
          }}
        >
          {!finalState?.loading && renderSectionOne()}
        </div>
      </div>
    </>
  );
};
