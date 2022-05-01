import React, { useState, useEffect, useCallback, Fragment } from "react";
import QuizResultFilter from "./core-components/QuizResultFilter";
import { checkAnswer, rawMarkup } from "./core-components/helpers";
import Explanation from "./core-components/Explanation";
import Alert from "react-bootstrap/Alert";
import { Timer } from "./core-components/timer";

const Core = function ({
  questions,
  appLocale,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  onEachQuestionChange,
  isShowTimer,
  tabSwitched,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [filteredValue, setFilteredValue] = useState("all");
  const [userAttempt, setUserAttempt] = useState(1);
  const [showDefaultResultState, setShowDefaultResult] = useState(true);
  const [answerSelectionTypeState, setAnswerSelectionType] =
    useState(undefined);

  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [question, setQuestion] = useState(questions[currentQuestionIndex]);
  const [questionSummary, setQuestionSummary] = useState(undefined);
  const [time, setTime] = useState([]);
  const [nextClicked, setISNextClicked] = useState(0);

  useEffect(() => {
    if (tabSwitched >= 2) {
      setEndQuiz(true);
      onComplete(questionSummary);
    }
  }, [tabSwitched]);

  console.log(tabSwitched);

  useEffect(() => {
    setShowDefaultResult(
      showDefaultResult !== undefined ? showDefaultResult : true
    );
  }, [showDefaultResult]);

  useEffect(() => {
    setQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const { answerSelectionType = "single" } = question;
    // Default single to avoid code breaking due to automatic version upgrade
    setAnswerSelectionType(answerSelectionType || "single");
  }, [question, currentQuestionIndex]);

  useEffect(() => {
    if (endQuiz) {
      let totalPointsTemp = 0;
      let correctPointsTemp = 0;
      for (let i = 0; i < questions.length; i += 1) {
        let point = questions[i].point || 0;
        if (typeof point === "string" || point instanceof String) {
          point = parseInt(point);
        }

        totalPointsTemp += point;

        if (correct.includes(i)) {
          correctPointsTemp += point;
        }
      }
      setTotalPoints(totalPointsTemp);
      setCorrectPoints(correctPointsTemp);
    }
  }, [endQuiz]);

  useEffect(() => {
    setQuestionSummary({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
      time,
    });
  }, [
    totalPoints,
    correctPoints,
    questions,
    correct.length,
    incorrect.length,
    userInput,
    time,
  ]);

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary);
    }
  }, [endQuiz, questionSummary]);

  const nextQuestion = (currentQuestionIndex) => {
    setISNextClicked((prev) => prev + 1);
    // setQuestionSummary({);
    onEachQuestionChange({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
      time,
    });
    setIncorrectAnswer(false);
    setCorrectAnswer(false);
    setShowNextQuestionButton(false);
    setButtons({});

    if (currentQuestionIndex + 1 === questions.length) {
      setEndQuiz(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleChange = (event) => {
    setFilteredValue(event.target.value);
  };

  const renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    let answerBtnCorrectClassName;
    let answerBtnIncorrectClassName;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || "single";

    return answers.map((answer, index) => {
      if (answerSelectionType === "single") {
        // correctAnswer - is string
        answerBtnCorrectClassName =
          `${JSON.stringify(answer[index + 1])}` ===
          JSON.stringify(correctAnswer)
            ? "correct"
            : "correct";
        answerBtnIncorrectClassName =
          `${JSON.stringify(answer[userInputIndex])}` !==
            JSON.stringify(correctAnswer) &&
          `${JSON.stringify(answer[index + 1])}` ===
            `${JSON.stringify(answer[userInputIndex])}`
            ? "correct"
            : "correct";
      } else {
        // correctAnswer - is array of numbers
        answerBtnCorrectClassName = correctAnswer.includes(index + 1)
          ? "correct"
          : "";
        answerBtnIncorrectClassName =
          !correctAnswer.includes(index + 1) &&
          userInputIndex.includes(index + 1)
            ? "correct"
            : "correct";
      }

      return (
        <div key={index}>
          <button
            disabled
            className={`answerBtn btn ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            {questionType === "text" && <span>{answer?.choice}</span>}
            {questionType === "photo" && <img src={answer} alt="image" />}
          </button>
        </div>
      );
    });
  };

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions;
    let filteredUserInput;

    if (filteredValue !== "all") {
      if (filteredValue === "correct") {
        filteredQuestions = questions.filter(
          (question, index) => correct.indexOf(index) !== -1
        );
        filteredUserInput = userInput.filter(
          (input, index) => correct.indexOf(index) !== -1
        );
      } else {
        filteredQuestions = questions.filter(
          (question, index) => incorrect.indexOf(index) !== -1
        );
        filteredUserInput = userInput.filter(
          (input, index) => incorrect.indexOf(index) !== -1
        );
      }
    }

    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput
        ? filteredUserInput[index]
        : userInput[index];

      // Default single to avoid code breaking due to automatic version upgrade
      const answerSelectionType = question.answerSelectionType || "single";

      return (
        <div className="result-answer-wrapper" key={index + 1}>
          <h3
            dangerouslySetInnerHTML={rawMarkup(
              `Q${question.questionIndex}: ${question.question}`
            )}
          />
          {question.questionPic && (
            <img src={question.questionPic} alt="questionPic" />
          )}
          {renderTags(
            answerSelectionType,
            question.correctAnswer.length || 1,
            question.segment
          )}
          <div className="result-answer">
            {renderAnswerInResult(question, userInputIndex)}
          </div>
          <Explanation question={question} isResultPage />
        </div>
      );
    });
  }, [endQuiz, filteredValue]);

  const renderAnswers = (question, buttons) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    const onClickAnswer = (index) =>
      checkAnswer(index, correctAnswer, answerSelectionType, {
        userInput,
        questionId: question?.id,
        userAttempt,
        currentQuestionIndex,
        continueTillCorrect,
        showNextQuestionButton,
        incorrect,
        correct,
        setButtons,
        setCorrectAnswer,
        setIncorrectAnswer,
        setCorrect,
        setIncorrect,
        setShowNextQuestionButton,
        setUserInput,
        setUserAttempt,
      });

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || "single";

    return (
      <div style={{ width: "60%" }}>
        {answers.map((answer, index) => (
          <Fragment key={index}>
            {buttons[index] !== undefined ? (
              <button
                disabled={false}
                className={`${buttons[index].className} answerBtn btn`}
                onClick={() => onClickAnswer(answer?.choice)}
              >
                {questionType === "text" && <span>{answer?.choice}</span>}
                {questionType === "photo" && (
                  <img src={answer?.choice} alt="image" />
                )}
              </button>
            ) : (
              <button
                onClick={() => onClickAnswer(answer?.choice)}
                className="answerBtn btn"
              >
                {questionType === "text" && answer?.choice}
                {questionType === "photo" && (
                  <img src={answer?.choice} alt="image" />
                )}
              </button>
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  const renderTags = (answerSelectionType, numberOfSelection, segment) => {
    const {
      singleSelectionTagText,
      multipleSelectionTagText,
      pickNumberOfSelection,
    } = appLocale;

    return (
      <div className="tag-container">
        {answerSelectionType === "single" && (
          <span className="single selection-tag">{singleSelectionTagText}</span>
        )}
        {answerSelectionType === "multiple" && (
          <span className="multiple selection-tag">
            {multipleSelectionTagText}
          </span>
        )}
        <span className="number-of-selection">
          {pickNumberOfSelection.replace(
            "<numberOfSelection>",
            numberOfSelection
          )}
        </span>
        {segment && <span className="selection-tag segment">{segment}</span>}
      </div>
    );
  };

  const renderResult = () => (
    <div className="card-body">
      <h2>
        {appLocale.resultPageHeaderText
          .replace("<correctIndexLength>", correct.length)
          .replace("<questionLength>", questions.length)}
      </h2>
      <h2>
        {appLocale.resultPagePoint
          .replace("<correctPoints>", correctPoints)
          .replace("<totalPoints>", totalPoints)}
      </h2>
      <br />
      <QuizResultFilter
        filteredValue={filteredValue}
        handleChange={handleChange}
        appLocale={appLocale}
      />
      {renderQuizResultQuestions()}
    </div>
  );

  return (
    <div className="questionWrapper" style={{ width: "100%", padding: "20px" }}>
      {!endQuiz && (
        <div className="questionWrapperBody">
          {tabSwitched >= 1 && (
            <Alert variant={"danger"}>
              {`${tabSwitched} / 1
            !!After 2 tab switch your Test will automatically submit`}
            </Alert>
          )}
          <div className="questionModal">
            {/* <InstantFeedback
              question={question}
              showInstantFeedback={showInstantFeedback}
              correctAnswer={correctAnswer}
              incorrectAnswer={incorrectAnswer}
            /> */}
          </div>
          <div>
            {appLocale.question} {currentQuestionIndex + 1}:
          </div>
          <Timer
            isShowTimer={isShowTimer}
            setEndQuiz={setEndQuiz}
            onComplete={onComplete}
            questionSummary={questionSummary}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                width: "40%",
                alignSelf: "flex-start",
                textAlign: "left",
                wordBreak: "break-all",
                paddingRight : "10px",
              }}
              dangerouslySetInnerHTML={rawMarkup(question && question.question)}
            />

            {question && question.questionPic && (
              <img
                src={question.questionPic}
                alt="image"
                width="500px"
                height="500px"
              />
            )}
            {/* {question && renderTags(answerSelectionTypeState, question.correctAnswer.length, question.segment)} */}
            {question && renderAnswers(question, buttons)}
            {showNextQuestionButton && (
              <div>
                <button
                  onClick={() => {
                    nextQuestion(currentQuestionIndex);
                    const updatedTime = {
                      id: question?.id,
                      time: 0,
                    };
                    const arr = [...time, updatedTime];
                    setTime(arr);
                    // reset();
                  }}
                  className="nextQuestionBtn btn"
                >
                  {appLocale.nextQuestionBtn}
                </button>
              </div>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -60,
              right: 0,
              padding: "1px",
            }}
          >
           <svg width="300" height="183" viewBox="0 0 942 183" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.56 165.255C23.9833 165.255 25.2083 165.022 26.235 164.555C27.2617 164.065 28.335 163.295 29.455 162.245L32.115 164.975C29.525 167.845 26.375 169.28 22.665 169.28C18.9783 169.28 15.91 168.09 13.46 165.71C11.0333 163.33 9.82 160.32 9.82 156.68C9.82 153.04 11.0567 150.007 13.53 147.58C16.0267 145.153 19.165 143.94 22.945 143.94C26.7483 143.94 29.9217 145.34 32.465 148.14L29.84 151.01C28.6733 149.89 27.565 149.108 26.515 148.665C25.4883 148.222 24.275 148 22.875 148C20.4017 148 18.325 148.805 16.645 150.415C14.965 152.002 14.125 154.043 14.125 156.54C14.125 159.013 14.9533 161.09 16.61 162.77C18.29 164.427 20.2733 165.255 22.56 165.255ZM62.0515 144.535V148.42H48.9965V154.895H60.7215V158.57H48.9965V165.115H62.4715V169H44.8665V144.535H62.0515ZM93.8069 144.535H97.9369V169H93.4569L79.5969 151.15V169H75.4669V144.535H79.5969L93.8069 162.805V144.535ZM121.665 148.315V169H117.535V148.315H110.115V144.535H129.085V148.315H121.665ZM160.778 152.48C160.778 156.517 159.016 159.06 155.493 160.11L161.898 169H156.648L150.803 160.775H145.378V169H141.248V144.535H150.348C154.081 144.535 156.753 145.165 158.363 146.425C159.973 147.685 160.778 149.703 160.778 152.48ZM150.523 157.03C152.856 157.03 154.443 156.668 155.283 155.945C156.123 155.222 156.543 154.067 156.543 152.48C156.543 150.87 156.111 149.773 155.248 149.19C154.384 148.583 152.844 148.28 150.628 148.28H145.378V157.03H150.523ZM191.597 144.535V148.42H178.542V154.895H190.267V158.57H178.542V165.115H192.017V169H174.412V144.535H191.597ZM238.892 150.31C237.235 148.583 235.194 147.72 232.767 147.72C230.34 147.72 228.287 148.583 226.607 150.31C224.95 152.037 224.122 154.137 224.122 156.61C224.122 159.06 224.95 161.148 226.607 162.875C228.287 164.602 230.34 165.465 232.767 165.465C235.194 165.465 237.235 164.602 238.892 162.875C240.572 161.148 241.412 159.06 241.412 156.61C241.412 154.137 240.572 152.037 238.892 150.31ZM241.937 165.64C239.464 168.043 236.407 169.245 232.767 169.245C229.127 169.245 226.07 168.043 223.597 165.64C221.124 163.213 219.887 160.203 219.887 156.61C219.887 152.993 221.124 149.983 223.597 147.58C226.07 145.153 229.127 143.94 232.767 143.94C236.407 143.94 239.464 145.153 241.937 147.58C244.41 149.983 245.647 152.993 245.647 156.61C245.647 160.203 244.41 163.213 241.937 165.64ZM262.687 148.385V155.105H273.537V158.92H262.687V169H258.557V144.535H274.867L274.832 148.385H262.687ZM321.015 144.535V148.42H307.96V154.895H319.685V158.57H307.96V165.115H321.435V169H303.83V144.535H321.015ZM348.92 169L342.9 159.795H342.725L336.705 169H331.56L339.96 156.435L332.155 144.535H337.265L342.725 152.795H342.9L348.36 144.535H353.47L345.665 156.435L354.065 169H348.92ZM376.845 165.255C378.268 165.255 379.493 165.022 380.52 164.555C381.546 164.065 382.62 163.295 383.74 162.245L386.4 164.975C383.81 167.845 380.66 169.28 376.95 169.28C373.263 169.28 370.195 168.09 367.745 165.71C365.318 163.33 364.105 160.32 364.105 156.68C364.105 153.04 365.341 150.007 367.815 147.58C370.311 145.153 373.45 143.94 377.23 143.94C381.033 143.94 384.206 145.34 386.75 148.14L384.125 151.01C382.958 149.89 381.85 149.108 380.8 148.665C379.773 148.222 378.56 148 377.16 148C374.686 148 372.61 148.805 370.93 150.415C369.25 152.002 368.41 154.043 368.41 156.54C368.41 159.013 369.238 161.09 370.895 162.77C372.575 164.427 374.558 165.255 376.845 165.255ZM416.336 144.535V148.42H403.281V154.895H415.006V158.57H403.281V165.115H416.756V169H399.151V144.535H416.336ZM429.752 169V144.535H433.882V165.08H445.047V169H429.752ZM457.276 169V144.535H461.406V165.08H472.571V169H457.276ZM501.985 144.535V148.42H488.93V154.895H500.655V158.57H488.93V165.115H502.405V169H484.8V144.535H501.985ZM533.74 144.535H537.87V169H533.39L519.53 151.15V169H515.4V144.535H519.53L533.74 162.805V144.535ZM563.523 165.255C564.947 165.255 566.172 165.022 567.198 164.555C568.225 164.065 569.298 163.295 570.418 162.245L573.078 164.975C570.488 167.845 567.338 169.28 563.628 169.28C559.942 169.28 556.873 168.09 554.423 165.71C551.997 163.33 550.783 160.32 550.783 156.68C550.783 153.04 552.02 150.007 554.493 147.58C556.99 145.153 560.128 143.94 563.908 143.94C567.712 143.94 570.885 145.34 573.428 148.14L570.803 151.01C569.637 149.89 568.528 149.108 567.478 148.665C566.452 148.222 565.238 148 563.838 148C561.365 148 559.288 148.805 557.608 150.415C555.928 152.002 555.088 154.043 555.088 156.54C555.088 159.013 555.917 161.09 557.573 162.77C559.253 164.427 561.237 165.255 563.523 165.255ZM603.015 144.535V148.42H589.96V154.895H601.685V158.57H589.96V165.115H603.435V169H585.83V144.535H603.015Z" fill="#000032"/>
<path d="M71.64 72.32C76.44 73.84 80.2 76.4 82.92 80C85.64 83.52 87 87.88 87 93.08C87 100.44 84.12 106.12 78.36 110.12C72.68 114.04 64.36 116 53.4 116H9.96V32H51C61.24 32 69.08 33.96 74.52 37.88C80.04 41.8 82.8 47.12 82.8 53.84C82.8 57.92 81.8 61.56 79.8 64.76C77.88 67.96 75.16 70.48 71.64 72.32ZM29.28 46.64V66.44H48.6C53.4 66.44 57.04 65.6 59.52 63.92C62 62.24 63.24 59.76 63.24 56.48C63.24 53.2 62 50.76 59.52 49.16C57.04 47.48 53.4 46.64 48.6 46.64H29.28ZM51.96 101.36C57.08 101.36 60.92 100.52 63.48 98.84C66.12 97.16 67.44 94.56 67.44 91.04C67.44 84.08 62.28 80.6 51.96 80.6H29.28V101.36H51.96ZM101.718 32H121.158V116H101.718V32ZM197.853 72.68H215.613V106.76C211.053 110.2 205.773 112.84 199.773 114.68C193.773 116.52 187.733 117.44 181.653 117.44C172.933 117.44 165.093 115.6 158.133 111.92C151.173 108.16 145.693 103 141.693 96.44C137.773 89.8 135.813 82.32 135.813 74C135.813 65.68 137.773 58.24 141.693 51.68C145.693 45.04 151.213 39.88 158.253 36.2C165.293 32.44 173.213 30.56 182.013 30.56C189.373 30.56 196.053 31.8 202.053 34.28C208.053 36.76 213.093 40.36 217.173 45.08L204.693 56.6C198.693 50.28 191.453 47.12 182.973 47.12C177.613 47.12 172.853 48.24 168.693 50.48C164.533 52.72 161.293 55.88 158.973 59.96C156.653 64.04 155.493 68.72 155.493 74C155.493 79.2 156.653 83.84 158.973 87.92C161.293 92 164.493 95.2 168.573 97.52C172.733 99.76 177.453 100.88 182.733 100.88C188.333 100.88 193.373 99.68 197.853 97.28V72.68ZM267.655 32H305.815C314.935 32 322.975 33.76 329.935 37.28C336.975 40.72 342.415 45.6 346.255 51.92C350.175 58.24 352.135 65.6 352.135 74C352.135 82.4 350.175 89.76 346.255 96.08C342.415 102.4 336.975 107.32 329.935 110.84C322.975 114.28 314.935 116 305.815 116H267.655V32ZM304.855 100.04C313.255 100.04 319.935 97.72 324.895 93.08C329.935 88.36 332.455 82 332.455 74C332.455 66 329.935 59.68 324.895 55.04C319.935 50.32 313.255 47.96 304.855 47.96H287.095V100.04H304.855ZM420.944 98H381.944L374.504 116H354.584L392.024 32H411.224L448.784 116H428.384L420.944 98ZM414.824 83.24L401.504 51.08L388.184 83.24H414.824ZM470.68 47.84H443.8V32H517V47.84H490.12V116H470.68V47.84ZM578.561 98H539.561L532.121 116H512.201L549.641 32H568.841L606.401 116H586.001L578.561 98ZM572.441 83.24L559.121 51.08L545.801 83.24H572.441Z" fill="#53A7F0"/>
</svg>

          </div>
        </div>
      )}
      {endQuiz &&
        showDefaultResultState &&
        customResultPage === undefined &&
        renderResult()}
      {endQuiz &&
        !showDefaultResultState &&
        customResultPage !== undefined &&
        customResultPage(questionSummary)}
    </div>
  );
};

export default Core;
