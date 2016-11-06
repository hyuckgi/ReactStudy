컴포넌트를 이용한 어플리케이션 구축
============
## 속성 유효성 검사
- 상위 컴포넌트를 통하여 수신한 ***"데이터의 정합성"*** 확인
- 예외 상황을 대비한 ***"기본값 지정"***
- 컴포넌트 기반으로 재사용성을 높이는데, 일종의 API 역할을 수행.
	- 재사용될 수 있는 컴포넌트들의 Props의 데이터 타입/형태를 미리 정의해놓고 이를 공유하여 사용할 수 있기 때문.

- ***ES5 vs ES6 PropTypes && defaultProps 지정 스타일 비교 예시***
	```javascript
	// The ES5 way
	var Video = React.createClass({
	  getDefaultProps: function() {
	    return {
	      autoPlay: false,
	      maxLoops: 10,
	    };
	  },
	  getInitialState: function() {
	    return {
	      loopsRemaining: this.props.maxLoops,
	    };
	  },
	  propTypes: {
	    autoPlay: React.PropTypes.bool.isRequired,
	    maxLoops: React.PropTypes.number.isRequired,
	    posterFrameSrc: React.PropTypes.string.isRequired,
	    videoSrc: React.PropTypes.string.isRequired,
	  },
	});
	// The ES6+ way
	class Video extends React.Component {
	  static defaultProps = {
	    autoPlay: false,
	    maxLoops: 10,
	  }
	  static propTypes = {
	    autoPlay: React.PropTypes.bool.isRequired,
	    maxLoops: React.PropTypes.number.isRequired,
	    posterFrameSrc: React.PropTypes.string.isRequired,
	    videoSrc: React.PropTypes.string.isRequired,
	  }
	  state = {
	    loopsRemaining: this.props.maxLoops,
	  }
	}
	```

## 컴포넌트 조합 전략과 모범 사례
- ***"상태 저장 컴포넌트"*** 는 사용자 인터렉션, 서버 요청 등에 반응해야 할 상황을 위하여 사용, 보통 상위 컴포넌트에 배치되며 하나 이상의 하위 컴포넌트를 가짐.
- ***"순수 컴포넌트"*** 는 UI 렌더링을 목적으로 하며, 상위 컴포넌트에서 속성을 받아 렌더링하는 것이 전부인 경우.

### ***컴포넌트 간 커뮤니케이션/통신 방법 정리***
![스크린샷 2016-11-05 오후 9.07.56](http://i.imgur.com/RBQD5fe.png)
- [8 no-Flux strategies for React component communication](http://andrewhfarmer.com/component-communication/)




## 컴포넌트 수명주기
- 리액트 어플리케이션에서 각 컴포넌트는 ***"LifeCycle Methods(Hooks)"*** 를 가질 수 있음.
	- 라이프 사이클 매소드는 리액트 환경에서 Callback 될 수 있는 매소드, 사용자의 의하여 Override(재정의)가 될 수 있음.
- 라이프 사이클에 따라 크게 **마운팅 / 언마운팅 / 업데이트** 의 3가지로 분류 될 수 있으며, 분류에 따른 매소드는 하단과 같음.
![스크린샷 2016-11-05 오후 6.20.33](http://i.imgur.com/pUDRnHp.png)

### 데이터 처리
```javascript
// CommentList.js
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <ul> {this.state.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}
```
- <code>CommentList</code>의 문제점
	- 데이터 처리와 단순 상태를 렌더링하는 코드가 섞여 있어, 리액트가 추구하는 **재사용성** 이 낮음.
	- 개별 컴포넌트가 상태 값을 가지고 있기 때문에, 컴포넌트 조합(부모-자식)으로 개발해야 하는 경우 State 값 관리가 어렵다.
	- ***관심사 분리(데이터 처리 / 렌더링)*** 진행해야 하는데, 이때 사용하는 대표적인 패턴이 바로 ***컨테이너 컴포넌트 패턴***


- **[CONTAINER COMPONENT PATTERN]**
![스크린샷 2016-11-05 오후 6.32.56](http://i.imgur.com/1KaXcYw.png)
	- [Higher-order components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components) 라고 부르기도 하며, 이는 일종의 데코레이터 패턴과도 유사하다고 함.



### 코드 개선
```javascript
// CommentListContainer.js
class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```


```javascript
// CommentList.js
class CommentList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <ul> {this.props.comments.map(renderComment)} </ul>;
	}
	renderComment({body, author}) {
		return <li>{body}—{author}</li>;
	}
}
```



## 불변성에 대한 개요
- state를 직접 조작하는 것은 리액트 패러다임을 위반.
	- 즉, 상태 관리를 우회하는 방법으로 상태 변경의 무효를 발생 시킬 수 있기 때문에 불가.
- <code>setState()</code>매소드를 사용하여 상태 값 변경이 가능하며, 인자/파라미터로 <code>Object</code>와 <code>function</code>을 받을 수 있다.

- <code>setState()</code>매소드를 사용하여 상태 변경 시, 기존 상태 값을 활용하여 상태 값을 바꾸는 경우 문제가 생길 수 있음.
	```javascript
	this.setState({
	  counter: this.state.counter + this.props.increment,
	});
	```

- 위 코드처럼 기존 상태 값을 활용해야 할 경우, <code>setState()</code>매소드 호출 시 인자/파라미터로 콜백 함수를 넘겨서 처리해야 함.
	```javascript
	/**
	 * [counter description]
	 * @type prevState {[Object]} : 이전 상태 객체
	 * @type props     {[Object]} : 업데이트 된 props 객체
	 */
	this.setState((prevState, props) => ({
	  counter: prevState.counter + props.increment
	}));
	```
> <code>this.state</code>와 <code>this.props</code>는 비동기로 상태/프로퍼티 값이 갱신되기 때문에 기존 값 활용 시 함수를 넘겨서 처리하는 것이라고 함.

### Immutable(불변성) vs Mutable(가변성)
> ***"Immutable – after it has been created, it can never change."***
: Immutable - 객체는 생성 된 후 절대로 바뀌지 않음.
***"Mutable - liable or subject to change or alteration."***
: Mutable - 변경/개조가 가능.




- 자바스크립트에서 문자/숫자 타입은 불변 상태를 유지.
	- 문자/숫자 관련 매소드 사용 시 리턴 값은 새로운 문자/숫자 값을 리턴.
	```javascript
	var statement = "I am an immutable value";
	var otherStr = statement.slice(8, 17);
	```
	> <code>statement.slice(8, 17)</code> 매소드를 실행하면, 해당 <code>statement</code>의 값이 변경 될꺼 같지만 해당 값은 변경되지 않고 원본 상태를 유지한다.

- 자바스크립트에서 객체(참조) 타입(<code>Array</code>, <code>Object</code>, <code>Function</code>)은 가변 상태를 유지함.
	- 실제 변수가 참조하고 있는 객체의 <code>[프로퍼티/인덱스]</code>를 추가하는 것이 가능하기 때문에 기존 원본 객체와 비교 하는 코드 작성 시 혼선이 생길 수 있음.
	- 자바스크립트에서는 불변성을 유지하기 위해 기존 객체와는 다른 참조를 가지고 있는 새로운 객체를 생성하여 참조를 대체

- 참조 타입의 데이터는 중첩으로 다른 객체나 값을 참조하는 경우가 많음.
	- ***<code>state/props</code>를 관리해야 하는 리액트 어플리케이션에서는 원본 <code>state/props</code>와 변경이 발생하는 내용간의 비교 시 중첩되는 경우 비교에 어려움이 발생함.***
- 객체/배열의 불변성을 유지하기 객체/배열을 대체하는 방법을 사용하며, 이를 위해 다양한 서드파티 장치/라이브러리를 사용해서 문제를 해결함.
	- [mori.js](https://github.com/swannodette/mori)
	- [immutable.js](https://github.com/facebook/immutable-js)


### Swallow Copy(얕은 복사) vs Deep Copy(깊은 복사)
- ***"얕은 복사"*** 는 참조를 복사하는 개념
	- 변수가 참조하고 있는 객체의 주소 값을 복사하기 때문에, 전달한 참조 값(객체) 조작/변경 가능.
	```javascript
	var obj = {
		name : "kschoi",
		age : "29"
	}
	// 익명 함수 실행
	// 함수 인자 a,b에 값이 복사 됨.
	(function(a){
		a.name = "choi-kyung-seok";
		a.age = 29;
	}(obj));

	console.log(obj.name); // choi-kyung-seok
	console.log(obj.age); // 29
	```

- ***"깊은 복사"*** 는 값 자체를 복사하는 개념
	- 배열, 객체와 같이 중첩된 구조를 가졌을 경우, 복사 자체가 굉장히 비싼 비용을 발생.
	```javascript
	var num1 = 10;
	var num2 = 20;

	// 익명 함수 실행
	// 함수 인자 a,b에 값이 복사 됨.
	(function(a,b){
		a+=10;
		b+=10;
		return a+b;
	}(num1,num2));

	console.log(num1); // 10
	console.log(num2); // 20
	```

## 정리
