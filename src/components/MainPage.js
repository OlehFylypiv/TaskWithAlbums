import React, {Component} from 'react';
import axios from 'axios';
import UltimatePagination from 'react-ultimate-pagination-basic'
import AlbumsTable from './AlbumsTable';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 10,
            albumsArr: []
        };
        
        this.handleSearch = this.handleSearch.bind(this);
    };

    handleSearch(page) {
        this.setState({
            currentPage: page
        });
        
        axios.get(`https://jsonplaceholder.typicode.com/albums?_page= ${page} &_limit=10`)
            .then(res => {
                    this.setState({ 
                        albumsArr: res.data 
                    });
                }
            )
            .catch(err => {
                console.log(err);
            });
    };

   componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/albums?_page=1&_limit=10`) 
        .then(res => {
                this.setState({ 
                    albumsArr: res.data 
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            
            <div className="container">
                <div className="content-albums">
                    <AlbumsTable albumsArrData={this.state.albumsArr}/>
                </div>
                
                <div className="pagination" id="albums-pagin">
                    <UltimatePagination 
                        currentPage={this.state.currentPage} 
                        totalPages={this.state.totalPages}
                        onChange={this.handleSearch}
                    />
                </div>
            </div>    
        );
    }
}

export default MainPage;
