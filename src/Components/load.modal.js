function Input(props) {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>props.title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>props.body</p>
      </Modal.Body>
      <Modal.Footer>
        Please wait while the app loads required data..
      </Modal.Footer>
    </Modal.Dialog>
  );
}
