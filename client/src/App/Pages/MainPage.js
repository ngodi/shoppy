import React, { Component } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar/TopBar';
import ShopList from '../Components/ShopList/ShopList';
import Footer from '../Components/Footer/Footer';
import SideBar from '../Components/TopBar/SideBar';

export default class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            searchValue: '',
            fetched: false,
            disable: true
        }
    }

    componentDidMount = () => {
        axios.get('/api/data')
            .then(res => {
                const data = res.data;
                this.setState({
                    data,
                    fetched: true
                })
            })
    };

    componentWillUnmount = () => {
      this.setState({
          fetched: false
      })
    }
    

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
            disable: false
        })
    }

    handleSubmit = () => {
        axios.get(`/api/itemsearch/${this.state.searchValue}`)
        .then(res => {
            const data = res.data;
            this.setState({
                data,
                fetched: true
            })
        })
    }

    render() {
        return (
            <div className="App">
                <SideBar pageWrapId={"mainpage"} outerContainerId={"MainPage"} />
                <div id="mainpage">
                    <TopBar />
                    <ShopList 
                        data={this.state.data} 
                        fetched={this.state.fetched}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        searchValue={this.state.searchValue}
                        disable={this.state.disable}/>
                    <Footer />            
                </div>
            </div>


        )
    }
}