import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Auth.css';

Modal.setAppElement('#root');

function AuthModal() {
    constructor(props) {
        super(props);
        this.nameEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.affiliationEl = React.createRef();
    }

    submitHandler = event => {
        event.preventDefault();
        const name = this.nameEl.current.value;
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const affiliation = this.affiliationEl.current.value;
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createPilot(pilotInput: {name: "${name}", email: "${email}", password: "${password}", affiliation: "${affiliation}"}) {
                            _id
                            name
                            affiliation
                            email
                        }
                    }
                `
            })
        })
    };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Pilot Auth</h2>
        <button onClick={closeModal}>close</button>
        <div>Present your credentials</div>
        <form className="pilotForm" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type = "text" id="name" ref={this.nameEl} />
            </div>
            <div className="form-control">
                <label htmlFor="affiliation">Affiliation</label>
                <select id="affiliation" ref={this.affiliationEl} >
                    <option value="rebel">Rebel</option>
                    <option value="empire">Empire</option>
                    <option value="hunter">Bounty Hunter</option>
                    <option value="smuggler">Smuggler</option>
                    <option value="merc">Mercenary</option>
                    <option value="jedi">Jedi</option>
                    <option value="sith">Sith</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type = "email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type = "password" id="password" ref={this.passwordEl} />
            </div>
          <button type="button">Switch to Signup</button>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, appElement);




export default AuthPage;
