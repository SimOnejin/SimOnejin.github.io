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
import pants01 from "../cloths/p1.png";
import pants02 from "../cloths/p2.png";
import pants03 from "../cloths/p3.png";
import pants04 from "../cloths/p4.png";
import pants05 from "../cloths/p5.png";
import pants06 from "../cloths/p6.png";
import pants07 from "../cloths/p7.png";
import pants08 from "../cloths/p8.png";
import pants09 from "../cloths/p9.png";
import pants00 from "../cloths/p0.png";
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
  pantsList = [
    pants01,
    pants02,
    pants03,
    pants04,
    pants05,
    pants06,
    pants07,
    pants08,
    pants09,
    pants00,
  ];
  price = [34, 135, 64, 9, 47, 83, 23, 68, 80, 21]; //초반 상품 10개 가격 초기화
  closet = [];

  constructor(props) {
    super(props);
    this.state = {
      list: this.clothList,
      list_p: this.pantsList,
      price: this.price,
      randomNumber: 0, //가격 랜덤숫자 선언
      selectedImage: null, // 선택된 이미지 정보
      modalOpen: false,
      closet: [],
      isVisible: false,
      isTshirt: true,
    };

    this.ref = React.createRef();

    this.setRef = this.setRef.bind(this);
    this.checkPosition = this.checkPosition.bind(this);
    window.addEventListener("scroll", this.checkPosition);

    this.handleButtonIncrease = this.handleButtonIncrease.bind(this); //버튼 핸들러 바인드
    this.handleButtonDecrease = this.handleButtonDecrease.bind(this);
  } //constructor
  setRef(ref) {
    this.ref = ref;
  }

  checkPosition() {
    const randomNumber = random(30, 100); //최소 30,000원에서 100,000원 가격
    let i = 0;
    if (this.ref && typeof this.ref.getBoundingClientRect === "function") {
      if (this.ref.getBoundingClientRect().top < window.innerHeight) {
        i = i++;
        this.setState(({ list, list_p, price }) => ({
          //state변수중 list만 꺼내라
          list: [...list, this.clothList[Math.floor(Math.random() * 10)]], //앞에 10개, list를 바꿔라
          list_p: [...list_p, this.pantsList[Math.floor(Math.random() * 10)]],
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
  addCartList = (selectedImage) => {
    this.setState((prevState) => ({
      closet: [...prevState.closet, selectedImage],
    }));
  };

  openModal = (selectedImage) => {
    this.setState({
      modalOpen: true,
      selectedImage,
    });
  }; //팝업띄우기
  closeModal = () => {
    this.setState({ modalOpen: false, selectedImage: null, isVisible: false });
  }; //모달팝업창을 끌때마다 장바구니 보여주기(isVisible) false로

  handleButtonIncrease() {
    //부모컴포넌트 숫자추가 함수 호출
    this.props.IncreaseCount();
  }
  handleButtonDecrease() {
    //부모컴포넌트 초기화 함수 호출
    this.props.DecreaseCount();
  }
  MakeEmptyCart() {
    //쓰레기통버튼, 장바구니 초기화
    this.setState({
      closet: [],
    });
  }
  toggleVisibility() {
    //장바구니 보여주기
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  }

  // 티셔츠를 보여줄지, 바지를 보여줄지 정해주는 코드
  toggleOnTshirt = () => {
    this.setState((prevState) => ({
      isTshirt: true,
    }));
  };
  toggleOnPants = () => {
    this.setState((prevState) => ({
      isTshirt: false,
    }));
  };

  render() {
    let { count } = this.props; //부모컴포로부터 값 받기
    return (
      <>
        <div className="flex_container">
          {/* 사이드 메뉴바 */}
          <div className="menu">
            <a // 카트 이미지 클릭시 장바구니 보여주기
              id="Empty_cart"
              onClick={() => {
                this.toggleVisibility();
                this.openModal();
              }}
            >
              <img id="cart" src={Empty_cart}></img>
              {count}
            </a>

            <h1>STOPBUGS</h1>
            <h1>SHOP v10.0</h1>
            <span>Login Join MyPage</span>
            <h5>NEW</h5>
            <h5>Selected</h5>
            <h5
              className="category"
              onClick={() => {
                this.toggleOnTshirt();
              }}
            >
              Tshirts
            </h5>
            <h5
              className="category"
              onClick={() => {
                this.toggleOnPants();
              }}
            >
              Pants
            </h5>

            {/* 팝업 부분 */}
            <React.Fragment>
              <>
                <Modal
                  open={this.state.modalOpen}
                  close={this.closeModal}
                  title="Create a chat room"
                >
                  {/* 선택한 장바구니 목록 */}
                  <h3>장바구니</h3>
                  {this.state.isVisible ? ( //isVisible가 true일때 장바구니 보여주고 false일때 클릭한 이미지
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
                            <img
                              src={closet}
                              alt={`장바구니${i + 1}`}
                              width="100"
                            />
                            <br />
                            담은상품{i + 1}
                            <br />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    //True or False
                    <div>
                      <img
                        width="300px"
                        src={this.state.selectedImage}
                        alt="선택된 이미지"
                      />
                      <p>장바구니에 담기</p>
                      <a
                        onClick={() => {
                          this.addCartList(
                            this.state.selectedImage,
                            this.price
                          );
                          this.handleButtonIncrease();
                        }}
                      >
                        <img id="AddCart" src={Empty_cart}></img>
                      </a>
                    </div>
                  )}
                </Modal>
              </>
            </React.Fragment>

            {/* 최상단으로 이동버튼 */}
            <button id="scrollToTop" onClick={this.scrollToTop}></button>
          </div>
          {/*menu 끝*/}

          {/* 메인페이지 */}
          <ul className="main_scroll" id="main">
            <img id="Logo" src={Logo}></img>
            <br />
            {this.state.isTshirt ? ( //isTshirt가 True면 Tshirt 출력, False면 Pants 출력
              <>
                {this.state.list.map((cloth, i) => (
                  <article>
                    <li className="list" key={cloth + i}>
                      <a
                        onClick={() =>
                          this.openModal(cloth, this.state.price[i])
                        }
                      >
                        <img src={cloth} alt={`상의${i + 1}`} width="300" />
                      </a>
                      <br />
                      상의{i + 1}
                      <br />
                      가격:{this.state.price[i]},000₩
                    </li>
                  </article>
                ))}
              </>
            ) : (
              //True or False
              <>
                {this.state.list_p.map((pants, i) => (
                  <article>
                    <li className="list" key={pants + i}>
                      <a
                        onClick={() =>
                          this.openModal(pants, this.state.price[i])
                        }
                      >
                        <img src={pants} alt={`하의${i + 1}`} width="300" />
                      </a>
                      <br />
                      하의{i + 1}
                      <br />
                      가격:{this.state.price[i]},000₩
                    </li>
                  </article>
                ))}
              </>
            )}
          </ul>

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
