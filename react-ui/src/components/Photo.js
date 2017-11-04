import React, {Component} from 'react';
import axios from 'axios';

class Photo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: []
        };
    };

          
    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${this.props.note}`)
        .then(res => {
                this.setState({ 
                    photo: res.data 
                });
            }
        )
        .catch(err => {
            console.log(err);
        }); 
    }


    render() {
        return (
            
            <div className="single-photo">
                <img src={this.state.photo.thumbnailUrl} alt="Loading..." class="img-thumbnail"/>
                <h3>{this.state.photo.title}</h3>
            </div>
        );
    }
}

export default Photo;
