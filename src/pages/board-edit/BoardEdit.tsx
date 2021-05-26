import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Board} from "../../dto/Board";
import axios from "axios";

const BoardEdit: React.FC = ({match, history}: any) => {
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });

  const setField = (field: string, value: string) => {
    setBoard({
      ...board,
      [field]: value
    })
  }

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  const handleSubmit = (event: any) => {

  }

  return (
    <Form noValidate validated={true}  onSubmit={handleSubmit}>
      <Form.Group controlId="titleInput">
        <Form.Label>제목</Form.Label>
        <Form.Control required placeholder="" value={board.title}
                      onChange={(e) => setField('title', e.target.value)} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">제목을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="contentText">
        <Form.Label>내용</Form.Label>
        <Form.Control required as="textarea" rows={20} value={board.content}
                      onChange={(e) => setField('content', e.target.value)} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">내용을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );
};
export default BoardEdit;