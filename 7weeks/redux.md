# Redux

## Why Redux?
### MVC
기존 MVC 프레임워크에서는 모델(데이터 레이어)와 뷰 레이어가 교차로 참조하는 구조가 발생하기 쉬움. 어플리케이션의 구조가 단순하다면 상관없겠지만, 요구사항이 복잡한 대규모 어플리케이션에서는 다량의 교차 참조가 발생함에 따라 관리 자체에 대한 비용이 크게 상승하게 됨.

![enter image description here](https://velopert.com/wp-content/uploads/2016/04/MVC.png)

![enter image description here](https://velopert.com/wp-content/uploads/2016/04/MVC2.png)


### FLUX
현대적인 자바스크립트 어플리케이션은 다양한 상태 값을 관리해야 할 필요성이 점점 더 늘어나고 있음. 복잡해지는 상태 값과 이를 변경하는 로직은 개발에 대한 시간과 비용을 크게 상승하게 만듬. 이에 따라, 복잡한 로직에서 생기는 상태 값 관리가 아닌 단순한 변경에 따른 상태 값 관리가 필요하게 됨.


특정 이벤트(클릭 및 기타 등등)발생 시 액션 객체를 Dispatch하여 이를 스토어에 전달하면 바로 스토어에서는 관련된 상태 값을 가지고 있는 뷰에서 다시 변경된 내용을 렌더하는 개념. 갱신된 뷰에서는 다시 액션이 발생하여 앞에서의 과정을 동일하게 발생시킬 수 있음.

![enter image description here](https://velopert.com/wp-content/uploads/2016/04/flux-simple-f8-diagram-1300w.png)

![enter image description here](https://velopert.com/wp-content/uploads/2016/04/flux-simple-f8-diagram-with-client-action-1300w.png)


### Redux




리액트 어플리케이션에서의 Flux 패턴 구현체는 실제로 상태 값을 관리하는 스토어가 다중으로 관리되기 때문에, 관리 포인트가 늘어나는 단점이 있을 수 있음. 이에 따라, 단일 스토어에서 트리 형태의 데이터 구조를 관리하는 것이 편한 측면이 있을 수 있다는 점에서 착안하여 나온 것이 바로 **Redux**

요약하여 **Data-state + UI-state 를 관리해주는 도구**, 실제로 뷰 레이어(컨테이너 컴포넌트, 뷰 컴포넌트)에서 dispatch를 하게 되면 Redux 스토어에 전달되는 것이 바로 **순수 객체** 이다. 이를 다시 Reducer에 전달하여 상태 값을 어떻게 바꿀 것인지를 결정하게 되는 것이다. 바뀐 상태 값은 바로 뷰에 갱신이 된다.


![enter image description here](https://velopert.com/wp-content/uploads/2016/04/03.png)




## 개요 및 처리 흐름
#### Redux 어플리케이션 작성 시, 알아야 할 핵심 키워드
- **Actions**
	- 발생한 액션을 식별할 수 있는 순수 객체를 리턴.
- **Reducer**
	- 바뀔 상태 값을 지정.
- **Dispatch**
	- Action객체를 스토어에 던지는 개념으로 사용.
- **Middlewares**


#### Redux Application을 작성할 떄 지켜야 하는 원칙
- **Single Source of Truth**
	- 단일 스토어 구조.
- **State is read-only.**
	- Redux Store에 있는 State를 직접 변경하는 것은 불가 혹은 비권고
- **Changes are made with Pure Functions.**
	- 리듀서는 **순수 함수**

#### 일반적인 Redux Application의 처리 흐름
![enter image description here](http://www.bebetterdeveloper.com/img/post_img/rre-2.png)

![enter image description here](https://cdn-ak.f.st-hatena.com/images/fotolife/o/opttechnologies2015/20161028/20161028193929.jpg)

> Action Creator는 리턴되는 액션 객체를 래핑한 함수 형태.


1. 뷰 레이어에서 특정 이벤트 혹은 로직 수행이 발생함에 따라 액션 함수가 실행 됨.
	- 액션 함수는 고차 함수에 의하여 래핑된 형태. 액션 함수의 리턴 값은 **해당 액션을 식별할 수 있는 값을 지닌 순수 객체**

2. 액션 함수의 리턴 객체가 Redux Store / Reducer에 전달 됨.
	- Redux Devtools를 보면 잘 알수 있지만, 결국, Redux Store가 단일 스토어지만 내부적으로는 트리 형태로 데이터를 괸라하게 됨.
3. 전달한 액션 객체를 기준으로 리듀서 함수를 실행.
4. [복습-Redux 공홈 한글판 데이터 플로우](http://dobbit.github.io/redux/basics/DataFlow.html)



#### 관련 라이브러리 & 개발환경 관련
- ***기본 개발 형태는 React & Redux Starter Kit에서 시작.***
	- http://andrewhfarmer.com/starter-project/
	- https://github.com/davezuko/react-redux-starter-kit

- [Redux-DevTools](https://github.com/gaearon/redux-devtools)
- [awesome-redux](https://github.com/xgrommx/awesome-redux)

## 회원가입 실습
> 이건 옵션으로 진행.

1. 주제 선정.
2. 라우트 추가
	- 컨테이너 컴포넌트 추가 후 라우팅 코드 추가.
3. 컨테이너 컴포넌트 추가.
4. 간편 마크업 작성
5. 액션 객체 생성.
6. 리듀서 생성.
