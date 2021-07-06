import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
    useEffect(() => {
        fetchStream(props.match.params.id);
    }, [props.match.params.id]);

    const onSubmit = (formValues) => {
        // If the request is PATCH
        props.editStream(props.match.params.id, formValues);

        // If the request is PUT
        // props.editStream(props.stream.id, { ...props.stream, ...formValues });
    };

    return !props.stream ? (
        <div>Loading...</div>
    ) : (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                onSubmit={onSubmit}
                // initialValues is special, it hooks up to the Field's name properties
                initialValues={{
                    title: props.stream.title,
                    description: props.stream.description,
                }}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
