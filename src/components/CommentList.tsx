import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Comment} from "../dto/Comment";

interface Props {
  board_id: number;
}
const CommentList: React.FC<Props> = (props) => {
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    if (!props.board_id) {
      return;
    }

    getComments(props.board_id);
  }, [props.board_id]);

  const getComments = async (board_id: number) => {
    const res = await axios.get(`/api/comments?board_id=${props.board_id}`);
    setComments(res.data);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const comment = {
      board_id: props.board_id,
      content: form.commentText.value
    }

    let res = await axios.post('/api/comment', comment);
    console.log(res);
    res = await axios.get(`/api/comment?id=${res.data.id}`);

    const newComments = [...comments];
    newComments.unshift(res.data);

    setComments(newComments);
    form.commentText.value = '';
  };

  return (
    <>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Label>댓글</Form.Label>
          <Form.Control required as="textarea" rows={4} />
        </Form.Group>
        <Button variant="primary" type="submit">
          등록
        </Button>
      </Form>
      {
        comments.map((comment: Comment) =>
          <Row className="comment" key={comment.id}>
            <Col xs={12} className="date">{comment.created}</Col>
            <Col xs={12}>{comment.content}</Col>
          </Row>
        )
      }
    </>

  );
};
export default CommentList;