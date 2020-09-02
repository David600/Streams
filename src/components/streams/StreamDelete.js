import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount(){
       this.props.fetchStream(this.props.match.params.id)
    };

    renderActions(){
    return (
        <React.Fragment>
            <button onClick = { () => this.props.deleteStream(this.props.match.params.id)} className = "ui button negative">Delete</button>
            <Link to = "/" className = "ui button">Cancel</Link>
        </React.Fragment>
      );
    }

    renderContent () {
        if(!this.props.stream){
            return 'Are you sure you want to delete stream?'
        }
        return `Are you sure you want to delete stream with title: "${this.props.stream.title}"?`
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }
    return (
            <Modal
            title = "Delete stream"
            content = {this.renderContent()}
            actions = {this.renderActions()}
            onDismiss = {() => history.push('/')}
            />
    );
  }
}

const mapStateToprops = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(
    mapStateToprops, 
    { fetchStream, deleteStream }) 
    (StreamDelete);