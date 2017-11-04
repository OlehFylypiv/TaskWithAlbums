import React, {Component} from 'react';
import Photo from './Photo';

class Photos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photoId: null,
            getSinglePhoto: null
        };
        
        this.handleCurrentPhoto = this.handleCurrentPhoto.bind(this);
    };

    handleCurrentPhoto() {
        this.setState({ 
            photoId: this.props.note.id,
            getSinglePhoto: true
        });        
    }

    render() {
        
        if (!this.state.getSinglePhoto) {
            return (
                
                <div onClick={this.handleCurrentPhoto} className="photo-item">
                    <h3>Photo # { this.props.note.id }</h3>
                    <h4>{ this.props.note.title }</h4>
                </div>
            );
        } else {
            return (
                
                <div onClick={this.handleCurrentPhoto}>
                    <Photo note={this.state.photoId}/>
                </div>
            );
        }
    }
}

export default Photos;
