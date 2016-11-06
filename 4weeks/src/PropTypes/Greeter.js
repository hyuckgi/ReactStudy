import React, { PropTypes } from 'react'

/**
 * PropTypes을 통하여 Props의 타입을 지정.
 * 타입 지정 시 콘솔 출력 WARN 제거
 */
class Greeter extends React.Component {
	render () {
		return (
			<h1>{this.props.salutation}</h1>
		)
	}
}

Greeter.propTypes= {
	salutation : PropTypes.string.isRequired
}
// 별도로 값을 지정하지 않았을 경우.
// Default Prop 지정 가능.
Greeter.defaultProps = {
	salutation : "HelloWorld"
}

export default Greeter;
