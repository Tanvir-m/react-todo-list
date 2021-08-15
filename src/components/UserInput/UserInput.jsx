
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import style from "./userInput.module.scss";

const UserInput = (props) => {
  const [inpVal, setInpVal] = useState("");

  const onChageHandler = (e) => {
    const textVal = e.target.value;
    setInpVal(textVal);
  };

  const onClickHandler = () => {
    const withoutSpace = inpVal.trim();
    if (withoutSpace) {
      props.onClickAddHandler(withoutSpace);
      setInpVal("");
    }
  };

  const enterKeyHandler = (e) => {
    if (e.which === 13) {
      onClickHandler();
    }
  };

  return (
    <>
      <Row className={`mt-5`}>
        <Col md={{ span: 6, offset: 2 }} className={`my-4 `}>
          <input
            type="text"
            className={`form-control ${style.input}`}
            placeholder="Please Enter"
            value={inpVal}
            onChange={onChageHandler}
            onKeyUp={enterKeyHandler}
          />
        </Col>
        <Col md={2} className="my-4">
          <BsFillPlusCircleFill
            className={`${style.plusBtn}`}
            onClick={onClickHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserInput;
