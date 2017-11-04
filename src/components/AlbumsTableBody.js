import React, {Component} from 'react';

class AlbumsTableBody extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
        	albumId: null
        };
        
        this.handleCurrentAlbum = this.handleCurrentAlbum.bind(this);
    };

    handleCurrentAlbum() {
        this.setState({
            albumId: this.props.note.id
        }, () => {
            this.props.currentAlbumId(this.state.albumId);
            
            let pagin = document.getElementById('albums-pagin');
            pagin.style.display = "none";
        });
    }

    render() {      
        return (
            
            <div onClick={this.handleCurrentAlbum} className="album-item">
                <h3>Album # { this.props.note.id }</h3>
                <h4>{ this.props.note.title }</h4>
            </div>
        );       
    }
}

export default AlbumsTableBody;
