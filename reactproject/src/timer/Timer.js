import React from 'react';

export default class Timer extends React.Component{
	constructor (props) {
    super(props)
    this.state = {count: 1}
  }

  ComponentDidMount(){
  	console.log('vartha');
  	clearInterval(this.timer)
  	this.timer = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
     this.setState({count: (this.state.count + 1)})
  }
  
  
  render () {
	let load="waiting for change"; 
	if(this.state.count > 5){
		load="loading..."
		this.setState({
			count:0
		});
		clearInterval(this.timer);
	}
	console.log(load);
    return (
      <div>{load}</div>
    )
  }
}