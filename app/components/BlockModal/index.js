import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import MdHelpOutline from 'react-icons/lib/md/help-outline';
import Wrapper from './Wrapper'

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'white',
    width                 : '60%'
  }
};

const buttonStyles = {
    padding: '0px 5px',
    cursor : 'pointer'
}

const closeButtonStyles = {
    padding: '5px 5px',
    marginTop : '2em',
    cursor : 'pointer',
    border : '1px solid',
    float  : 'right'
}

class BlockModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
     super();

     this.state = {
       modalIsOpen: false
     };

     this.openModal = this.openModal.bind(this);
     this.afterOpenModal = this.afterOpenModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
   }

   openModal() {
     this.setState({modalIsOpen: true});
   }

   afterOpenModal() {
   }

   closeModal() {
     this.setState({modalIsOpen: false});
   }

  render() {
    return (
      <div>
           <button onClick={this.openModal} style={buttonStyles}> {this.props.title} </button>
           <Modal
             isOpen={this.state.modalIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeModal}
             style={modalStyles}
             contentLabel=''
           >
             <h2>{this.props.title}</h2>
             <Wrapper>
               {this.props.content}
             </Wrapper>
             <button onClick={this.closeModal} style={closeButtonStyles}>X</button>
           </Modal>
         </div>
    );
  }
}

BlockModal.propTypes = {
  content: React.PropTypes.any,
  title: React.PropTypes.string
};

export default BlockModal;
