import React, { Component } from "react";
import { random } from "lodash";
// import Modal from "react-modal";
import { Modal } from "./Modal";

import cloth01 from "../cloths/c1.png";
import cloth02 from "../cloths/c2.png";
import cloth03 from "../cloths/c3.png";
import cloth04 from "../cloths/c4.png";
import cloth05 from "../cloths/c5.png";
import cloth06 from "../cloths/c6.png";
import cloth07 from "../cloths/c7.png";
import cloth08 from "../cloths/c8.png";
import cloth09 from "../cloths/c9.png";
import cloth00 from "../cloths/c0.png";
import Logo from "../cloths/LOGO.PNG";
import Empty_cart from "../icon/cart3.svg";

import "../App.css";

class TermProject extends Component {
  clothList = [
    cloth01,
    cloth02,
    cloth03,
    cloth04,
    cloth05,
    cloth06,
    cloth07,
    cloth08,
    cloth09,
    cloth00,
  ];
  price = [34, 135, 64, 9, 47, 83, 23, 68, 80, 21]; //초반 상품 10개 가격 초기화
  closet = [];

  constructor(props) {
    super(props);
    this.state = {
      list: this.clothList,
      price: this.price,
      randomNumber: 0, //가격 랜덤숫자 선언
      // modalOpen: false,
      // count: this.props.count,
      isOpen: false, // 팝업창 열림 여부
      selectedImage: null, // 선택된 이미지 정보
      modalOpen: false,
      closet: [],
      totalPrice: 0,
      isVisible: true,
    };

    this.ref = React.createRef();

    this.setRef = this.setRef.bind(this);
    this.checkPosition = this.checkPosition.bind(this);
    window.addEventListener("scroll", this.checkPosition);

    this.handleButtonIncrease = this.handleButtonIncrease.bind(this); //버튼 핸들러 바인드
    this.handleButtonDecrease = this.handleButtonDecrease.bind(this);
  }
  setRef(ref) {
    this.ref = ref;
  }

  checkPosition() {
    const randomNumber = random(30, 100); //최소 30,000원에서 100,000원 가격
    let i = 0;
    if (this.ref && typeof this.ref.getBoundingClientRect === "function") {
      if (this.ref.getBoundingClientRect().top < window.innerHeight) {
        i = i++;
        this.setState(({ list, price }) => ({
          //state변수중 list만 꺼내라
          list: [...list, this.clothList[Math.floor(Math.random() * 10)]], //앞에 10개, list를 바꿔라
          price: [...price, randomNumber], //랜덤숫자 삽입
        }));
        console.log(i);
      }
    } else {
      console.log("exit");
    }
  } //checkPosition

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 최상단으로 스크롤 이동
  }

  //장바구니 추가하기
  addCartList = (selectedImage, price) => {
    const selectedPrice = this.price; // 선택된 이미지의 가격을 가져옴
    this.setState((prevState) => ({
      closet: [...prevState.closet, selectedImage],
      totalPrice: prevState.totalPrice + selectedPrice,
    }));
  };
  openModal = (selectedImage, price) => {
    this.setState({
      modalOpen: true,
      selectedImage,
      totalPrice: price,
    });
  };
  closeModal = () => {
    this.setState({ modalOpen: false, selectedImage: null });
  };

  handleButtonIncrease() {
    //부모컴포넌트 숫자추가 함수 호출
    this.props.IncreaseCount();
  }
  handleButtonDecrease() {
    //부모컴포넌트 숫자감소 함수 호출
    this.props.DecreaseCount();
  }
  MakeEmptyCart() {
    this.setState({
      closet: [],
    });
  }
  toggleVisibility() {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  }

  render() {
    let { count } = this.props; //부모컴포로부터 값 받기
    return (
      <>
        <div className="flex_container">
          <div className="menu">
            {/* 카트 이미지 클릭시 숫자 감소 */}
            <a
              id="Empty_cart"
              onClick={() => {
                // this.handleButtonDecrease();
                this.toggleVisibility();
              }}
            >
              <img id="cart" src={Empty_cart}></img>
              {count}
            </a>

            <h1>STOPBUGS</h1>
            <h1>SHOP v8.11</h1>
            <span>
              <a href="Login.jsp">Login</a> Join MyPage
            </span>
            <h5>NEW</h5>
            <h5>Selected</h5>
            <h5>Men's</h5>
            <h5>Women's</h5>

            {/* 팝업 부분 */}
            <Modal
              open={this.state.modalOpen}
              close={this.closeModal}
              title="pop"
            >
              <img
                width="100px"
                src={this.state.selectedImage}
                alt="선택된 이미지"
              />
              <a
                onClick={() => {
                  this.addCartList(this.state.selectedImage, this.price);
                  this.handleButtonIncrease();
                }}
              >
                <img id="AddCart" src={Empty_cart}></img>
                {/* {this.state.totalPrice} */}
              </a>
            </Modal>

            {/* 선택한 장바구니 목록 */}
            <h3>장바구니</h3>
            {this.state.isVisible ? (
              <div className="cartItems">
                <ul className="cartItems2" id="main">
                  <a
                    className="trash"
                    onClick={() => {
                      this.MakeEmptyCart();
                      this.handleButtonDecrease();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </a>
                  {this.state.closet.map((closet, i) => (
                    <li className="list" key={closet + i}>
                      <img src={closet} alt={`상의${i + 1}`} width="100" />
                      <br />
                      담기{i + 1}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* 최상단으로 이동버튼 */}
            <button id="scrollToTop" onClick={this.scrollToTop}></button>
          </div>
          {/*menu 끝*/}

          {/* 메인페이지 */}
          <ul className="main_scroll" id="main">
            <img id="Logo" src={Logo}></img>
            <br />
            {this.state.list.map((cloth, i) => (
              <article>
                <li className="list" key={cloth + i}>
                  <a onClick={() => this.openModal(cloth, this.state.price[i])}>
                    <img src={cloth} alt={`상의${i + 1}`} width="300" />
                  </a>
                  <br />
                  상의{i + 1}
                  <br />
                  가격:{this.state.price[i]},000₩
                  {/* <a onClick={this.handleButtonIncrease}>
                    <img id="AddCart" src={Empty_cart}></img>
                  </a> */}
                </li>
              </article>
            ))}
          </ul>

          {/* //bootstrap CSS
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          ></link>; */}
          <div id="ref" ref={this.setRef}>
            {" "}
            {/* The End */}
          </div>
          {/* /ref */}
        </div>
        //flex_container
      </>
    );
  }
}

export default TermProject;
