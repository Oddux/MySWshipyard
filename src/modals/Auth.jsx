import React, { useState } from 'react';
import Modal, { contextType } from 'react-modal';
import './Auth.css';
import AuthContext from '../utils/auth-context.js';

Modal.setAppElement('#root');

function AuthModal() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  state = {isLogin: true};
  
  switchModeHandler = () => {
    this.setState(prevState => {
        return {isLogin: !prevState.isLogin};
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const name = this.nameEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const affiliation = this.affiliationEl.current.value;
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
        return;
    }
    let requestBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}") {
                    pilotId
                    token
                    tokenExpiration
                }
            }
        `,
        variables: {
            email: email,
            password: password
        } 
      };
   
    if (!this.state.isLogin) {
      requestBody = {
          query: `
              mutation {
                  createPilot(pilotInput: {email: "${email}", password: "${password}", name: "${name}", affiliation: "${affiliation}"}) {
                      _id
                      email
                  }
              }
          `
      };
    }

    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
        }
        return res.json();
    })
    .then(resData => {
        console.log(resData);
    })
    .catch(err => {
        console.log(err);
    });
  };
    
  function openModal() {
    setIsOpen(true);
  };

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  };

  function closeModal() {
    setIsOpen(false);
  };

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
          <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'} </button>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AuthModal;
