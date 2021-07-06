import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';

const StreamDelete = (props) => {
    useEffect(() => {
        console.log(props.match.params.id);
        fetchStream(props.match.params.id);
    }, [props.match.params.id]);

    const actions = (
        // equivalent to <></>
        <React.Fragment>
            <button className="ui button negative">Delete</button>
            <button className="ui button">Cancel</button>
        </React.Fragment>
    );

    const renderContent = () => {
        if (!props.stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete stream '${props.stream.title}'?`;
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={actions}
            onDismiss={() => history.push('/')}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamDelete);
