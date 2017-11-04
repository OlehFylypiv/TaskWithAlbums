import React, {Component} from 'react';
import AlbumsTableBody from './AlbumsTableBody';
import UltimatePagination from 'react-ultimate-pagination-basic'
import axios from 'axios';
import Photos from './Photos';

class AlbumsTable extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentPage: 1,
            totalPages: 5,
            currentAlbumId: null,
            photosArr : []
        };
        
        this.getCurentAlbumId = this.getCurentAlbumId.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.getPhotosArr= this.getPhotosArr.bind(this);
        this.getStartData = this.getStartData.bind(this);
    };

    getCurentAlbumId(event) {
        this.setState({
            currentAlbumId: event
        });
    }

    handleBack() {
        this.setState({
            currentAlbumId: null,
            photosArr: []
        }, () => {
            let pagin = document.getElementById('albums-pagin');
            pagin.style.display = 'block';
        });  
    }

    getPhotosArr(page) {
        this.setState({ 
            currentPage: page
        });
        
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${this.state.currentAlbumId}&_page=${page}&_limit=10`)
        .then(res => {
                this.setState({ 
                    photosArr: res.data 
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
    }

    getStartData() {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${this.state.currentAlbumId}&_page=1&_limit=10`)
        .then(res => {
                this.setState({ 
                    photosArr: res.data 
                });
            }
        )
        .catch(err => {
            console.log(err);
        }); 
    }

    render() {
        
        if (this.state.currentAlbumId) {   
            return (
                
                <div>
                    <div className="nav-buttons">
                        <button onClick={this.handleBack} id="back">
                           Back to Albums
                        </button>
                        <button onClick={this.getStartData}>
                            Load photos
                        </button>  
                    </div>    
                        {
                            this.state.photosArr.map(item => {
                                return (
                                    <Photos 
                                        note={item}
                                        key={item.id}
                                        selectedPhoto={this.handleSelectedPhoto}
                                    />
                                );
                            })
                        }
                    <div className="pagination">
                        <UltimatePagination 
                            currentPage={this.state.currentPage} 
                            totalPages={this.state.totalPages}
                            onChange={this.getPhotosArr}
                        />
                    </div>    
                </div>
            );
        } else { 
            return (
                
                <div>
                    {
                        this.props.albumsArrData.map(item => {   
                            return (
                                <AlbumsTableBody
                                    note={item}
                                    key={item.id}
                                    currentAlbumId={this.getCurentAlbumId}
                                />
                            )
                                   
                        })
                    }
                </div>
            );
        }
    }
}

export default AlbumsTable;
