import React, { Component } from 'react'; 

export default class Task2 extends Component{
	constructor(props) {
        super(props);
        this.state = {
            name: ' ',
            email: ' '
        };
    }

    handleChange = (e) => {
      console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   onSubmit = (e) => {
       e.preventDefault();
       const form = {
        name: this.state.name,
        email: this.state.email
       }
         
       console.log(form);

       
       this.setState({
            name: '',
            email: ''
       })
    }

    display(){
      return(<h1>{this.state.name} {this.state.email}</h1>);
    }

    render() {
        return (
            <div>
            <form>
                <label>
                    Name:
                    <input
                        name='name'
                        value={this.state.name}
                        onChange={e => this.handleChange(e)}/>
                </label>
                <label>
                    Email:
                    <input 
                        name='email'
                        value={this.state.email} 
                        onChange={e => this.handleChange(e)}/>
                </label>
                <button onClick={(e) => this.onSubmit(e)}>clear</button>         
            </form>
           {this.display()}
            </div>
        );
    }
}