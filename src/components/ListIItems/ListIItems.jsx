import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineArrowDown, AiOutlineUserAdd } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import style from "./listItems.module.scss";

const ListIItems = (props) => {
  const { todoList } = props;
  const lastIndex = todoList.length - 1;

  const [search, setSearch] = useState('');

  const searchOnChangeHandler = (e)=>{
    setSearch(e.target.value);
    // console.log(e.target.value);
  }

  const list = todoList.filter(val=>{
    if(search === ""){
      return val;
    }else if(val.listItem.toLowerCase().includes(search.toLowerCase())){
      return val;
    }
  }).map((list, index) => (
    <Row
      key={index}
      className={`mt-3 ${list.isDone ? style.isDone : style.mainRow}`}
    >
      <Col md={9}>
        <Row>
          <Col md={1}>
            <AiOutlineUserAdd className={` ${style.user}`} />
          </Col>
          <Col md={11}>
            {list.editToggle && <h3 className="text-left">{list.listItem}</h3>}

            {!list.editToggle && (
              <input 
                type="text" 
                className={style.editInput}
                defaultValue={list.listItem}
                onChange={(e)=>{
                  list.listItem = e.target.value;
                }} />
            )}
          </Col>
        </Row>
      </Col>
      
      <Col md={3}>
        <Row>
          <Col>
            {list.editToggle && (
              <FaRegEdit
                className={`${style.icon} ${style.done}`}
                onClick={() => props.editClickHandler(index)}
              />
            )}

            {!list.editToggle && (
              <Button
                onClick={()=>props.saveClickHandler(index)}
              >
                Save
              </Button>
            )}
          </Col>

          {index !== 0 && (
            <Col>
              {" "}
              <BiUpArrowAlt
                className={`${style.icon} ${style.updown}`}
                onClick={() => props.upDownClickHandler(index, index - 1)}
              />
            </Col>
          )}

          {index !== lastIndex && (
            <Col>
              <AiOutlineArrowDown
                className={`${style.icon} ${style.updown}`}
                onClick={() => props.upDownClickHandler(index, index + 1)}
              />
            </Col>
          )}

          {list.isDone && (
            <Col>
              <RiDeleteBin6Fill
                className={`${style.icon} ${style.delete}`}
                onClick={() => props.deleteClickHandler(index)}
              />
            </Col>
          )}

          {!list.isDone && (
            <Col>
              <MdDone
                className={`${style.icon} ${style.done}`}
                onClick={() => props.doneClickHandler(index)}
              />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  ));
  return(
    <>
    <input
     type="text"
     className={style.searchInput}
     placeholder="Search"
     value={search}
     onChange={searchOnChangeHandler} />
    {list}
    </>
  ) ;
};

export default ListIItems;
